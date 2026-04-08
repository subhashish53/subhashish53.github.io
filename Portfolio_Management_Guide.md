# Portfolio Website Management Guide
**Subhashish Bhattacharya — Senior Cybersecurity Engineer**
Last updated: April 2026

---

## Overview

Your portfolio runs simultaneously on two platforms:

| Platform | Live URL | Folder to Edit |
|---|---|---|
| **GitHub Pages** | https://subhashish53.github.io | `github/` |
| **Netlify** | https://subhashish53.netlify.app | `netlify/` |

Both sites look identical to visitors. The only difference is how the **Contact form** works:
- **GitHub Pages** → Opens the visitor's email client (mailto)
- **Netlify** → Sends the message directly (Netlify Forms), you receive it in your Netlify dashboard

---

## Folder Structure

```
my-portfolio/
├── github/                  ← Edit this for GitHub Pages
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── Subhashish_Bhattacharya.pdf
│
├── netlify/                 ← Edit this for Netlify
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── Subhashish_Bhattacharya.pdf
│
├── docs/                    ← DO NOT EDIT (auto-synced from github/)
│   └── (copy of github/)
│
├── netlify.toml             ← Netlify config (publish = "netlify")
├── .gitignore
└── Portfolio_Management_Guide.md
```

---

## How Deployment Works

### GitHub Pages
- Reads files from the `docs/` folder on the `main` branch
- Deploys automatically within ~30 seconds of every `git push`
- You **never edit `docs/` directly** — always edit `github/` then sync

### Netlify
- Reads files from the `netlify/` folder (set in `netlify.toml`)
- Deploys automatically within ~20 seconds of every `git push`
- You edit `netlify/` for any Netlify-specific changes

---

## Workflow: Making Changes

### Step 1 — Decide which site(s) need the change

| Type of change | Edit in |
|---|---|
| Content (text, experience, skills, certs) | **Both** `github/` and `netlify/` |
| Visual (CSS, layout, colours) | **Both** `github/style.css` and `netlify/style.css` |
| JavaScript behaviour | **Both** (but keep form handlers different — see below) |
| Contact form logic | **github/script.js** only OR **netlify/script.js** only |
| CV PDF | **Both** folders |

### Step 2 — Edit the file(s)

Open the file in any text editor (Notepad++, VS Code, etc.) and make your changes.

### Step 3 — Sync github/ to docs/

After editing `github/`, copy the files to `docs/`. Run this in PowerShell from the `my-portfolio` folder:

```powershell
Copy-Item github\* docs\ -Force
```

Skip this step if you only edited `netlify/`.

### Step 4 — Commit and push

Open PowerShell in the `my-portfolio` folder and run:

```powershell
git add .
git commit -m "brief description of what you changed"
git push
```

Both sites update automatically.

---

## Keeping Both Sites in Sync (Content Changes)

When you update content (e.g. new job, new certification), you need to update **both** `github/index.html` and `netlify/index.html`.

The key differences between the two index.html files — **do not accidentally swap these**:

| Line | github/index.html | netlify/index.html |
|---|---|---|
| og:url | `https://subhashish53.github.io/` | `https://subhashish53.netlify.app/` |
| Form tag | `<form id="contact-form" ...>` | `<form ... netlify netlify-honeypot="bot-field" ...>` |
| After form tag | *(nothing)* | `<input type="hidden" name="form-name" value="contact"/>` |

Everything else in both files should be **identical**.

---

## Files That Are Identical in Both Folders

These files are always the same — edit once, copy to both:

- `style.css` — all styling
- `Subhashish_Bhattacharya.pdf` — your CV

Quick sync command (PowerShell):
```powershell
Copy-Item github\style.css netlify\style.css -Force
Copy-Item "github\Subhashish_Bhattacharya.pdf" "netlify\Subhashish_Bhattacharya.pdf" -Force
```

---

## Updating Your CV PDF

1. Replace `github\Subhashish_Bhattacharya.pdf` with your new PDF (keep the same filename)
2. Copy to the other folder:
   ```powershell
   Copy-Item "github\Subhashish_Bhattacharya.pdf" "netlify\Subhashish_Bhattacharya.pdf" -Force
   ```
3. Sync github to docs:
   ```powershell
   Copy-Item github\* docs\ -Force
   ```
4. Commit and push:
   ```powershell
   git add .
   git commit -m "Update CV"
   git push
   ```

---

## Adding a New Certification

1. Open `github/index.html` — find the `certs-grid` section
2. Add a new `<a class="cert-badge">` line with the Google Drive link
3. Repeat step 1–2 for `netlify/index.html`
4. Update the cert count stat card (currently shows `11`) in both files
5. Sync, commit, push (steps 3–4 from Workflow above)

---

## What Each Script File Does Differently

### github/script.js
Contact form submits via `mailto:` — opens the visitor's email client with fields pre-filled.
```
No server needed. Works on any static host.
```

### netlify/script.js
Contact form submits via `fetch()` POST to Netlify's form processing endpoint.
```
Requires Netlify hosting. Messages appear in your Netlify dashboard under Forms.
```

**Never swap these files between folders.**

---

## Checking Deployment Status

### GitHub Pages
- Go to: https://github.com/subhashish53/subhashish53.github.io/actions
- Or check: https://github.com/subhashish53/subhashish53.github.io/deployments

### Netlify
- Go to: https://app.netlify.com → your site → Deploys tab

---

## Quick Reference Commands

Open PowerShell in `C:\Users\sbhattac\OneDrive - BMC Helix\Desktop\my-portfolio`

```powershell
# Sync github/ changes to docs/
Copy-Item github\* docs\ -Force

# Sync style.css to both folders
Copy-Item github\style.css netlify\style.css -Force

# See what files changed
git status

# See what content changed
git diff

# Push everything live
git add .
git commit -m "your message here"
git push
```

---

## Repository Details

| Item | Value |
|---|---|
| GitHub Repo | https://github.com/subhashish53/subhashish53.github.io |
| GitHub Pages URL | https://subhashish53.github.io |
| Netlify URL | https://subhashish53.netlify.app |
| Local folder | C:\Users\sbhattac\OneDrive - BMC Helix\Desktop\my-portfolio |
| Default branch | main |
| GitHub Pages source | /docs on main |
| Netlify publish dir | netlify/ |

---

*Guide maintained alongside the portfolio. Update this document when the folder structure changes.*
