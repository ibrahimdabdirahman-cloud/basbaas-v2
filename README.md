# BasBaas Cuisine — Website

Static website for **BasBaas**, an authentic Somali restaurant in SE18, London.
Plain HTML/CSS/JS — no build step, no dependencies. Deploys anywhere static.

## Pages
| File | Page |
|------|------|
| `index.html` | Home |
| `menu.html` | Menu (category + spice-level filtering) |
| `private-events.html` | Private events & hall hire |
| `gallery.html` | Photo gallery (lightbox) |
| `about.html` | About / story |
| `contact.html` | Contact, hours & map |

Shared styles/behaviour: `assets/basbaas.css`, `assets/basbaas.js`
Brand logo + favicons: `assets/brand/`
Food photography: `assets/img/`

## 📸 Images — read this first
The repo ships with on-brand **placeholder** images in `assets/img/` so it builds
and deploys cleanly out of the box. To swap in the real food photography, do **one** of:

**A. Pull the originals from the live site** (one command):
```bash
./fetch-assets.sh        # macOS / Linux / Git Bash / WSL  (needs curl)
# or, cross-platform with Node 18+:
node fetch-assets.mjs
```
This downloads the real photos into `assets/img/`, overwriting the placeholders.

**B. Use your own photos:** drop your images into `assets/img/`, keeping the same
filenames (see the list in `fetch-assets.mjs`), or rename and update the `src`
paths in the HTML.

Run this **before** pushing to GitHub if you want the real photos committed to the repo.

## Run locally
```bash
npx serve .
# or
python3 -m http.server
```
Then open http://localhost:3000 (or :8000).

## Deploy to Vercel
Static site — no framework, no build.

**Dashboard:** push to GitHub → Vercel **Add New → Project** → import the repo →
Framework Preset **Other**, Build Command empty, Output Directory `./` → Deploy.

**CLI:**
```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

## Before going live
- Replace placeholder photos (see above).
- Wire the **booking**, **enquiry** and **contact** forms to a real backend or
  reservation provider — they're front-end demos that show a confirmation only.
- Point the **Order online** links (`assets/basbaas.js`) and footer **social** icons
  at your real Deliveroo / Just Eat / Uber Eats / Instagram / TikTok URLs.
- Confirm the **opening hours** in `contact.html` and the **About** copy.
