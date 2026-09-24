# GitHub Pages deployment

GitHub Pages must publish Angular's compiled output, not the repository root.

1. In repository Settings > Pages > Build and deployment, set Source to **GitHub Actions**.
2. Push the deployment workflow and application changes to `main`.
3. Wait for **Deploy Angular to GitHub Pages** in the Actions tab to finish.
4. Open https://romeoarch.github.io/frontend-service/.

The workflow installs the lockfile dependencies, builds Angular with the Pages base path, and uploads only `dist/frontend-service/browser`.

Pages uses hash routing, for example `/frontend-service/#/login`, so direct links and refreshes work without server rewrites. Local development keeps normal URLs. Font files are bundled with relative asset URLs.

To verify locally: `npm.cmd run build -- --configuration production,github-pages --base-href /frontend-service/`.

The login and admin area remain frontend mockups with fictional contacts. The demo credentials are public client-side code and provide no real security. No database or backend is deployed.
