import { motion, useReducedMotion } from 'framer-motion';
import { assetUrl } from './assets';
import { Orbit, Play, Rocket, Waves, Snowflake, Trees, Mountain, Compass, Mouse } from 'lucide-react';

export const regionMenu = [
  { id: 'space', title: 'Space', label: 'Beyond our planet', icon: Rocket, color: '#b5a0ff' },
  { id: 'ocean', title: 'Deep ocean', label: 'Beneath the surface', icon: Waves, color: '#71d9fb' },
  { id: 'polar', title: 'Polar regions', label: 'At the ends of Earth', icon: Snowflake, color: '#c4e9ff' },
  { id: 'rainforest', title: 'Rainforests', label: 'Into the living world', icon: Trees, color: '#93ddad' },
  { id: 'mountain', title: 'Mountains', label: 'Above the clouds', icon: Mountain, color: '#efbd9a' },
];

export function Brand() {
  return <a className="brand" href="#home" aria-label="Beyond the Horizon home"><Orbit aria-hidden="true" /><span>BEYOND THE<br /><b>HORIZON</b></span></a>;
}

export default function Hero({ onPresent, onRegion }: { onPresent: () => void; onRegion: (id: string) => void }) {
  const reduced = useReducedMotion();
  return <section className="hero" id="home">
    <div className="hero-photo" aria-hidden="true" />
    <div className="hero-grain" aria-hidden="true" />
    <header className="site-header">
      <Brand />
      <nav aria-label="Main navigation">
        <a href="#regions">Explore</a><a href="#journey">The journey</a><a href="#compare">The bigger picture</a><a href="#classroom">Classroom</a>
      </nav>
      <button className="header-present" onClick={onPresent}><Play size={15} fill="currentColor" /> <span>Presentation mode</span></button>
    </header>
    <div className="hero-body page-width">
      <motion.div className="hero-copy" initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .15 }}>
        <div className="eyebrow"><span className="tiny-line" /> A JOURNEY OF DISCOVERY</div>
        <h1>BEYOND THE<br /><span>HORIZON.</span></h1>
        <div className="hero-subtitle">Exploring the unknown.</div>
        <p>From distant planets to the depths of our oceans.<br className="desktop-break" /> Five frontiers. Extraordinary discoveries. One shared future.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#regions"><Compass size={18} /> Begin exploring</a>
          <button className="button button-glass" onClick={onPresent}><Play size={16} fill="currentColor" /> Start presentation</button>
        </div>
        <div className="hero-meta"><span>GRADE 10 ENGLISH</span><i /><span>15 SLIDES</span><i /><span>5 FRONTIERS</span></div>
      </motion.div>
      <motion.div className="hero-coordinate" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: .7 }}><span>OUR HOME. OUR STARTING POINT.</span><div>EARTH <span>↗</span></div><p>So much left to discover.</p></motion.div>
    </div>
    <div className="frontier-menu page-width" aria-label="Choose an exploration region">
      {regionMenu.map((r, i) => <button key={r.id} className={`frontier-card frontier-${r.id}`} onClick={() => onRegion(r.id)} style={{ '--region-color': r.color } as React.CSSProperties}>
        <div className="frontier-card-photo" style={{ backgroundImage: `url(${assetUrl(`assets/mobile/${r.id}.webp`)})` }} aria-hidden="true" />
        <div className="frontier-top"><r.icon size={23} aria-hidden="true" /><span>0{i + 1}</span></div>
        <h2>{r.title}</h2><p>{r.label}</p>
      </button>)}
    </div>
    <div className="hero-bottom page-width"><span><Mouse size={14} /> SCROLL TO DISCOVER</span><a href="#sources">Curiosity, backed by science.</a></div>
  </section>;
}
