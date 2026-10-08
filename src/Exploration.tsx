import { useState, type CSSProperties } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Check, Plus, Minus, Lightbulb, MapPin, Orbit, Rocket, Waves, Snowflake, Trees, Mountain, ShieldCheck, AlertTriangle, Bot, Satellite, Users, BookOpen, Compass, Microscope, Leaf } from 'lucide-react';
import { regionMenu } from './Hero';
import { regions, regionById, sourceById, timeline, technologies, type RegionId, type Region, type Problem } from './data';
import { landPath, gridPath, spherePath, mapPoints } from './worldMapData';

export const regionIcons = { space: Rocket, ocean: Waves, polar: Snowflake, rainforest: Trees, mountain: Mountain };
export function SourceLinks({ ids, label = 'Sources' }: { ids: string[]; label?: string }) {
  if (!ids.length) return null;
  return <div className="source-links"><BookOpen size={13} aria-hidden="true" /><span>{label}:</span>{ids.map((id, i) => <a key={id} href={sourceById[id].url} target="_blank" rel="noreferrer" title={sourceById[id].title}>{sourceById[id].organization}{i < ids.length - 1 ? ' ·' : ''}</a>)}</div>;
}
export function SectionTitle({ number, label, title, description }: { number: string; label: string; title: string; description?: string }) {
  return <div className="section-title"><div className="eyebrow">{number} / {label}</div><h2 className="section-heading">{title}</h2>{description && <p className="section-intro">{description}</p>}</div>;
}
export function Introduction() {
  return <section className="intro-section page-width section" id="meaning">
    <div><div className="eyebrow">THE QUESTION THAT STARTS EVERYTHING</div><h2 className="section-heading">What lies<br />{' '}<em>over there?</em></h2></div>
    <div className="intro-content"><p className="lead">Exploration begins with curiosity.<br />Science gives it a purpose.</p><p>We investigate places, ask questions, and collect evidence to understand something new. A holiday is mainly for enjoyment; a scientific expedition aims to create and share knowledge.</p><div className="intro-pillars"><span><Compass size={17} /> Ask questions</span><span><Microscope size={17} /> Find evidence</span><span><Leaf size={17} /> Respect nature</span></div><p className="intro-aspects">Our focus: <strong>discoveries, challenges, and responsible solutions</strong> in five different environments.</p></div>
  </section>;
}
function WorldMap({ selected, onSelect }: { selected: RegionId; onSelect: (id: RegionId) => void }) {
  return <div className="world-map">
    <div className="map-topline"><span><Orbit size={15} /> EXPEDITION ATLAS</span><span>SELECT A FRONTIER</span></div>
    <svg viewBox="0 0 860 490" className="map-svg" aria-label="Interactive world map showing example exploration locations">
      <defs><radialGradient id="map-ocean"><stop stopColor="#15263a" /><stop offset="1" stopColor="#0b1420" /></radialGradient></defs>
      <path d={spherePath!} fill="url(#map-ocean)" stroke="#243549" />
      <path d={gridPath!} fill="none" stroke="#31506a" strokeWidth=".5" opacity=".4" />
      <path d={landPath!} fill="#243a4b" stroke="#416073" strokeWidth=".65" />
      {(['ocean','polar','rainforest','mountain'] as const).map(id => {
        const [x,y] = mapPoints[id]; const r = regionById[id];
        const labelX = id === 'ocean' ? -18 : id === 'mountain' ? -22 : 18;
        const labelY = id === 'mountain' ? -24 : id === 'polar' ? -8 : 0;
        return <g key={id} role="button" tabIndex={0} aria-label={`Explore ${r.name}`} aria-pressed={selected === id} className={`map-marker ${selected === id ? 'selected' : ''}`} transform={`translate(${x},${y})`} onClick={() => onSelect(id)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(id); } }} style={{ '--region-color': r.color } as CSSProperties}>
          <circle r="18" className="marker-halo" fill={r.color} opacity={selected===id ? .18 : .05} /><circle r="7" fill={r.color} stroke="#0b1420" strokeWidth="3" />
          <text x={labelX} y={labelY} textAnchor={id==='ocean'||id==='mountain' ? 'end' : 'start'} dominantBaseline="middle" fill="#e4edf5">{r.name}</text>
        </g>;
      })}
    </svg>
    <button className={`space-map-button ${selected==='space' ? 'selected' : ''}`} aria-pressed={selected==='space'} onClick={() => onSelect('space')}><Rocket size={17} /><span>SPACE<span>Moon & Mars · beyond this map</span></span></button>
    <div className="map-bottomline"><span>Markers show example locations, not entire regions.</span><span>Natural Earth</span></div>
  </div>;
}
export function Exploration({ selected, onSelect, onPresent }: { selected: RegionId; onSelect: (id: RegionId) => void; onPresent: (index: number) => void }) {
  const r = regionById[selected]; const Icon = regionIcons[selected];
  const reduced = useReducedMotion();
  return <section className="page-width section exploration-section" id="regions">
    <SectionTitle number="01" label="THE FRONTIERS" title="Five worlds. Endless questions." description="Choose a region on the map. Discover what we gain, what we risk, and how explorers can make better decisions." />
    <div className="region-tabs" aria-label="Exploration regions">{regions.map(region => { const I=regionIcons[region.id]; return <button key={region.id} className={selected === region.id ? 'active' : ''} aria-pressed={selected===region.id} onClick={() => onSelect(region.id)} style={{'--region-color':region.color} as CSSProperties}><I size={17} />{region.name}</button>; })}</div>
    <div className="atlas-layout"><WorldMap selected={selected} onSelect={onSelect} /><div className="atlas-summary" style={{'--region-color':r.color} as CSSProperties}>
      <div className="atlas-summary-image" style={{backgroundImage:`linear-gradient(0deg,#111c29 0%,transparent 100%),url(/assets/${r.id}.webp)`}} aria-hidden="true" />
      <div className="atlas-summary-content" aria-live="polite"><span className="region-symbol"><Icon size={25} /></span><div className="eyebrow">{r.tag}</div><h3>{r.title}</h3><p>{r.subtitle}</p><span className="location"><MapPin size={12} />{r.location}</span><a className="button button-glass" href="#expedition"><ArrowDown size={16} /> Explore this frontier</a></div>
    </div></div>
    <AnimatePresence mode="wait" initial={false}><motion.div key={selected} className={`expedition region-${selected}`} id="expedition" style={{ '--region-color': r.color } as CSSProperties} initial={reduced ? false : {opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:.24}}>
      <div className="expedition-lead"><figure className="expedition-photo"><img src={`/assets/${selected}.webp`} alt={r.imageAlt} loading="lazy" width="1000" height="650" /><Atmosphere region={selected} /><figcaption>{r.caption}</figcaption></figure><div className="expedition-copy"><div className="eyebrow"><Icon size={17} /> FIELD NOTES / 0{regions.findIndex(x=>x.id===selected)+1}</div><h3>{r.title}</h3><p>{r.description}</p><div className="discovery-note"><span>REAL EXPLORATION</span><p>{r.purpose}</p></div><button className="text-button" onClick={() => onPresent(regions.findIndex(x=>x.id===selected)+3)}><BookOpen size={15} /> Present this region</button></div></div>
      <div className="benefit-risk"><ArgumentColumn heading="What we gain" icon="good" items={r.benefits} /><ArgumentColumn heading="What we risk" icon="risk" items={r.risks} /></div>
      <div className="problems-title"><div><span className="small-overline">THE CHALLENGE → THE RESPONSE</span><h4>Every problem needs a plan.</h4></div><p>Select a card to reveal a possible solution.</p></div>
      <div className="problem-grid">{r.problems.map((problem,i)=><ProblemCard problem={problem} index={i} key={`${selected}-${i}`} />)}</div>
      <div className="fact-note"><Lightbulb size={23} /><div><span>ONE THING TO REMEMBER</span><p>{r.fact}</p><SourceLinks ids={[r.factSource]} label="Fact source" /></div></div>
      <SourceLinks ids={r.sourceIds} />
    </motion.div></AnimatePresence>
  </section>;
}
function Atmosphere({ region }: { region: RegionId }) {
  return <div className={`atmosphere atmosphere-${region}`} aria-hidden="true">{Array.from({length:9},(_,i)=><span key={i} style={{left:`${(i*17+9)%96}%`,top:`${(i*23+13)%85}%`,animationDelay:`${-i*1.8}s`,animationDuration:`${12+i%4*3}s`}} />)}</div>;
}
export function ArgumentColumn({ heading, icon, items }: { heading: string; icon: 'good' | 'risk'; items: string[] }) {
  const Icon = icon === 'good' ? Plus : AlertTriangle;
  return <div className={`argument-column ${icon}`}><h4><Icon size={20} />{heading}</h4><ul>{items.map(item=><li key={item}><span className="bullet-dot" />{item}</li>)}</ul></div>;
}
export function ProblemCard({ problem, index }: { problem: Problem; index: number }) {
  const [open,setOpen]=useState(false);
  return <div className={`problem-card ${open ? 'open' : ''}`}><button className="problem-trigger" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls={`problem-${index}-${problem.title.replaceAll(' ','-')}`}><span className="problem-number">0{index+1}</span><span><strong>{problem.title}</strong><span>{problem.detail}</span></span>{open ? <Minus size={18} /> : <Plus size={18} />}</button><div className="problem-answer" id={`problem-${index}-${problem.title.replaceAll(' ','-')}`} hidden={!open}><span><ShieldCheck size={16} /> POSSIBLE SOLUTION</span><p>{problem.solution}</p></div></div>;
}
export function Journey() {
  const [selected,setSelected]=useState(2); const e=timeline[selected]; const r=regionById[e.region]; const Icon=regionIcons[e.region];
  return <section className="journey-wrap" id="journey"><div className="page-width section"><SectionTitle number="02" label="THE JOURNEY" title="Small steps. Remarkable discoveries." description="Exploration is a shared story. Choose a milestone to see how our questions—and our methods—have changed." />
    <div className="timeline-track" aria-label="Exploration timeline">{timeline.map((event,i)=><button key={event.year} onClick={()=>setSelected(i)} aria-pressed={selected===i} aria-label={`${event.year}: ${event.title}`} className={selected===i ? 'active' : ''}><span className="timeline-year">{event.year}</span><span className="timeline-dot" /><span className="timeline-event">{event.title}</span></button>)}</div>
    <div className="timeline-detail" style={{'--region-color':r.color} as CSSProperties} aria-live="polite"><div className="timeline-visual"><img src={`/assets/${e.region}.webp`} alt={r.imageAlt} loading="lazy" width="1000" height="650" /><span className="timeline-big-year">{e.year}</span><span className="timeline-photo-credit">Related photo: {r.caption}</span></div><div className="timeline-copy"><span className="small-overline"><Icon size={16} /> {e.date}</span><h3>{e.title}</h3><p>{e.description}</p><SourceLinks ids={[e.source]} /></div></div>
    <p className="timeline-context">A note on history: “first confirmed” describes a documented achievement. Exploration also depends on the knowledge and work of local people, guides, and entire teams.</p>
  </div></section>;
}
const comparison = [
  {id:'space' as RegionId, levels:['High','High','Varies'], benefit:'Knowledge of other worlds', risk:'High costs and radiation', solution:'Start with robotic research; test protective systems.'},
  {id:'ocean' as RegionId, levels:['High','High','High'], benefit:'Species and climate research', risk:'Pressure and habitat damage', solution:'Use remote vehicles and careful observation.'},
  {id:'polar' as RegionId, levels:['High','High','High'], benefit:'Climate records and cooperation', risk:'Isolation and fragile habitats', solution:'Share logistics, plan rescue, and remove waste.'},
  {id:'rainforest' as RegionId, levels:['Moderate','Varies','High'], benefit:'Biodiversity and plant research', risk:'Disease and ecosystem disruption', solution:'Work with local communities and limit sampling.'},
  {id:'mountain' as RegionId, levels:['Varies','High','High'], benefit:'Glacier research and better maps', risk:'Altitude, avalanches, and waste', solution:'Plan gradual ascent, rescue, and waste removal.'},
];
export function Comparison() {
  const [lens,setLens]=useState(-1); const [chosen,setChosen]=useState<RegionId>('ocean'); const selected=comparison.find(c=>c.id===chosen)!;
  return <section className="page-width section" id="compare"><SectionTitle number="03" label="THE BIGGER PICTURE" title="Discovery comes with responsibility." description="There is no risk-free frontier. Compare the challenges, then decide what would make an expedition worthwhile." />
    <div className="comparison-toolbar"><div className="segmented" aria-label="Comparison view">{['All challenges','Cost','Safety','Environment'].map((label,i)=><button key={label} className={lens===i-1 ? 'active' : ''} aria-pressed={lens===i-1} onClick={()=>setLens(i-1)}>{label}</button>)}</div><span>OUR CLASSROOM COMPARISON</span></div>
    <div className="comparison-grid" role="table" aria-label="Qualitative comparison of exploration challenges"><div className="comparison-row comparison-head" role="row" style={{'--columns':lens===-1 ? 3 : 1} as CSSProperties}><span role="columnheader">Frontier</span>{['Cost','Physical danger','Environmental sensitivity'].map((label,i)=>(lens===-1||lens===i)&&<span role="columnheader" key={label}>{label}</span>)}</div>{comparison.map(c=>{const r=regionById[c.id];const Icon=regionIcons[c.id];return <div key={c.id} role="row" className={`comparison-row ${chosen===c.id?'chosen':''}`} style={{'--columns':lens===-1 ? 3 : 1} as CSSProperties}><div role="cell"><button onClick={()=>setChosen(c.id)} aria-pressed={chosen===c.id}><Icon size={19} style={{color:r.color}} />{r.name}</button></div>{c.levels.map((level,i)=>(lens===-1||lens===i)&&<div role="cell" key={i}><span className={`level level-${level.toLowerCase()}`}><span className="level-bars" aria-hidden="true"><i /><i /><i /></span>{level}</span></div>)}</div>;})}</div>
    <p className="chart-caption">These are discussion ratings, not scientific measurements. Cost and danger depend on the location, method, and mission. Select a frontier for a balanced view.</p>
    <div className="comparison-insight" aria-live="polite"><div><span>THE BENEFIT</span><h3>{selected.benefit}</h3></div><div><span>THE RISK</span><h3>{selected.risk}</h3></div><div><span>OUR RESPONSE</span><p>{selected.solution}</p></div></div>
    <SourceLinks ids={['radiation','ocean-tech','polar-care','altitude']} />
  </section>;
}
export function Solutions() {
  const icons={robot:Bot,satellite:Satellite,shield:ShieldCheck,people:Users};
  return <section className="solutions-wrap"><div className="page-width section"><SectionTitle number="04" label="BETTER WAYS FORWARD" title="Explore smarter. Tread lighter." description="Extreme conditions, limited supplies, distance from help, and poor communication are common challenges. Good technology works best with good judgment." />
    <div className="technology-grid">{technologies.map(t=>{const Icon=icons[t.icon as keyof typeof icons];return <article key={t.name}><Icon size={29} /><span>{t.example}</span><h3>{t.name}</h3><p>{t.text}</p><SourceLinks ids={t.sources} /></article>;})}</div>
    <div className="environment-panel"><span className="environment-icon"><Leaf size={36} /></span><div><span className="small-overline">LEAVE KNOWLEDGE, NOT DAMAGE</span><h3>A discovery should help us protect a place.</h3><p>Research can guide conservation. It can also create waste, emissions, and disturbance. Use the least harmful method that answers the question, respect local rights, and carry waste out.</p></div><div className="environment-checks"><span><Check size={16} /> Plan the impact</span><span><Check size={16} /> Respect people & wildlife</span><span><Check size={16} /> Share the findings</span></div></div>
    <SourceLinks ids={['polar-care','plant-research']} />
  </div></section>;
}
