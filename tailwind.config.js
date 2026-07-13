/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Brand colors are driven by CSS variables (OKLCH) defined in
      // src/styles/index.css. Values map 1:1 to the brand book:
      // Jungle Green, Quick Silver, Cold Black, Feldgrau, Intense White.
      colors: {
        jungle: 'var(--color-jungle)',
        silver: 'var(--color-silver)',
        coldblack: 'var(--color-coldblack)',
        feldgrau: 'var(--color-feldgrau)',
        white: 'var(--color-intense-white)',
      },
      fontFamily: {
        // Sora = geometric logotype/headings (TT Hoves Pro substitute),
        // Inter = body copy.
        display: ['Sora', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
}
