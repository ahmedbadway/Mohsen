import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/index.css'

// A deep link that hit public/404.html left the requested path behind for
// us — restore it before rendering so the router opens the right page.
const redirectPath = sessionStorage.getItem('redirectPath')
if (redirectPath) {
  sessionStorage.removeItem('redirectPath')
  if (redirectPath !== window.location.pathname) {
    window.history.replaceState(null, '', redirectPath)
  }
}

// Clean URLs (/projects instead of /#/projects) on the custom domain.
// public/404.html hands deep links back to the app, since GitHub Pages has
// no server-side rewrite.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
