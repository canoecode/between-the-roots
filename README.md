# Between The Roots — website

A rebuilt version of betweentheroots.org: same words and photos, new layout.
Plain HTML/CSS/JS with no build step, so you can host the folder anywhere (GitHub Pages, Netlify, any web host).

## Preview locally

Double-click `index.html`, or run the small local server:

```bash
powershell -ExecutionPolicy Bypass -File serve.ps1
```

Then open http://localhost:8080.

## Where things live

| Path | What it is |
| --- | --- |
| `*.html` | One file per page (home, About Us pages, Biogas Balloons, Biochar, Advocacy, Articles, Booklets, 3 articles) |
| `assets/js/layout.js` | The shared header, menu and footer. **Edit the menu or contact details here** and every page updates. |
| `assets/js/main.js` | Sticky header, mobile menu, photo lightbox, click-to-play video, scroll animations |
| `assets/css/styles.css` | All styling. Brand colors are at the top (`--green`, `--brown`, `--tan`), taken from the original site. |
| `assets/images/` | Web-sized copies of every photo from the original site |
| `assets/fonts/` | Aileron, the typeface the original site used |
| `assets/docs/` | The two Thai sustainability booklets (PDF) |
| `source-images/` | Untouched full-resolution originals (not used by the pages; keep for reference) |
