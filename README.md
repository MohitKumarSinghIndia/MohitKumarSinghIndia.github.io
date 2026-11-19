# Mohit Kumar Singh Portfolio

A responsive Unity and XR portfolio, ready for GitHub Pages. Built with HTML, CSS, and vanilla JavaScript. No build step, npm install, or runtime dependencies required.

## Preview

With Node.js 20 or later installed:

```sh
npm start
```

Open `http://127.0.0.1:4173/`. Stop with Ctrl+C. You can also open `index.html` directly for the basic portfolio, but use HTTP for video, captions, clipboard, and WebGL testing.

```sh
npm run check
```

Checks project data, configured local file paths, JavaScript syntax, and GitHub's regular-file size limit. It does not validate external links or compile Unity builds.

## Features

- Responsive desktop, tablet, and mobile layouts; mobile navigation
- One project data file drives the gallery, filters, counts, and detail dialogs
- Custom thumbnails with illustrated fallback covers
- Optional MP4 or YouTube videos and WebVTT captions
- Optional Unity WebGL players, loaded only when a visitor clicks Play
- Media cleanup when a dialog closes or the visitor changes media
- Résumé download, contact links, reduced motion, and keyboard focus support

## Folder structure

```text
.
├── index.html                     # Page sections, name, contact details
├── .nojekyll                      # Serve the site as static files on Pages
├── .gitignore
├── package.json                   # Local preview/check commands only
├── assets/
│   ├── favicon.svg
│   ├── css/
│   │   ├── styles.css             # Main design and responsive layout
│   │   └── media.css              # Thumbnails, video and WebGL player styles
│   ├── data/
│   │   └── projects.js            # EDIT YOUR PROJECTS HERE
│   ├── js/
│   │   ├── main.js                # Navigation, contact and active sections
│   │   ├── projects.js            # Gallery, filtering, dialogs and media
│   │   └── project-art.js         # Original illustrated fallback covers
│   ├── images/
│   │   ├── profile/
│   │   │   └── mohit-profile.png
│   │   └── projects/             # PUT YOUR PROJECT THUMBNAILS HERE
│   ├── documents/
│   │   └── Mohit_Kumar_Singh_Resume.pdf
│   ├── videos/                   # PUT OPTIONAL MP4 FILES HERE
│   └── captions/                 # Optional .vtt caption files
├── webgl/
│   └── magnet-madness/            # PUT THE COMPLETE UNITY EXPORT HERE
├── docs/
│   ├── GITHUB-PAGES.md            # Publishing instructions
│   └── MEDIA-GUIDE.md             # Image, video and Unity examples
└── scripts/
    ├── serve.mjs                  # Local HTTP server with video range support
    └── check.mjs                  # Validate data and local assets
```

## Replace a project thumbnail

Copy your image into `assets/images/projects/`, then edit the matching project in `assets/data/projects.js`:

```js
"thumbnail": "assets/images/projects/magnet-madness.webp",
"thumbnailAlt": "Magnet Madness gameplay",
```

Recommended image: 1200 × 675 pixels. Leave the path empty to keep the illustrated cover. Use lowercase filenames, forward slashes, and paths without a leading `/` so project-site URLs work too.

## Add videos and playable builds

Project objects already include optional `video`, `webglUrl`, and `links` fields. They are empty by default because no real project videos or compiled Unity builds have been supplied. The controls appear after you configure them. See the complete examples in [the media guide](docs/MEDIA-GUIDE.md).

## Publish on GitHub Pages

Upload this folder's **contents** to your repository. Keep `index.html` at the root. In **Settings → Pages**, choose **Deploy from a branch → main → / (root)**. For your main personal address, name the repository `YOUR_USERNAME.github.io`. Follow [the deployment guide](docs/GITHUB-PAGES.md) for the full setup.

Project information is in `assets/data/projects.js`; other page content is in `index.html`. Fonts use Google Fonts with system fallbacks. No repository has been created or published by this change.
