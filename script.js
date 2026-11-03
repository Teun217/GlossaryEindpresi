// Every animation is a standalone page: animations/<slug>.html
const animations = {
  'adaptation': 'Adaptation',
  'affect': 'Affect',
  'balancing-feedback': 'Balancing Feedback',
  'beyond-control': 'Beyond Control',
  'control': 'Control',
  'cybernetics': 'cybernetics',
  'ecology': 'Ecology',
  'friction': 'Friction',
  'in-between': 'in-between',
  'interaction': 'interaction',
  'interface': 'Interface',
  'intra-action': 'Intra-action',
  'intraface': 'Intraface',
  'invisible': 'Invisible',
  'latent-space': 'Latent Space',
  'liminal-space': 'Liminal Space',
  'lines-of-flight': 'Lines of Flight',
  'neutrum': 'Neutrum',
  'noise': 'Noise',
  'object': 'Object',
  'out-of-control': 'Out of Control',
  'proximity': 'Proximity',
  'recursivity': 'Recursivity',
  'reinforcing-feedback': 'Reinforcing Feedback',
  'remote-control': 'Remote Control',
  'silence': 'Silence',
  'subject': 'subject',
  'system': 'System',
  'trigger': 'trigger',
};

// The overview, a block per period. A slug from `animations` shows that
// animation; any other text is a term whose animation isn't added yet;
// null is an empty slot. `title` replaces the label on the period's own slide;
// `hidden` periods only get a slide, not a block on the overview.
const schedule = [
  { label: 'Voor de stage', terms: ['adaptation', 'intra-action', 'invisible', 'balancing-feedback', 'lines-of-flight', 'reinforcing-feedback', 'system'] },
  { label: 'Week 1', terms: [], hidden: true },
  { label: 'Week 2', terms: ['interaction', 'intra-action', 'liminal-space', 'latent-space'] },
  { label: 'Week 3', terms: ['intraface', 'interface', 'ecology', 'cybernetics'] },
  { label: 'Week 5', title: 'Week 4 en 5', terms: ['reinforcing-feedback'] },
  { label: 'Week 6', terms: ['control', 'remote-control', 'out-of-control', 'beyond-control'] },
  { label: 'Week 7', terms: ['neutrum', 'silence', 'noise'] },
  { label: 'Week 8', terms: ['recursivity', 'proximity', 'friction', 'affect'] },
  { label: 'Week 9', terms: ['object', 'in-between', 'trigger', 'subject'] },
];

const periodId = (label) => label.toLowerCase().replace(/[^a-z0-9]+/g, '-');

const slides = document.querySelector('.reveal .slides');
const weeks = document.querySelector('.weeks');

// Changes slide inside a view transition. When `from` and `to` are given, that
// element morphs into the other one (thumbnail <-> detail animation); the rest
// of the slide crossfades.
function transition(update, from, to) {
  if (!document.startViewTransition) {
    update();
    return;
  }
  if (from) from.style.viewTransitionName = 'animation';
  const viewTransition = document.startViewTransition(() => {
    if (from) from.style.viewTransitionName = '';
    update();
    if (to) to.style.viewTransitionName = 'animation';
  });
  viewTransition.finished.finally(() => {
    if (to) to.style.viewTransitionName = '';
  });
}

const next = () => transition(() => Reveal.next());
const prev = () => transition(() => Reveal.prev());
const up = () => transition(() => Reveal.up());
const down = () => transition(() => Reveal.down());
// ← → go from slide to slide, always landing on the animation itself (not on
// the explanation below it); ↑ ↓ move between animation and explanation
const left = () => transition(() => Reveal.slide(Math.max(Reveal.getIndices().h - 1, 0), 0));
const right = () => transition(() => Reveal.slide(Math.min(Reveal.getIndices().h + 1, slideCount), 0));

const slideHeader = (title) => `
  <header>
    <button class="back">← Overzicht</button>
    <h2>${title}</h2>
  </header>`;

// The slide under each animation: reasoning and inspiration images (see content.js),
// in the grid-line layout of the glossary site's detail pages
function infoSlide(slug) {
  const { reasoning = [], inspiration = [] } = content[slug] || {};
  const paragraphs = reasoning.length
    ? reasoning.map((text) => `<p>${text}</p>`).join('')
    : '<p class="placeholder">Reasoning for this animation goes here (content.js).</p>';
  const images = inspiration.length ? inspiration : [{}, {}, {}];
  const figures = images.map((image) => `
    <figure class="block block-image">
      ${image.src ? `<img src="${image.src}" alt="">` : '<div class="image-placeholder">Inspiration image</div>'}
      ${image.caption ? `<figcaption>${image.caption}</figcaption>` : ''}
    </figure>`).join('');

  return `
    <div class="info">
      ${slideHeader(animations[slug])}
      <div class="page">
        <div class="block block-header"><h3>Reasoning</h3></div>
        <div class="row"><div class="block block-text">${paragraphs}</div></div>
        <div class="block block-header"><h3>Inspiration</h3></div>
        <div class="row row-images" style="--columns: ${images.length}">${figures}</div>
      </div>
    </div>`;
}

// The slide before each period's animations: the most important things of that
// period (weekHighlights in content.js) and its animations
function weekSlide({ label, title = label, terms }) {
  const highlights = weekHighlights[title] || [];
  const items = highlights.length
    ? highlights.map((text) => `<li>${text}</li>`).join('')
    : '<li class="placeholder">The most important things of this period go here (content.js).</li>';

  const section = document.createElement('section');
  section.id = periodId(label);
  section.innerHTML = `
    <div class="info">
      ${slideHeader(title)}
      <div class="page">
        <div class="block block-header"><h3>Highlights</h3></div>
        <div class="row"><div class="block block-text"><ul class="highlights">${items}</ul></div></div>
        ${terms.length ? `
        <div class="block block-header"><h3>Animations</h3></div>
        <div class="row"><div class="block row-squares"></div></div>` : ''}
      </div>
    </div>`;
  section.querySelector('.row-squares')?.append(...terms.map((term) => gridCell(term)));
  section.querySelector('.back').addEventListener('click', () => transition(() => Reveal.slide(0)));
  return section;
}

// ---------- Slides: per period a summary, then its animations ----------

const iframes = {};
// The overview thumbnail an animation morphs back into: the one last clicked,
// since a term can appear in more than one period
const thumbs = {};
// Horizontal slide index (after the overview) of every animation and period
const slideIndex = {};
let slideCount = 0;

function addSlide(key, section) {
  slides.append(section);
  slideCount += 1;
  slideIndex[key] = slideCount;
}

function animationSlides(slug) {
  const section = document.createElement('section');
  section.id = slug;
  section.innerHTML = `
    <div class="detail">
      ${slideHeader(animations[slug])}
      <iframe data-src="animations/${slug}.html" allow="fullscreen"></iframe>
    </div>`;

  const info = document.createElement('section');
  info.id = `${slug}-info`;
  info.innerHTML = infoSlide(slug);

  const iframe = section.querySelector('iframe');
  iframes[slug] = iframe;
  section.querySelector('.back').addEventListener('click', () => {
    transition(() => Reveal.slide(0), iframe, thumbs[slug]);
  });
  info.querySelector('.back').addEventListener('click', () => {
    transition(() => Reveal.slide(0), null, thumbs[slug]);
  });

  // Once you click inside an animation it has keyboard focus, so reveal.js
  // stops seeing key presses. Forward the keys a presentation clicker sends.
  // Only works when served over http (e.g. Live Server), not via file://.
  iframe.addEventListener('load', () => {
    try {
      iframe.contentWindow.addEventListener('keydown', (event) => {
        if (event.key === 'PageDown') next();
        if (event.key === 'PageUp') prev();
      });
    } catch {
      // Cross-origin frame, nothing to forward.
    }
  });

  // Vertical stack: the animation, with its explanation below it
  const stack = document.createElement('section');
  stack.append(section, info);
  return stack;
}

// ---------- Overview: a block per period ----------

function gridCell(term, inOverview = false) {
  if (term === null) {
    const empty = document.createElement('div');
    empty.className = 'grid-cell is-empty';
    empty.innerHTML = '<div class="thumb"></div>';
    return empty;
  }

  if (!(term in animations)) {
    const upcoming = document.createElement('div');
    upcoming.className = 'grid-cell is-upcoming';
    upcoming.innerHTML = `<div class="thumb"><span>Coming soon</span></div><span class="label">${term}</span>`;
    return upcoming;
  }

  const slug = term;
  const cell = document.createElement('button');
  cell.className = 'grid-cell';
  cell.innerHTML = `
    <div class="thumb">
      <video src="thumbnails/${slug}.mp4" data-autoplay autoplay muted loop playsinline></video>
    </div>
    <span class="label">${animations[slug]}</span>`;
  const thumb = cell.querySelector('.thumb');
  if (inOverview) thumbs[slug] ??= thumb;
  cell.addEventListener('click', () => {
    if (inOverview) thumbs[slug] = thumb;
    transition(() => Reveal.slide(slideIndex[slug], 0), thumb, iframes[slug]);
  });
  return cell;
}

schedule.forEach((period) => {
  addSlide(periodId(period.label), weekSlide(period));
  period.terms
    .filter((term) => term in animations && !(term in slideIndex))
    .forEach((slug) => addSlide(slug, animationSlides(slug)));
});

// All squares sit in one grid of COLUMNS columns; a period takes one column per
// term and never splits over two rows. The last period of a row stretches to
// the edge, so its lines close the row.
const COLUMNS = 8;
let used = 0;
let lastBlock = null;

function setSpan(block, span) {
  block.style.setProperty('--span', span);
}

schedule.filter((period) => !period.hidden).forEach(({ label, terms }) => {
  if (used + terms.length > COLUMNS) {
    setSpan(lastBlock, Number(lastBlock.style.getPropertyValue('--span')) + COLUMNS - used);

    used = 0;
  }
  const block = document.createElement('div');
  block.className = 'week';
  block.innerHTML = `<button class="week-label">${label}</button><div class="week-terms"></div>`;
  block.querySelector('.week-label').addEventListener('click', () => {
    transition(() => Reveal.slide(slideIndex[periodId(label)], 0));
  });
  block.querySelector('.week-terms').append(...terms.map((term) => gridCell(term, true)));
  setSpan(block, terms.length);
  weeks.append(block);
  used += terms.length;
  lastBlock = block;
});
setSpan(lastBlock, Number(lastBlock.style.getPropertyValue('--span')) + COLUMNS - used);

Reveal.initialize({
  width: 1920,
  height: 1080,
  margin: 0.02,
  center: false,
  hash: true,
  slideNumber: 'c/t',
  // Slide changes are animated with view transitions instead (see transition()).
  transition: 'none',
  keyboard: {
    33: prev, // PageUp
    34: next, // PageDown
    37: left, // ←
    39: right, // →
    32: next, // Space
    38: up, // ↑
    40: down, // ↓
  },
  plugins: [RevealNotes],
});

// reveal.js remembers which vertical slide you last saw in each stack and
// returns there; forget it so arriving at an animation always shows the animation
Reveal.on('slidechanged', () => {
  document.querySelectorAll('[data-previous-indexv]').forEach((stack) => stack.removeAttribute('data-previous-indexv'));
});
