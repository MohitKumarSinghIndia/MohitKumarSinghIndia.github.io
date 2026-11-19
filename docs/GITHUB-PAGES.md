# Publish this portfolio on GitHub Pages

This is a static website. No npm install, framework build, or server is needed on GitHub Pages. `package.json` is only for local preview and validation.

## Your main username.github.io address

1. Create a GitHub repository named **YOUR_USERNAME.github.io**, replacing YOUR_USERNAME with your actual GitHub username. For the profile currently linked in this portfolio, that would be `MohitKumarSingh-01.github.io` if that is the account you use.
2. Upload the **contents** of this website folder to the repository's root. The root must contain `index.html`, `.nojekyll`, and the `assets/` and `webgl/` folders. Do not upload only the ZIP file or place the whole site inside an extra parent folder.
3. Commit the files on the `main` branch.
4. Open **Settings → Pages** in the repository.
5. Under **Build and deployment**, set **Source → Deploy from a branch**.
6. Choose **main** and **/ (root)**, then save.
7. Wait for GitHub's deployment to complete. Open the URL shown by GitHub Pages. Your user-site address will be `https://YOUR_USERNAME.github.io/`.

For GitHub Free, use a public repository. For a private repository, availability depends on your plan. Follow GitHub's [official quickstart](https://docs.github.com/en/pages/quickstart) and [publishing source guide](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## An ordinary project repository

You can instead use a repository such as `portfolio`. Choose the same branch/root publishing settings. The address will be `https://YOUR_USERNAME.github.io/portfolio/`. This website's relative asset and media paths support both user-site and project-site URLs.

## Before publishing

```sh
npm run check
npm start
```

Open `http://127.0.0.1:4173/` and check the gallery, résumé, contact details, and any media you have added. Node.js 20 or later is needed for the local commands; there are no dependencies to install. Stop the preview with Ctrl+C when finished.

The check validates project data, script syntax, configured local files, and regular Git file sizes. It does not compile Unity games or verify external URLs. Test actual WebGL and video playback on your published site too.

## Future updates

Edit `assets/data/projects.js`, replace or add media files, run the checks, and commit/push to `main`. Pages republishes after updates to the publishing branch. Keep `.nojekyll` so static files and generated build folders are served without Jekyll processing.

If you use Git locally, commit and push through your existing repository setup. This workspace is not connected to a Git repository yet; no repository has been created or pushed for you.
