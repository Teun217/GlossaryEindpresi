// Weekly summaries and lessons shown before each period's animations.
// The names must match the labels in the schedule in script.js.
// Each week has separate summary and lessons lists.
const weekHighlights = {
  'Before the internship': [],
  'Week 2': {
    summary: [
      'We verdeelden vier begrippen: Teun werkte aan Intra-action en Liminal Space, Lynn aan Interaction en Latent Space. Per begrip deden we deskresearch, verzamelden we visuele inspiratie, onderzochten we de relatie met de hybride stad, schreven we user stories en maakten we eerste CodePen-experimenten.',
      'In feedbackmomenten bespraken we typografie, grafische elementen en interactie. Voor Latent Space ontstond het idee om verborgen datapatronen zichtbaar te maken. Met Niels stelden we ook ontwerpparameters en randvoorwaarden vast, zoals speelruimte rond positie en tijd en regels voor oneindige animaties en een zwart-wit-grijspalet.',
    ],
    lessons: [
      'Abstracte begrippen vragen om verschillende visuele invalshoeken en experimenten.',
      'De context van de hybride stad moet duidelijk terugkomen in onze ontwerpkeuzes.',
      'Typografie kan niet alleen tekst communiceren, maar ook onderdeel zijn van de interactie.',
      'Vaste parameters en randvoorwaarden zorgen voor meer samenhang tussen animaties.',
    ],
  },
  'Week 3': {
    summary: [
      'We bespraken de eerste prototypes met Marjolijn en Niels. Sommige experimenten ontwikkelden we verder; andere lieten we los of koppelden we aan een ander begrip. We onderzochten ook Intraface, Interface, Ecology en Cybernetics, dachten na over de beeldverhouding van animaties op de website en scherpten gezamenlijke ontwerpparameters aan.',
    ],
    lessons: [
      'Feedback kan een experiment beter bij een ander begrip laten passen.',
      'Verschillende begrippen vragen om verschillende vormen van interactie.',
      'Experimenteren met perspectief, beweging en grafische effecten helpt abstracte begrippen begrijpelijker te maken.',
    ],
  },
  'Week 5': {
    summary: [
      'Omdat de planning minder soepel verliep en we soms het overzicht verloren, boekten we in week 4 minder voortgang. In week 5 ruimden we eerder werk op en rondden we het af. Liminal Space en Intraface kwamen op de website.',
      'We maakten een nieuwe weekplanning van woensdag tot dinsdag. Daardoor werkten we gestructureerder samen en konden we feedback op gunstigere momenten verwerken.',
    ],
    lessons: [
      'Een te hoog tempo en te veel begrippen kunnen ten koste gaan van overzicht en kwaliteit.',
      'Een duidelijke planning en vaste ontwerpcyclus helpen structuur en focus te behouden.',
      'Te snel naar CodePen-prototypes gaan kan de gezamenlijke conceptualisatiefase overslaan.',
      'Ontwerpkeuzes, tussenstappen en ideeën moeten goed worden vastgelegd en gedeeld.',
      'Soms is het nodig een stap terug te doen, op te ruimen en opnieuw richting te bepalen.',
    ],
  },
  'Week 6': {
    summary: [
      'We begonnen met de nieuwe weekplanning en kozen vier verwante begrippen: Control, Remote Control, Out of Control en Beyond Control. Zo konden we de inhoudelijke verschillen scherper zichtbaar maken. We volgden de ontwerpcyclus van research en inspiratie tot user stories en CodePen-experimenten; deze werkwijze gaf meer structuur, overzicht en productiviteit.',
      'We rondden eerdere animaties af en zetten ze online. Ook maakten we het subdomein klaar voor publicatie.',
    ],
    lessons: [
      'Verwante begrippen naast elkaar onderzoeken helpt inhoudelijke verschillen scherper te krijgen.',
      'De nieuwe weekplanning zorgt voor meer structuur en een prettigere workflow.',
      'Een duidelijke ontwerpcyclus maakt gefocust en productief werken makkelijker.',
      'Interactie hoeft niet altijd volledige controle te geven; juist het loslaten daarvan kan betekenisvol zijn.',
      'Een idle state kan gebruikers uitnodigen om zelf interactie aan te gaan.',
    ],
  },
  'Week 7': {
    summary: [
      'We deden de laatste aanpassingen aan de controle-begrippen en verzamelden afgeronde animaties en CodePen-experimenten in Excel. Daarna startten we een ontwerpcyclus voor Neutrum, Silence en Noise: we verzamelden onderzoek en inspiratie, bespraken ideeën en maakten eerste CodePen-experimenten.',
      'Voor Neutrum ontstond het idee van water dat steeds een neutrale positie zoekt maar in beweging blijft. Bij Silence en Noise onderzochten we afwezigheid, stilte, willekeur en patronen. Marjolijn zag groei in de creativiteit achter de animaties.',
    ],
    lessons: [
      'Onderzoek en inspiratie helpen om gerichter ideeën te ontwikkelen.',
      'Verschillende invalshoeken samen bespreken helpt concepten aan te scherpen.',
      'Ook de afwezigheid van iets kan een belangrijke rol spelen in de betekenis van een begrip.',
      'Abstracte begrippen moeten vanuit verschillende perspectieven worden onderzocht voordat we een richting kiezen.',
      'Feedback op het werkproces geeft inzicht in persoonlijke ontwikkeling en sterke punten.',
      'Bij het publiceren van animaties moeten we rekening houden met mobiele apparaten.',
    ],
  },
  'Week 8': {
    summary: [
      'We werkten verder aan bestaande animaties en begonnen met Recursivity, Proximity, Friction en Affect. We onderzochten een mogelijke koppeling tussen Neutrum en In-between en combineerden afzonderlijke ideeën voor Noise en Silence tot nieuwe richtingen. Voor de nieuwe begrippen maakten we onderzoek, verzamelden we inspiratie en begonnen we CodePen-experimenten.',
      'In feedback bekeken we ook bestaande animaties en de website. Voor Silence bespraken we zachtere bewegingen; daarnaast kwamen grijstinten, mogelijk geluid bij Control, mobiele aanpassingen voor Ecology en Invisible, tekst bij Interface en een begrippenboekje aan bod. CodePen lag dinsdag en woensdag eruit, waardoor we niet aan prototypes konden werken.',
    ],
    lessons: [
      'Ideeën samenvoegen kan tot sterkere en meer samenhangende concepten leiden.',
      'Bij Recursivity moet herhaling daadwerkelijk invloed hebben op wat erop volgt.',
      'Bij Proximity kunnen zowel fysieke als relationele nabijheid een rol spelen.',
      'Tekst, beeld, beweging en geluid kunnen samen de betekenis van een begrip overbrengen.',
      'Kleine aanpassingen aan animatiesnelheid of kleur kunnen de ervaring sterk beïnvloeden.',
      'Ontwerpen moeten zowel op desktop als mobiel worden gecontroleerd.',
      'Technische afhankelijkheden zoals CodePen kunnen planning en voortgang beïnvloeden.',
    ],
  },
  'Week 9': {
    summary: [
      'We richtten ons op het afronden en online zetten van bestaande animaties en maakten een statusoverzicht van alle begrippen: ideeën nodig, final nodig, mobiele- en performancecheck nodig, nog voorleggen aan Marjolijn of al online.',
      'Het overzicht hielp prioriteiten te bepalen. We bespraken laatste ontwerpaanpassingen, zoals grijstinten en de relatie tussen object en tekst, en spraken af om zoveel mogelijk animaties vrijdag online te zetten voor feedback van Marjolijn. Ook bespraken we de declaratie, het eindgesprek en de beoordelingsformulieren.',
    ],
    lessons: [
      'Een statusoverzicht per begrip helpt prioriteiten te stellen en voortgang te bewaken.',
      'Bij het afronden moeten naast het ontwerp ook mobiele werking en performance worden gecontroleerd.',
      'Animaties tussentijds online zetten helpt om eerder feedback te verzamelen en te verwerken.',
      'Opmerkingen en openstaande punten vastleggen in Excel maakt samenwerking en communicatie overzichtelijker.',
      'Reserveer in de afrondende fase voldoende tijd voor technische controles, feedback en documentatie.',
    ],
  },
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
    inspiration: [],
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
    inspiration: [],
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
    inspiration: [],
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
    inspiration: [],
  },
  'noise': {
    reasoning: [],
    inspiration: [],
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
    inspiration: [],
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
