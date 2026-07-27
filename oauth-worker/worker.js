/**
 * OAuth gateway for Decap CMS (GitHub backend) on a static host.
 *
 * GitHub Pages has no server, so the CMS at /admin cannot exchange the OAuth
 * code for an access token itself. This tiny Cloudflare Worker does only that:
 * it sends the client to GitHub to authorise, then swaps the returned code for
 * a token and hands it back to the CMS popup. It is scoped to this one repo by
 * the OAuth App you create — no repo data or secrets live here.
 *
 * Required environment variables (set in the Cloudflare dashboard, NOT here):
 *   GITHUB_CLIENT_ID      — from your GitHub OAuth App
 *   GITHUB_CLIENT_SECRET  — from your GitHub OAuth App
 *
 * Routes:
 *   /            → health check
 *   /auth        → start login (redirect to GitHub)
 *   /callback    → finish login (exchange code, post token back to the CMS)
 */

const GITHUB_AUTHORIZE = 'https://github.com/login/oauth/authorize'
const GITHUB_TOKEN = 'https://github.com/login/oauth/access_token'

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.pathname === '/auth') {
      const missing = missingEnv(env)
      if (missing) return configError(missing)
      return startAuth(url, env)
    }
    if (url.pathname === '/callback') {
      const missing = missingEnv(env)
      if (missing) return configError(missing)
      return handleCallback(url, env)
    }
    const missing = missingEnv(env)
    const status = missing
      ? `Not configured — missing ${missing}. Set it in the Cloudflare dashboard (Settings → Variables and Secrets) and redeploy.`
      : 'OAuth gateway is running.'
    return new Response(status, {
      status: 200,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    })
  },
}

// Return a comma-separated list of any required env vars that are missing or
// blank, or null when everything is present.
function missingEnv(env) {
  const names = ['GITHUB_CLIENT_ID', 'GITHUB_CLIENT_SECRET']
  const missing = names.filter((n) => !env[n] || !String(env[n]).trim())
  return missing.length ? missing.join(', ') : null
}

// Fail loudly with a clear message instead of forwarding an undefined
// client_id to GitHub (which returns an opaque 404).
function configError(missing) {
  return new Response(
    `Configuration error: missing environment variable(s): ${missing}.\n\n` +
      'Add them in the Cloudflare dashboard under this Worker → Settings →\n' +
      'Variables and Secrets, then click Deploy. Names must match exactly.',
    { status: 500, headers: { 'content-type': 'text/plain; charset=utf-8' } }
  )
}

// Step 1: bounce the user to GitHub's consent screen.
function startAuth(url, env) {
  const redirectUri = `${url.origin}/callback`
  const params = new URLSearchParams({
    client_id: env.GITHUB_CLIENT_ID,
    redirect_uri: redirectUri,
    scope: 'repo,user',
    // Opaque anti-CSRF value echoed back by GitHub.
    state: crypto.randomUUID(),
  })
  return Response.redirect(`${GITHUB_AUTHORIZE}?${params.toString()}`, 302)
}

// Step 2: exchange the code for a token and message it back to the CMS window.
async function handleCallback(url, env) {
  const code = url.searchParams.get('code')
  if (!code) {
    return renderResult('error', { message: 'Missing authorization code' })
  }

  const res = await fetch(GITHUB_TOKEN, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
      'user-agent': 'decap-cms-oauth-gateway',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  })

  const data = await res.json()
  if (data.error || !data.access_token) {
    return renderResult('error', {
      message: data.error_description || data.error || 'Token exchange failed',
    })
  }

  return renderResult('success', {
    token: data.access_token,
    provider: 'github',
  })
}

// Decap listens for a postMessage from this popup in the form:
//   authorization:github:success:{"token":"...","provider":"github"}
// The handshake starts when the opener posts "authorizing:github".
function renderResult(status, payload) {
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`
  const html = `<!doctype html>
<html>
  <body>
    <p>Completing sign-in…</p>
    <script>
      (function () {
        function receiveMessage(e) {
          window.opener.postMessage(${JSON.stringify(message)}, e.origin)
          window.removeEventListener('message', receiveMessage, false)
        }
        window.addEventListener('message', receiveMessage, false)
        // Tell the opener we're ready; it replies, then we post the result above.
        window.opener && window.opener.postMessage('authorizing:github', '*')
      })()
    </script>
  </body>
</html>`
  return new Response(html, {
    status: 200,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  })
}
