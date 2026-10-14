# Dr. Gundala Nagaraju — source

This is the real source for **https://dr-gundala-nagaraju.vercel.app/**

Until this folder was added, the site had no source anywhere — only a minified
production bundle with hand-written CSS overrides. Every future change would
have had to be made by editing build output, which any rebuild silently
discards. This directory fixes that.

## Why the built site lives one level up

`dr-gundala/index.html` is what Vercel serves for the `dr-gundala-nagaraju.vercel.app`
host (see `vercel.json` at the repo root). It is a self-contained deployment
copy: its assets live in `dr-raju/assets/` and it references them as
`./assets/...`.

This used to reference `../index-*.js` at the repo root, which meant the folder
was not independently deployable — serving it from anywhere other than the repo
root silently 404'd. It is now self-contained.

## Workflow

```bash
cd dr-raju/source
npm install
npm run dev      # local dev server

npm run build    # emits ./dist
```

Then copy `dist/` over `dr-raju/` to update the deployed copy:

```bash
cd dr-raju
rm -rf assets index.html
cp -r source/dist/. .
```

Keep `dr-raju/` and `source/dist/` in sync. `dr-raju/` is what ships; `source/`
is what you edit.

## Notes

- **Stack:** Vite + React 18, no animation or UI libraries. Motion is plain CSS
  plus one `IntersectionObserver` — see `src/styles/motion.css`.
- **Content:** all copy and links live in `src/data/content.js`.
- **Translations:** `src/i18n/messages.js` is generated, keyed by the English
  source string. `src/i18n/extra-messages.js` holds strings that had no
  equivalent in the original bundle (validation messages, carousel controls).
- **Section numbering** is derived from position in `SECTION_ORDER` in
  `content.js`, so inserting or removing a section cannot leave a gap in the
  `01 / … 09 / …` sequence.
- **Unused images:** `g02`, `g07` and `g08` are not referenced by any section.
  They are kept in `src/assets/` but are excluded from the build.