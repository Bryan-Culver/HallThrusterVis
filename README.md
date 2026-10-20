# HallThrusterVis
A web app that demonstrates the Hall Effect Thruster to the general public (ASU / NASA Psyche mission capstone).

Developers: Bryan Culver, Cameron Troy, Julio Jovel, Ira Sigman, Kyle Johnson

Live site: https://bryan-culver.github.io/HallThrusterVis/

## Deployment (GitHub Pages)

`.github/workflows/deploy.yml` builds the Vite app and publishes `hall-eff-thr-vis/dist` on every push to `master`.
One-time setup: repo **Settings > Pages > Build and deployment > Source: GitHub Actions**.
The build uses a relative `base`, so it works under the `/HallThrusterVis/` sub-path. The root `_config.yml` only
matters if Pages is switched to "Deploy from a branch" (it stops Jekyll from processing the app sources).

## Develop

```
cd hall-eff-thr-vis
corepack enable  # or: npm install -g pnpm   (the pnpm version is pinned in package.json)
pnpm install
pnpm dev         # http://localhost:5173
pnpm build       # static site in hall-eff-thr-vis/dist
pnpm preview     # serve the production build locally
```

Before merging an upgrade (or any change), run the same checks CI runs on every pull request:

```
pnpm build && pnpm smoke   # smoke = loads the built app in headless Chromium and fails on runtime errors
```

The **PR build check** workflow (`.github/workflows/ci.yml`) does this automatically for every pull request, including Dependabot's, so a red check on a Dependabot PR means that upgrade breaks the build or the app.

This project uses [pnpm](https://pnpm.io). Commit `pnpm-lock.yaml`, and don't run `npm install` (it would create a competing `package-lock.json`).

The app is a fully static site (Vite + React + three.js from npm), so it can be hosted on any free static host.

## 3D models are loaded by URL

No 3D assets are bundled with the app. `hall-eff-thr-vis/src/config/models.json` maps each view
(Thruster, Chamber, Injector, Cathode, Coils) to an `.obj` (+ optional `.mtl`) file:

- Entries can be absolute URLs, or paths relative to `baseUrl`.
- `baseUrl` can be overridden at build time with `VITE_MODEL_BASE_URL` (see `.env.example`).
- The host must send CORS headers (GitHub Pages, jsDelivr, Cloudflare R2/S3 with CORS all do).

Currently `baseUrl` points at jsDelivr, pinned to commit `f73c513`, which still contains the original files.
To move them elsewhere, upload the `meshes/` and `materials/` folders and change `baseUrl`.

### Recommended asset hosting

The models total ~1.7 MB, so paid storage isn't needed. Free options, best first:

1. **Cloudflare R2** (free tier, no egress fees): create a bucket, enable public access, add a CORS rule
   allowing `GET` from your site's origin, upload the files, and set `baseUrl` to the public bucket URL.
2. **GitHub Pages / jsDelivr** from a separate assets repo (the current setup, pinned to an old commit).
3. DigitalOcean Spaces or S3 + CloudFront work the same way but cost money.

Prefer `.glb` for new assets: one binary file, smaller than OBJ+MTL, and no separate material/texture files.
Put `"obj": "meshes/Assembly.glb"` in `models.json` (no `mtl`) and it is loaded with `GLTFLoader`.

CI fails and `.gitignore` blocks 3D file types under `hall-eff-thr-vis/` so assets aren't re-committed.

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml` builds and publishes on every push to `master`.
One-time setup: repo **Settings → Pages → Source: GitHub Actions**.
Optionally set a repository variable `MODEL_BASE_URL` to override the asset host.

Vercel/Netlify also work with no config changes: root directory `hall-eff-thr-vis`, build command `pnpm build`, output `dist`, and `VITE_MODEL_BASE_URL` as an env var.

`Parts In Progress/` holds the SolidWorks/CAD source files and is not used by the app.
