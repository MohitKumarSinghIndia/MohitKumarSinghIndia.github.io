# Updating projects, thumbnails, videos, and WebGL builds

All project content lives in [`assets/data/projects.js`](../assets/data/projects.js). You do not need to edit the card HTML or application code. Keep the existing `window.PORTFOLIO_PROJECTS = [...]` wrapper and edit the objects inside it. Every project needs a unique `id`. Existing artwork is associated with that id.

## Replace a thumbnail

1. Copy your screenshot into `assets/images/projects/`, for example `magnet-madness.webp`.
2. In that project's object, change these fields:

```js
"thumbnail": "assets/images/projects/magnet-madness.webp",
"thumbnailAlt": "Magnet Madness multiplayer game board",
```

Use a 16:9 landscape screenshot, ideally 1200 × 675 pixels. WebP, JPG, and PNG work. Keep names lowercase with hyphens. Images fill their card and crop at the edges. To show the whole image instead, change `.project-thumbnail` to `object-fit: contain` in `assets/css/media.css`.

Leave `thumbnail` as `""` to use the existing illustrated cover. A missing or broken custom image also falls back to the illustration. No actual game screenshots are included yet.

To replace it again later, overwrite the file with the same name and push your changes. If the browser still shows the old image, hard-refresh or change the filename and update the path.

## Add an MP4 video

Copy your video into `assets/videos/`. Exporting an MP4 with H.264 video and AAC audio is a broadly compatible choice. Replace `"video": null` in the project with:

```js
"video": {
  "type": "file",
  "src": "assets/videos/magnet-madness.mp4",
  "poster": "assets/images/projects/magnet-madness.webp",
  "captions": "",
  "language": "en",
  "captionLabel": "English"
},
```

`poster` and `captions` are optional. For speech, add a WebVTT caption file under `assets/captions/` and set `captions` to its path. [`example.vtt`](../assets/captions/example.vtt) shows the format; replace its sample text with the real transcript and timings.

The project dialog gains a **Watch video** button. It loads a video player after a visitor clicks, with native playback, volume, seeking, and fullscreen controls. It does not autoplay. Closing the dialog or choosing another media type stops playback.

## Use a YouTube video instead

For long videos, use YouTube to avoid adding large video files to the Git repository. Upload your video there, allow embedding, and use:

```js
"video": {
  "type": "youtube",
  "id": "YOUR_11_CHAR_VIDEO_ID"
},
```

Replace the example id with the actual 11-character id from `https://www.youtube.com/watch?v=VIDEO_ID`. Do not paste the whole URL into `id`. The portfolio uses YouTube's privacy-enhanced embed domain and only creates the iframe after **Watch video** is clicked. Age, privacy, and embedding restrictions can still prevent playback. An **Open video in new tab** link is also shown.

## Add a Unity WebGL build

### Prepare the build in Unity

1. Install your Unity Editor's Web/WebGL Build Support module if needed.
2. Switch the build target to Web/WebGL using the build settings or build profiles available in your Unity version.
3. For an initial GitHub Pages deployment, use **Compression Format: Disabled** in the Web Player publishing settings. This creates larger downloads but avoids needing custom content-encoding headers.
4. For a smaller compressed build, use **Gzip + Decompression Fallback enabled**, then verify the published build. Unity's fallback loader handles decompression when the host does not send the required compression headers. Avoid uploading a Brotli/Gzip build that depends on server header configuration you have not set up.
5. Use a release build and test a small, single-threaded build first. Features requiring cross-origin-isolation headers, unsupported browser APIs, or native plugins need additional deployment work; this portfolio does not add those server headers.

Unity explains the compression and fallback requirements in its [official deployment documentation](https://docs.unity.com/en-us/engine/6000.0/manual/platform-specific/webgl/building-distribution/deploying). Exact menu labels vary by Unity version.

### Copy the entire exported folder

Place the contents of your Unity export under `webgl/magnet-madness/`:

```text
webgl/
└── magnet-madness/
    ├── index.html
    ├── Build/
    │   ├── your-build.loader.js
    │   ├── your-build.framework.js
    │   ├── your-build.data
    │   └── your-build.wasm
    └── TemplateData/
```

Filenames and extensions vary with Unity version and compression settings. Copy the actual export intact, including any additional generated files. Do not rename Unity's generated files independently or change their relative locations. Do not upload your Unity project's `Assets/`, `Library/`, or `Temp/` folders here.

Update the project's field:

```js
"webglUrl": "webgl/magnet-madness/index.html",
```

The dialog gains **Play WebGL** and **Open WebGL in new tab** controls. The game is embedded only after the visitor clicks Play, so the homepage does not download every game's build. Closing the dialog removes the iframe and unloads the game. Visitors can also use the Unity template's fullscreen control. Games that capture the keyboard may require the visitor to click outside the game before using Escape to close the dialog.

Repeat with `webgl/flappy-bird/` or another project slug for each game. Test over HTTP with `npm start`; Unity builds generally cannot load correctly from `file://` URLs. Mobile performance and browser support depend on your actual game and Unity version.

### Host a large build elsewhere

You can also set `webglUrl` to a full HTTPS URL for a build hosted elsewhere. The host must allow iframe embedding. If it blocks embedding, visitors can still use **Open WebGL in new tab**. Use a direct player/embed URL when your provider supplies one.

GitHub blocks regular Git files larger than **100 MiB**, and uploads through its web interface have a **25 MiB** per-file limit. Published GitHub Pages sites must be within **1 GB**. Do not rely on Git LFS for Pages-hosted games: [Git LFS cannot be used with GitHub Pages](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage). For large games or videos, use an external media/game host and configure its URL here. See [GitHub's file limits](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github) and [Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).

## Add a completely new project

Duplicate a project object in `assets/data/projects.js`. Change `id`, `slug`, text, tags, and media paths. Categories are `games`, `xr`, and `web`. The gallery, filter results, and All work count update automatically. A new id without existing fallback artwork gets a generic cover until you supply a thumbnail.

Add optional external links with:

```js
"links": [
  {"label": "Source code", "url": "https://github.com/YOUR_USERNAME/YOUR_REPOSITORY"},
  {"label": "Live website", "url": "https://YOUR_WEBSITE"}
]
```

Use empty strings, `video: null`, and `links: []` for things you have not added. Do not leave example paths pointing to files that do not exist. Run `npm run check` before pushing.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Thumbnail still shows artwork | Filename, extension, path, and letter case; run `npm run check`. |
| No video or WebGL button | Configure `video` or `webglUrl` in that project's object. Empty fields intentionally hide controls. |
| Gallery disappears after an edit | JavaScript syntax: commas between fields and objects, quoted strings, matching brackets. Run the check. |
| Works locally but fails on Pages | Use forward-slash relative paths, matching letter case, and no leading `/`. |
| Unity reports compression errors | Rebuild with compression disabled, or use Gzip with Decompression Fallback. Upload all generated files. |
| Embedded build is blank | Open it in a new tab, inspect its own browser errors, and check whether the external host allows embedding. |
| Git push rejects a build | A regular Git file may exceed 100 MiB. Use an external game host for that build. |

The portfolio supports media integration, but no real project video or compiled Unity build is included. Test your own media after uploading it and again on the published site.
