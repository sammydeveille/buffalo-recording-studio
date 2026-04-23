/* ══════════════════════════════════════════════════════════
   Site content — edit here, not in main.js.
   All arrays are consumed by main.js at runtime.
══════════════════════════════════════════════════════════ */

const catMap = {
  control: { key: 'control', label: 'Control Room' },
  live:    { key: 'live',    label: 'Live Room' },
  gear:    { key: 'gear',    label: 'Gear' },
  instru:  { key: 'instru',  label: 'Instruments' },
};

const equipData = [
  { cat: 'Console', items: ['48 channels SSL 4000G+ series mixing desk','SSL 4000G+ bus compressor','THD Labs Tangerine Automation Interface'] },
  { cat: 'Conversion', items: ['4x Prism Sound ADA-8XR'] },
  { cat: 'Monitoring', items: ['ATC SCM25A speakers','Yamaha NS10','Heddphone®','Hear Technologies Hearback system x8'] },
  { cat: 'Software', items: ['ProTools Ultimate 2023','Plugins: Waves, Softube, Soundtoys, Brainworx, Oeksound, Magic Death Eye, Shadow Hills, Vertigo, Arturia, etc...'] },
  { cat: 'External Preamps', items: ['Universal Audio 610 x2','Neve 1081 x2','Neve 33115 x2','Telefunken v672 x4','Neve Portico 5012 dual preamp','Altec 1566A valve preamp','Shure M67 4 channel mixer/preamp'] },
  { cat: 'Compressors', items: ['Urei 1176 Black Original','DBX 162 stereo','DBX 160 x3','API 2500','ADR Compex F760X RS','Empirical Labs Distressor','Empirical Labs Fatso Jr EL7','Hermit Circuits Level-Loc stereo'] },
  { cat: 'Equalizers', items: ['Pultec EQH-2','Pultec MEQ-5','Summit Audio EQF-100 x2','Urei 545 x2','Neve 1081 x2','Neve 33115 x2'] },
  { cat: 'Effects', items: ['Echofix EFX3R','Urei Cooper Time Cube','Evan Super Echo SE810 tape delay','Hawk Echo Unit HR40 spring echo','Pioneer SR101 valve spring reverb','Bell BD80','Yamaha SPX2000','Bricasti M7','TC Electronic M5000'] },
  { cat: 'Condensers', items: ['Neumann U87 P48 (1971)','Neumann U87 Vintage Purple Badge x2','Neumann U87 Black Vintage','Neumann KM184 x2','Neumann KM100','Sony C38-B x2','Calrec CM652 x2','Calrec CM1000 x2','Audio Technica AT5047','Bruel and Kjaar 4011','AKG C414 x4','AKG C451E x3','AKG SE300 B x2','Scope Labs Periscope x2','Sontronics DM1B','Sound Deluxe IFet 7','JZ Vintage 67','Earthworks PM40 piano bar','Audix ADX51 x2','Soundfield SPS422 stereo mic'] },
  { cat: 'Ribbons', items: ['Coles 4038 x2','AEA R84 x2','Extinct Audio BM9 custom x2','Royer R-122 x2','Reslo RB BBC specs x2','Beyerdynamic M160 x2','Beyerdynamic M260','SE Tube Ribbon','Sontronics Sigma x2','Sontronics Delta'] },
  { cat: 'Dynamics / Others', items: ['Shure 545SD Unidyne III','Shure SM57 x2','Shure SM58','Shure SM7B','Sennheiser MD421 x4','Beyerdynamic M88','Beyerdynamic M101','Beyerdynamic M201','AKG D12 x2','AKG D190','AKG D130','ElectroVoice RE20','Audix D6','Reslo UD1','Mélodium 75A','Wasaphone MMXIV','Oddball lofi microphones'] },
  { cat: 'Drums', items: ['Premier 202 Transition kit (1969)','Premier PD101 Resonator snare','Rogers Dynasonic snare (1971)','Ludwig Acrolite snare (1967)','Junk Snare 70s boomer','Pearl Export drumkit','Gretsch Blackbird bass drum','Selection of vintage cymbals','Selection of percussions'] },
  { cat: 'Amps & Guitars', items: ['Selection of electric & acoustic guitars','Selection of pedals','Fender Bassman w/ 4x10" cab','Fender Super Sonic 22','WEM Dominator Mk III (1960s)','Fender Hot Rod Deville 4x10"','Zilla cab 2x12" Creamback','Marshall JCM2000 w/ 4x10" cab','Vox AC4TV','Ampeg B-100 (1970s)','Acoustic Control Corp 125 combo'] },
  { cat: 'Pianos & Keys', items: ['Yamaha C7 conservatory grand','Rogers of London 1920\'s upright','Hammond C3 organ & cabinet','Hammond L122 organ','716 Leslie + preamp','Fender Rhodes suitcase','Mellotron MKV1','Hohner Clavinet Pianet Duo','Roland RS202 string machine','Roland Juno 6 synthesizer','Yamaha DX7 synthesizer','Marimba / Sitar / Oddities'] },
];

const galFiles = [
  'DSC_0039_control.jpg','DSC_0041_control.jpg','DSC_0065_instru.jpg',
  'DSC_0066_gear.jpg',   'DSC_0067_gear.jpg',   'DSC_0072_control.jpg',
  'DSC_0080_gear.jpg',   'DSC_0083_gear.jpg',   'DSC_0085_gear.jpg',
  'DSC_0088_gear.jpg',   'DSC_0096_control.jpg','DSC_0099_gear.jpg',
  'DSC_0103_live.jpg',   'DSC_0105_live.jpg',   'DSC_0106_instru.jpg',
  'DSC_0109_instru.jpg'
];

const heroImages = [
  'assets/DSC_0039_control.jpg','assets/DSC_0041_control.jpg','assets/DSC_0065_instru.jpg',
  'assets/DSC_0066_gear.jpg',   'assets/DSC_0067_gear.jpg',   'assets/DSC_0072_control.jpg',
  'assets/DSC_0080_gear.jpg',   'assets/DSC_0083_gear.jpg',   'assets/DSC_0085_gear.jpg',
  'assets/DSC_0088_gear.jpg',   'assets/DSC_0096_control.jpg','assets/DSC_0099_gear.jpg',
  'assets/DSC_0103_live.jpg',   'assets/DSC_0105_live.jpg',   'assets/DSC_0106_instru.jpg',
  'assets/DSC_0109_instru.jpg'
];

const menuLinks = [
  { label: "Studio",       href: "#studio" },
  { label: "Gallery",      href: "#gallery" },
  { label: "Equipment",    href: "#equipment" },
  { label: "JB Pilon",     href: "#jb-pilon" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Clients",      href: "#clients" },
  { label: "Contact",      href: "#contact-popup", action: "contact" },
];

const testimonials = [
  { quote: "The ideal place for recording vintage, beefy, old school sounds. JB is a mad professor.", author: "Robohands" },
  { quote: "JB is a mastermind… helping with structure, sound and harmonies. Our creative home.", author: "JW Paris" },
  { quote: "Two days with JB and we got the best recording we have ever been a part of.", author: "The Kecks" },
  { quote: "JB is a fine engineer who makes you feel relaxed and gets the best results out of you.", author: "Elephant Tree" },
  { quote: "Such a cool creative space—always feel relaxed here.", author: "Hatty Keane" },
  { quote: "Amazing studio with great gear, mics and atmosphere.", author: "Sunglasses for Jaws" },
  { quote: "JB has been there since day one—full of wild ideas that help turn our songs into a finished album.", author: "Bright Curse" }
];
