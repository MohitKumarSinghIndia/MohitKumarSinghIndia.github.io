"use strict";

// The only project content source is assets/data/projects.js.
(() => {
  const projects = window.PORTFOLIO_PROJECTS || [];
  const grid = document.querySelector('#project-grid');
  const filters = [...document.querySelectorAll('.filter')];
  const dialog = document.querySelector('#project-dialog');
  const controls = document.querySelector('#project-media-controls');
  const player = document.querySelector('#project-player');
  const status = document.querySelector('#media-status');
  const resources = document.querySelector('#project-resource-links');
  let trigger;

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  // Relative paths work on both username.github.io and username.github.io/repository/.
  function mediaUrl(value) {
    if (typeof value !== 'string' || !value.trim()) return null;
    try {
      const url = new URL(value, document.baseURI);
      if (['https:', 'http:'].includes(url.protocol)) return url.href;
      if (location.protocol === 'file:' && url.protocol === 'file:') return url.href;
    } catch { /* An invalid optional URL is simply omitted. */ }
    return null;
  }

  function youtubeId(video) {
    return video?.type === 'youtube' && /^[a-zA-Z0-9_-]{11}$/.test(video.id || '') ? video.id : null;
  }

  function availableMedia(project) {
    return [
      ['video', 'Watch video', youtubeId(project.video) || (project.video?.type === 'file' && mediaUrl(project.video.src))],
      ['webgl', 'Play WebGL', mediaUrl(project.webglUrl)]
    ].filter(([, , available]) => available);
  }

  function tags(items) {
    return items.map(tag => element('span', '', tag));
  }

  function artwork(project) {
    // This HTML is our own static artwork, never project-supplied text or URLs.
    const template = document.createElement('template');
    template.innerHTML = window.PORTFOLIO_ART?.[project.id] || '';
    let art = template.content.firstElementChild;
    if (!art) {
      art = element('div', 'project-art custom-art');
      art.append(element('span', 'project-art-title', project.title));
    }
    const thumbnail = mediaUrl(project.thumbnail);
    if (thumbnail) {
      if (!art.classList.contains('project-art')) art.className = 'project-art custom-art';
      const image = element('img', 'project-thumbnail');
      image.alt = project.thumbnailAlt || '';
      image.loading = 'lazy';
      image.decoding = 'async';
      image.width = 1200;
      image.height = 675;
      image.addEventListener('error', () => image.remove(), {once: true});
      image.src = thumbnail;
      art.append(image);
    }
    return art;
  }

  function renderCard(project) {
    const compact = project.category === 'web' && !project.thumbnail;
    const card = element('article', `project-card${compact ? ' compact-project' : ''}`);
    card.dataset.category = project.category;
    const button = element('button', 'project-open');
    button.type = 'button';
    button.dataset.project = project.id;
    button.setAttribute('aria-label', `Explore ${project.title}`);
    button.setAttribute('aria-haspopup', 'dialog');
    const info = element('div', 'project-info');
    const title = element('div', 'project-heading');
    title.append(element('p', 'project-type', project.label), element('h3', '', project.title));
    const actions = element('div', 'project-card-actions');
    for (const [kind, label] of availableMedia(project)) {
      const action = element('button', 'media-button project-media-action', label);
      action.type = 'button';
      action.setAttribute('aria-label', `${label} — ${project.title}`);
      action.setAttribute('aria-haspopup', 'dialog');
      action.addEventListener('click', () => openProject(project, action, kind));
      actions.append(action);
    }
    const details = element('button', 'project-details');
    details.type = 'button';
    details.setAttribute('aria-label', `Explore ${project.title}`);
    details.setAttribute('aria-haspopup', 'dialog');
    const plus = element('span', 'project-plus', '+');
    plus.setAttribute('aria-hidden', 'true');
    details.append(plus);
    details.addEventListener('click', () => openProject(project, details));
    actions.append(details);
    info.append(title, actions);
    button.append(artwork(project));
    button.addEventListener('click', () => openProject(project, button));
    const tagList = element('div', 'tags');
    tagList.append(...tags(project.tags.slice(0, 3)));
    card.append(button, info, element('p', 'project-summary', project.summary), tagList);
    return card;
  }

  function stopMedia() {
    const video = player.querySelector('video');
    if (video) {
      video.pause();
      video.removeAttribute('src');
      video.load();
    }
    // Removing an iframe releases its game/video document and audio.
    player.replaceChildren();
    player.hidden = true;
    status.textContent = '';
    controls.querySelectorAll('[data-media]').forEach(button => button.setAttribute('aria-pressed', 'false'));
    const stop = controls.querySelector('.stop-media');
    if (stop) stop.hidden = true;
  }

  function iframe(src, title) {
    const frame = element('iframe', 'embedded-player');
    frame.title = title;
    frame.src = src;
    frame.allow = 'fullscreen; gamepad; accelerometer; gyroscope; picture-in-picture';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    return frame;
  }

  function playMedia(project, kind, button) {
    stopMedia();
    let content;
    if (kind === 'webgl') {
      const url = mediaUrl(project.webglUrl);
      if (!url) return;
      content = iframe(url, `${project.title} — playable WebGL build`);
      status.textContent = 'Click inside the game to play. Desktop recommended. If it does not load here, use “Open WebGL in new tab”.';
    } else if (youtubeId(project.video)) {
      content = iframe(`https://www.youtube-nocookie.com/embed/${youtubeId(project.video)}`, `${project.title} — project video`);
    } else if (project.video?.type === 'file' && mediaUrl(project.video.src)) {
      content = element('video', 'embedded-player');
      content.controls = true;
      content.playsInline = true;
      content.preload = 'metadata';
      content.setAttribute('aria-label', `${project.title} — project video`);
      if (mediaUrl(project.video.poster)) content.poster = mediaUrl(project.video.poster);
      if (mediaUrl(project.video.captions)) {
        const track = element('track');
        track.kind = 'captions';
        track.src = mediaUrl(project.video.captions);
        track.srclang = project.video.language || 'en';
        track.label = project.video.captionLabel || 'English';
        track.default = true;
        content.append(track);
      }
      content.addEventListener('error', () => {
        status.textContent = 'This video could not be loaded. Check its path and MP4 format, or use “Open video in new tab”.';
      }, {once: true});
      content.src = mediaUrl(project.video.src);
    } else return;
    player.append(content);
    player.hidden = false;
    button.setAttribute('aria-pressed', 'true');
    controls.querySelector('.stop-media').hidden = false;
    dialog.classList.add('has-media');
  }

  function resourceLink(label, url) {
    const href = mediaUrl(url);
    if (!href) return;
    const link = element('a', 'text-link', label);
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    resources.append(link);
  }

  function configureMedia(project) {
    controls.replaceChildren();
    resources.replaceChildren();
    const videoAvailable = youtubeId(project.video) || (project.video?.type === 'file' && mediaUrl(project.video.src));
    const webglAvailable = mediaUrl(project.webglUrl);
    for (const [kind, label] of availableMedia(project)) {
      const button = element('button', 'media-button', label);
      button.type = 'button';
      button.dataset.media = kind;
      button.setAttribute('aria-pressed', 'false');
      button.setAttribute('aria-controls', 'project-player');
      button.addEventListener('click', () => playMedia(project, kind, button));
      controls.append(button);
    }
    controls.hidden = !controls.children.length;
    if (!controls.hidden) {
      const stop = element('button', 'media-button stop-media', 'Stop media');
      stop.type = 'button';
      stop.hidden = true;
      stop.addEventListener('click', () => { stopMedia(); controls.querySelector('[data-media]')?.focus(); });
      controls.append(stop);
    }
    if (webglAvailable) resourceLink('Open WebGL in new tab', project.webglUrl);
    if (videoAvailable) resourceLink('Open video in new tab', youtubeId(project.video) ? `https://www.youtube.com/watch?v=${youtubeId(project.video)}` : project.video.src);
    (project.links || []).forEach(link => resourceLink(link.label, link.url));
    resources.hidden = !resources.children.length;
  }

  function openProject(project, button, mediaKind) {
    trigger = button;
    stopMedia();
    dialog.classList.remove('has-media');
    document.querySelector('#dialog-title').textContent = project.title;
    document.querySelector('#dialog-type').textContent = project.type;
    document.querySelector('#dialog-date').textContent = project.date;
    document.querySelector('#dialog-intro').textContent = project.intro;
    document.querySelector('#dialog-details').replaceChildren(...project.details.map(detail => element('li', '', detail)));
    document.querySelector('#dialog-tags').replaceChildren(...tags(project.tags));
    configureMedia(project);
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add('modal-open');
    if (mediaKind) {
      const mediaButton = controls.querySelector(`[data-media="${mediaKind}"]`);
      if (mediaButton) {
        playMedia(project, mediaKind, mediaButton);
        mediaButton.focus({preventScroll: true});
        player.scrollIntoView({block: 'nearest'});
      }
    }
  }

  grid.replaceChildren(...projects.map(renderCard));
  document.querySelector('#all-project-count').textContent = String(projects.length).padStart(2, '0');
  const cards = [...grid.children];
  function updateFilter(category) {
    let count = 0;
    cards.forEach(card => {
      card.hidden = category !== 'all' && card.dataset.category !== category;
      if (!card.hidden) count++;
    });
    document.querySelector('.project-count').textContent = `${count} ${count === 1 ? 'project' : 'projects'}`;
  }
  updateFilter('all');
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(filter => {
      const active = filter === button;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    updateFilter(button.dataset.filter);
  }));
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    stopMedia();
    dialog.classList.remove('has-media');
    document.body.classList.remove('modal-open');
    trigger?.focus({preventScroll: true});
  });
})();
