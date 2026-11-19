/**
 * Edit projects here. Cards, filters, counts, and dialogs update automatically.
 * Paths are relative to index.html; keep them free of a leading slash.
 * thumbnail: 'assets/images/projects/magnet-madness.webp'
 * video: {type: 'file', src: 'assets/videos/magnet-madness.mp4', poster: '', captions: ''}
 * or video: {type: 'youtube', id: 'YOUR_11_CHAR_VIDEO_ID'}
 * webglUrl: 'webgl/magnet-madness/index.html'
 * links: [{label: 'Source code', url: 'https://github.com/your-name/your-project'}]
 * Leave optional strings empty and video null until you add your files.
 */
window.PORTFOLIO_PROJECTS = [
  {
    "id": "magnet",
    "slug": "magnet-madness",
    "category": "games",
    "title": "Magnet Madness",
    "type": "Multiplayer / Android Game",
    "date": "February — April 2026",
    "intro": "A turn-based multiplayer Android game built around tactical magnet placement, physical interactions, and a responsive game loop.",
    "details": [
      "Built timed turns, synchronized state handling, and win-condition logic for multiplayer play.",
      "Implemented responsive drag-and-drop magnet interactions, real-time collision detection, and clear gameplay feedback.",
      "Structured skins, currency, pricing, and player settings with ScriptableObjects to keep the economy modular.",
      "Created a DOTween-powered UI with panel navigation, live updates, audio, haptics, and camera shake."
    ],
    "tags": [
      "Unity",
      "C#",
      "Photon Fusion",
      "DOTween",
      "ScriptableObjects",
      "Game Economy"
    ],
    "label": "2D GAME DEVELOPMENT",
    "summary": "A little strategy. A lot of attraction. Turn-based multiplayer with satisfying, physics-driven interactions.",
    "thumbnail": "assets/images/projects/magnet-madness.webp",
    "thumbnailAlt": "Magnet Madness gameplay",
    "video": {
      "type": "file",
      "src": "assets/videos/magnet-madness.mp4",
      "poster": "",
      "captions": "",
      "language": "en",
      "captionLabel": "English"
    },
    "webglUrl": "",
    "links": []
  },
  {
    "id": "engineering",
    "slug": "engineering-marvels",
    "category": "xr",
    "title": "Engineering Marvels",
    "type": "Mixed Reality / Meta Quest",
    "date": "",
    "intro": "An educational mixed reality experience where learners assemble engineering modules in an immersive workspace.",
    "details": [
      "Developed immersive assembly interactions for Meta Quest using Unity XR and the Meta SDK.",
      "Supported shared multiplayer collaboration with Photon Fusion.",
      "Used spatial anchors to maintain stable placement across sessions.",
      "Integrated Firebase for cloud-backed learning progress."
    ],
    "tags": [
      "Unity XR",
      "Meta SDK",
      "Photon Fusion",
      "AWS S3",
      "Firebase",
      "Meta Quest"
    ],
    "label": "AR / VR DEVELOPMENT",
    "summary": "Bring engineering off the page and into your space. Assemble, explore, and learn together in mixed reality.",
    "thumbnail": "",
    "thumbnailAlt": "",
    "video": null,
    "webglUrl": "",
    "links": []
  },
  {
    "id": "flappy",
    "slug": "flappy-bird",
    "category": "games",
    "title": "Flappy Bird",
    "type": "Arcade / Android Game",
    "date": "January 2025",
    "intro": "An arcade-style Android game focused on clean tap-to-fly controls and consistent gameplay state.",
    "details": [
      "Implemented tap-to-fly controls, obstacle timing, and scoring with Unity 2D physics.",
      "Built pause, resume, and restart flows.",
      "Managed stable transitions from the start screen through gameplay to game over."
    ],
    "tags": [
      "Unity",
      "C#",
      "2D Physics",
      "Game State",
      "Score System"
    ],
    "label": "2D GAME DEVELOPMENT",
    "summary": "A familiar arcade challenge, built around crisp controls, precise timing, and the urge to try again.",
    "thumbnail": "Assets/images/projects/flappy-bird.webp",
    "thumbnailAlt": "Flappy Bird gameplay",
    "video": null,
    "webglUrl": "",
    "links": []
  },
  {
    "id": "slots",
    "slug": "slot-machine",
    "category": "games",
    "title": "Wishing Dragon",
    "type": "2D Game Development - Windows",
    "date": "",
    "intro": "A Windows game that brings reel animations and a complete set of slot mechanics into one cohesive Unity experience.",
    "details": [
      "Built reel spinning, dynamic bet controls, and balance validation.",
      "Implemented wild and scatter outcomes with partial-win rules.",
      "Added multiplier rewards and bonus free-spin logic for a complete gameplay loop."
    ],
    "tags": [
      "Unity",
      "C#",
      "Slot Logic",
      "Betting System",
      "Wild Symbols",
      "Scatter Rewards",
      "Free Spins"
    ],
    "label": "2D GAME DEVELOPMENT",
    "summary": "A complete gameplay loop with dynamic reels, wild symbols, multipliers, and bonus free spins.",
    "thumbnail": "assets/images/projects/wishing-dragon.webp",
    "thumbnailAlt": "Wishing Dragon gameplay",
    "video": {
      "type": "file",
      "src": "assets/videos/wishing-dragon.mp4",
      "poster": "",
      "captions": "",
      "language": "en",
      "captionLabel": "English"
    },
    "webglUrl": "",
    "links": []
  },
  {
    "id": "chat",
    "slug": "realtime-chat",
    "category": "web",
    "title": "Realtime Chat App",
    "type": "Web Application / Real-time Communication",
    "date": "March 2023",
    "intro": "A multi-user chat application with instant two-way communication through Socket.io.",
    "details": [
      "Created a join-name flow for entering conversations.",
      "Implemented active connection handling and message broadcasting.",
      "Used a lightweight Node.js client-server architecture for fast live updates."
    ],
    "tags": [
      "JavaScript",
      "Node.js",
      "Socket.io",
      "Realtime Events",
      "Client-Server"
    ],
    "label": "WEB APPLICATION",
    "summary": "Instant conversations, connected people. A real-time chat experience powered by Socket.io.",
    "thumbnail": "",
    "thumbnailAlt": "",
    "video": null,
    "webglUrl": "",
    "links": []
  },
  {
    "id": "weather",
    "slug": "weather-app",
    "category": "web",
    "title": "Weather App",
    "type": "Web Application / API Integration",
    "date": "August — September 2022",
    "intro": "A responsive weather application that makes current conditions easy to find by city or location.",
    "details": [
      "Integrated the OpenWeatherMap API for real-time weather conditions.",
      "Implemented city search and current-location lookup through geolocation.",
      "Presented key weather information in a simple, responsive interface."
    ],
    "tags": [
      "JavaScript",
      "REST APIs",
      "OpenWeatherMap",
      "Geolocation",
      "API Integration"
    ],
    "label": "WEB APPLICATION",
    "summary": "Your city, at a glance. Live weather through city search and location-based conditions.",
    "thumbnail": "",
    "thumbnailAlt": "",
    "video": null,
    "webglUrl": "",
    "links": []
  }
];
