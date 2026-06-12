# SOFTSWISS — HTML template


## Features

- **Responsive layout** — desktop / tablet / mobile.
- **Hero** with two decorative side images and a scroll parallax effect.
- **Countries slider** ([Swiper](https://swiperjs.com/)) — 4 / 2 / 1 slides per
  view, custom progressbar and "current / total" counter.
- **Mobile menu** — off‑canvas drawer reusing the desktop nav (menu items are
  not duplicated in the markup).
- **Light / dark theme** — toggle in the header, persisted in `localStorage`,
  applied before paint to avoid a flash. All theme colors live in CSS custom
  properties in `assets/scss/global/_base.scss`.
- **SVG sprite** (`<symbol>` / `<use>`) for repeated icons.

## Tech stack

HTML5, SCSS (Dart Sass), vanilla js, Gulp, Swiper, PostCSS (Autoprefixer + cssnano).

## Requirements

- Node.js and npm

## Getting started

```bash
npm install        # install dev dependencies + Swiper
npx gulp           # build everything (styles, scripts, vendor, fonts, images) and watch for changes
```

Then open `index.html` in a browser. The page references the compiled assets in
`dist/`, so the project must be built at least once before opening it.

### Individual Gulp tasks

| Task              | Description                                              |
| ----------------- | ------------------------------------------------------- |
| `npx gulp styles` | Compile `assets/scss/app.scss` → `dist/css/app.min.css` |
| `npx gulp scripts`| Minify `assets/js/*.js` → `dist/js/app.min.js`          |
| `npx gulp vendor` | Copy Swiper bundle → `dist/vendor/`                     |
| `npx gulp fonts`  | Copy fonts → `dist/fonts/`                              |
| `npx gulp images` | Copy images → `dist/img/`                               |
| `npx gulp`        | All of the above + watch (default task)                 |

## Project structure

```
app/
├── index.html
├── gulpfile.js
├── package.json
├── assets/                 # source files
│   ├── fonts/
│   ├── img/
│   ├── js/app.js
│   └── scss/
│       ├── app.scss
│       ├── global/         # tokens, base, fonts
│       ├── components/     # header, footer, buttons, mobile-menu
│       └── blocks/         # hero, socials, slider
└── dist/                   # build output (generated)
```
