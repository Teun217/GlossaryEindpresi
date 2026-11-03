// The most important things per period, shown on the slide before that
// period's animations. One line per point, e.g.
//   'Week 2': ['Started on the interaction terms', 'First user test'],
// The names must match the labels in the schedule in script.js (or their
// `title`, when a period has one, like 'Week 4 en 5').
const weekHighlights = {
  'Voor de stage': [
    'Voor de eindopdracht van de minor Web Design & Development zijn we aan de slag gegaan met de opdracht van Marjolijn. Hoewel we het tijdens deze opdracht leuk hebben gehad en natuurlijk veel hebben geleerd, onder andere over samenwerken in een team, verschoof de aandacht van het maken van webanimaties naar het opzetten van de website eromheen. De animaties waren dus niet meer het hoofdonderwerp van de opdracht. Daarom waren we erg blij dat we de stage aangeboden kregen, zodat we alsnog met de animaties aan de slag konden.',
  ],
  'Week 1': [],
  'Week 2': [],
  'Week 3': [],
  'Week 4 en 5': [],
  'Week 6': [],
  'Week 7': [],
  'Week 8': [],
  'Week 9': [],
};

// Text for the slide under each animation (press ↓ on an animation slide).
//
// reasoning:   paragraphs explaining the choices behind the animation, e.g.
//              reasoning: ['First paragraph.', 'Second paragraph.'],
// inspiration: images in the inspiration/ folder with an optional caption, e.g.
//              inspiration: [
//                { src: 'inspiration/adaptation-1.jpg', caption: 'Detour, Zoro Feigl (2012)' },
//              ],
//
// Empty lists show a placeholder on the slide.
const content = {
  'trigger': {
    reasoning: [],
    inspiration: [],
  },
  'subject': {
    reasoning: [],
    inspiration: [],
  },
  'interaction': {
    reasoning: [],
    inspiration: [],
  },
  'in-between': {
    reasoning: [],
    inspiration: [],
  },
  'cybernetics': {
    reasoning: [],
    inspiration: [
      { src: 'inspiration/cybernetics-1.png', caption: 'RoboCop' },
      { src: 'inspiration/cybernetics-2.png', caption: 'Sketches' },
      { src: 'inspiration/cybernetics-3.png', caption: '' },
    ],
  },
  'adaptation': {
    reasoning: [],
    inspiration: [],
  },
  'affect': {
    reasoning: [],
    inspiration: [],
  },
  'balancing-feedback': {
    reasoning: [],
    inspiration: [],
  },
  'beyond-control': {
    reasoning: [],
    inspiration: [
      { src: 'inspiration/beyond-control-1.png', caption: 'Starling murmuration' },
      { src: 'inspiration/beyond-control-2.png', caption: 'Sketches' },
      { src: 'inspiration/beyond-control-3.png', caption: 'Interacting galaxies' },
    ],
  },
  'control': {
    reasoning: [],
    inspiration: [],
  },
  'ecology': {
    reasoning: [],
    inspiration: [],
  },
  'friction': {
    reasoning: [],
    inspiration: [
      { src: 'inspiration/friction-1.png', caption: 'Sanding wood' },
      { src: 'inspiration/friction-2.png', caption: 'Worn stone steps' },
      { src: 'inspiration/friction-3.png', caption: 'Air hockey table' },
    ],
  },
  'interface': {
    reasoning: [],
    inspiration: [],
  },
  'intra-action': {
    reasoning: [],
    inspiration: [],
  },
  'intraface': {
    reasoning: [],
    inspiration: [],
  },
  'invisible': {
    reasoning: [],
    inspiration: [],
  },
  'latent-space': {
    reasoning: [],
    inspiration: [],
  },
  'liminal-space': {
    reasoning: [],
    inspiration: [
      { src: 'inspiration/liminal-space-1.png', caption: 'Sketches' },
      { src: 'inspiration/liminal-space-2.png', caption: '' },
      { src: 'inspiration/liminal-space-3.png', caption: 'Uncle Roy All Around You, Blast Theory (2003)' },
    ],
  },
  'lines-of-flight': {
    reasoning: [],
    inspiration: [],
  },
  'neutrum': {
    reasoning: [],
    inspiration: [
      { src: 'inspiration/neutrum-1.png', caption: 'Ripples in water' },
      { src: 'inspiration/neutrum-2.png', caption: '' },
      { src: 'inspiration/neutrum-3.png', caption: '' },
    ],
  },
  'noise': {
    reasoning: [],
    inspiration: [
      { src: 'inspiration/noise-1.png', caption: 'TV static' },
      { src: 'inspiration/noise-2.png', caption: '' },
      { src: 'inspiration/noise-3.png', caption: 'Motus, Branta Games' },
    ],
  },
  'object': {
    reasoning: [],
    inspiration: [],
  },
  'out-of-control': {
    reasoning: [],
    inspiration: [],
  },
  'proximity': {
    reasoning: [],
    inspiration: [],
  },
  'recursivity': {
    reasoning: [],
    inspiration: [],
  },
  'reinforcing-feedback': {
    reasoning: [],
    inspiration: [],
  },
  'remote-control': {
    reasoning: [],
    inspiration: [
      { src: 'inspiration/remote-control-1.png', caption: 'Sketches' },
      { src: 'inspiration/remote-control-2.png', caption: '' },
    ],
  },
  'silence': {
    reasoning: [],
    inspiration: [],
  },
  'system': {
    reasoning: [],
    inspiration: [],
  },
};
