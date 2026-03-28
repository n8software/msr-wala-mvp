# MSR WALA Static MVP

Static multi-page website for MSR WALA, designed for GitHub Pages deployment and easy migration to WordPress templates later.

## Pages

- `/` Home
- `/unternehmen/`
- `/service/`
- `/galerie/`
- `/referenzen/`
- `/kontakt/`
- `/anfahrt/`
- `/impressum/`
- `/datenschutz/`

## Tech

- Plain HTML + CSS + vanilla JavaScript
- No SPA router
- No server-side runtime required

## Notes

- Facebook URL is currently a placeholder in `assets/js/site-config.js` and marked with TODO.
- Contact form is MVP UI only (no submission backend).
- Content sources used: `content.md`, `img.md`.
- `.nojekyll` is included for GitHub Pages compatibility.

## WordPress migration readiness

- Multi-page slug structure already maps cleanly to WP pages.
- Shared style/JS assets are centralized for template-part reuse.
- Sections are component-like blocks and can be moved into `header.php`, `footer.php`, and page templates.

## Local preview

Open `index.html` directly or serve the folder with any static server.
