export type RegionId = 'space' | 'ocean' | 'polar' | 'rainforest' | 'mountain';
export type Source = { id: string; organization: string; title: string; url: string; supports: string };
export const sources: Source[] = [
  { id: 'apollo', organization: 'NASA', title: 'Apollo 11', url: 'https://www.nasa.gov/mission/apollo-11/', supports: 'The 1969 Moon landing, crew, and lunar research.' },
  { id: 'mars', organization: 'NASA Science', title: 'Perseverance exploring the front of the delta', url: 'https://science.nasa.gov/resource/perseverance-exploring-the-front-of-the-delta/', supports: 'The 2021 landing and evidence of an ancient river and lake at Jezero.' },
  { id: 'radiation', organization: 'NASA', title: 'Space radiation and human exploration', url: 'https://www.nasa.gov/humans-in-space/space-radiation-wont-stop-nasas-human-exploration/', supports: 'Radiation hazards and protective technology; shielding has limits.' },
  { id: 'moon', organization: 'NASA Science', title: 'Moon facts', url: 'https://science.nasa.gov/moon/facts/', supports: 'The Moon’s very thin atmosphere, called an exosphere.' },
  { id: 'vents', organization: 'NOAA', title: 'What is a hydrothermal vent?', url: 'https://oceanservice.noaa.gov/facts/vents.html/volcanoes.html', supports: 'The discovery of vent ecosystems in 1977 and life supported by chemical energy.' },
  { id: 'ocean-tech', organization: 'NOAA Ocean Exploration', title: 'How robots uncover the mysteries of the deep', url: 'https://oceanexplorer.noaa.gov/explainers/technology/', supports: 'ROVs, pressure-resistant housings, deep-ocean darkness, and communication.' },
  { id: 'ocean-climate', organization: 'NOAA', title: 'Journey to Earth’s largest habitat', url: 'https://www.noaa.gov/stories/story-map-explore', supports: 'Ocean exploration and understanding the climate.' },
  { id: 'ice', organization: 'British Antarctic Survey', title: 'Ice cores and climate change', url: 'https://legacy.bas.ac.uk/bas_research/science_briefings/icecorebriefing.php', supports: 'Ancient air bubbles in ice and records of past climate.' },
  { id: 'polar-care', organization: 'British Antarctic Survey', title: 'Environmental protection', url: 'https://www.bas.ac.uk/about/where-we-work/environmental-protection/', supports: 'Environmental planning, protection of wildlife, and the Antarctic Treaty System.' },
  { id: 'amundsen', organization: 'Norwegian Polar Institute', title: 'The South Pole expedition', url: 'https://nettarkiv.npolar.no/sorpolen2011.npolar.no/en/diary/south-pole/2011-10-19-the-day-we-should-have-set-off.html', supports: 'Amundsen’s team reached the South Pole on 14 December 1911.' },
  { id: 'biodiversity', organization: 'Smithsonian Tropical Research Institute', title: 'Biodiversity', url: 'https://stri.si.edu/discipline/biodiversity', supports: 'Species discovery and the scientific study of tropical biodiversity.' },
  { id: 'forest-census', organization: 'Smithsonian ForestGEO', title: 'Climate and 35 years of forest observations', url: 'https://forestgeo.si.edu/demographic-trends-and-climate-over-35-years-barro-colorado-50-ha-plot', supports: 'The 1982 tree census and long-term research at Barro Colorado Island, Panama.' },
  { id: 'plant-research', organization: 'Royal Botanic Gardens, Kew', title: 'Into the wild: plant drug discovery', url: 'https://www.kew.org/read-and-watch/plant-medicine-drug-discovery', supports: 'Plant research, traditional knowledge, and fieldwork in remote forests.' },
  { id: 'everest', organization: 'Royal Geographical Society', title: 'Everest 1953', url: 'https://www.rgs.org/our-collections/buy-and-license-images/platinum-prints/everest-1953', supports: 'The first confirmed Everest summit by Tenzing Norgay and Edmund Hillary.' },
  { id: 'altitude', organization: 'US National Park Service', title: 'Mountaineering medical issues', url: 'https://www.nps.gov/dena/planyourvisit/part2medicalissues.htm', supports: 'Altitude illness, gradual ascent, cold injuries, and the importance of descent.' },
];
export const sourceById = Object.fromEntries(sources.map(s => [s.id, s])) as Record<string, Source>;

export interface Problem { title: string; detail: string; solution: string; }
export interface Region {
  id: RegionId; name: string; title: string; subtitle: string; location: string;
  tag: string; description: string; imageAlt: string; caption: string; color: string;
  benefits: string[]; risks: string[]; problems: Problem[];
  fact: string; factSource: string; sourceIds: string[]; purpose: string;
}
export const regions: Region[] = [
  {
    id: 'space', name: 'Space', title: 'Beyond our planet.', subtitle: 'The Moon, Mars, and the questions between them.', location: 'THE MOON & MARS', tag: 'THE COSMIC FRONTIER', color: '#b5a0ff',
    description: 'Space explorers use spacecraft, telescopes, and robotic rovers to study other worlds. Moon rocks and Mars landscapes help us understand how planets developed.',
    imageAlt: 'Apollo 17 astronaut driving a lunar rover across the Moon', caption: 'Apollo 17 lunar rover · NASA, 1972',
    benefits: ['Discover how planets and the universe developed.', 'Develop better robots, sensors, and other technology.', 'Look for conditions that could support life.'],
    risks: ['Missions need enormous budgets and years of work.', 'Radiation can harm astronauts beyond Earth’s protection.', 'Launches, landings, and equipment failures can be deadly.'],
    problems: [
      { title: 'Radiation exposure', detail: 'Space has less protection than Earth from harmful radiation.', solution: 'Use radiation monitors, storm shelters, and tested shielding. These reduce exposure but cannot remove every risk.' },
      { title: 'Distance and delays', detail: 'A message to Mars takes time, so instant help is impossible.', solution: 'Send robotic scouts, build systems that can work on their own, and train crews to solve emergencies.' },
      { title: 'Cost and mission failure', detail: 'One broken part can end an expensive mission.', solution: 'Test equipment carefully, include backup systems, and share research and costs between countries.' },
    ],
    fact: 'The Moon has an extremely thin atmosphere called an exosphere. It cannot provide air for astronauts to breathe.', factSource: 'moon', sourceIds: ['apollo','mars','radiation','moon'],
    purpose: 'Apollo 11 landed on the Moon in 1969. Perseverance landed on Mars in 2021 to study rocks and search for signs of ancient life. A possible sign is not proof of life.'
  },
  {
    id: 'ocean', name: 'Deep ocean', title: 'Beneath the surface.', subtitle: 'An extraordinary world, hidden in the dark.', location: 'THE DEEP OCEAN · MARIANA TRENCH', tag: 'THE BLUE FRONTIER', color: '#71d9fb',
    description: 'Scientists explore deep water and the seafloor to map habitats, identify species, and understand ocean processes. Many places still lack detailed observations.',
    imageAlt: 'Atolla jellyfish illuminated by an ROV in deep water', caption: 'Atolla jellyfish, 880 m deep · NOAA',
    benefits: ['Find new species and unusual ecosystems.', 'Understand how the ocean affects Earth’s climate.', 'Create maps that can guide marine protection.'],
    risks: ['Crushing pressure can damage equipment.', 'Ships and underwater robots are expensive.', 'Sampling and careless equipment use can harm habitats.'],
    problems: [
      { title: 'Crushing pressure', detail: 'Water pressure increases as explorers go deeper.', solution: 'Use pressure-tested housings and remotely operated vehicles, or ROVs, controlled from a ship.' },
      { title: 'Darkness and navigation', detail: 'Sunlight does not reach the deep seafloor, and GPS does not work underwater.', solution: 'Use cameras with lights, sonar that maps with sound, and underwater navigation systems.' },
      { title: 'Fragile ecosystems', detail: 'Some deep-sea habitats recover slowly after disturbance.', solution: 'Observe with cameras first, keep equipment away from animals, and collect only the samples needed.' },
    ],
    fact: 'Some deep-ocean food webs begin with microbes that use chemical energy instead of sunlight. This process is called chemosynthesis.', factSource: 'vents', sourceIds: ['vents','ocean-tech','ocean-climate'],
    purpose: 'In 1977, scientists discovered living communities around hydrothermal vents near the Galápagos Islands. These ecosystems changed our understanding of life in the deep ocean.'
  },
  {
    id: 'polar', name: 'Polar regions', title: 'At the ends of Earth.', subtitle: 'Reading the past in a landscape of ice.', location: 'ANTARCTICA & THE ARCTIC', tag: 'THE FROZEN FRONTIER', color: '#c4e9ff',
    description: 'Polar researchers study ice, wildlife, and the atmosphere in cold and isolated environments. Antarctica is a continent; the Arctic is mainly an ocean surrounded by land.',
    imageAlt: 'Blue icebergs floating in Antarctic waters', caption: 'Antarctic icebergs · Anne Dirkse',
    benefits: ['Read records of Earth’s past climate in ice cores.', 'Study changing ice and polar ecosystems.', 'Bring countries together through shared research.'],
    risks: ['Extreme cold, storms, and hidden ice cracks threaten safety.', 'Isolation makes supplies and rescue difficult.', 'Fuel spills and disturbance can harm fragile wildlife.'],
    problems: [
      { title: 'Cold and severe weather', detail: 'Storms can quickly make travel unsafe.', solution: 'Use insulated clothing and shelters, check weather forecasts, and postpone travel when conditions are dangerous.' },
      { title: 'Isolation and rescue', detail: 'Research teams may be far from hospitals and supplies.', solution: 'Prepare emergency food and medicine, train teams, and coordinate communication and rescue plans.' },
      { title: 'Environmental damage', detail: 'Research stations and expeditions can leave waste or disturb animals.', solution: 'Follow environmental rules, clean equipment, remove waste, and cooperate through the Antarctic Treaty System.' },
    ],
    fact: 'Tiny air bubbles trapped in Antarctic ice preserve samples of the atmosphere from the past.', factSource: 'ice', sourceIds: ['ice','polar-care','amundsen'],
    purpose: 'Roald Amundsen and his team reached the South Pole on 14 December 1911. Today, much polar exploration focuses on science rather than reaching a place first.'
  },
  {
    id: 'rainforest', name: 'Rainforests', title: 'Into the living world.', subtitle: 'Discovering the connections that keep forests alive.', location: 'TROPICAL FORESTS · THE AMAZON', tag: 'THE LIVING FRONTIER', color: '#93ddad',
    description: 'Rainforest researchers study plants, animals, and their relationships. These forests are home to communities with deep local knowledge; they are not empty, unknown lands.',
    imageAlt: 'Aerial photograph of dense tropical rainforest canopy in Queensland', caption: 'Tropical canopy, Queensland · CSIRO',
    benefits: ['Identify species and understand biodiversity.', 'Study how forests store carbon and support ecosystems.', 'Research plants that may lead to useful medicines.'],
    risks: ['Diseases, insects, heat, and humidity can affect health.', 'Dense vegetation and rivers make travel difficult.', 'Unplanned camps and sampling can damage habitats.'],
    problems: [
      { title: 'Health and difficult terrain', detail: 'Remote fieldwork can make even a small illness or injury serious.', solution: 'Plan health protection with experts, carry safe water and first aid, and work with trained local guides.' },
      { title: 'Damage from fieldwork', detail: 'Clearing paths and taking too many samples can disrupt the forest.', solution: 'Use existing routes, small teams, camera traps, and careful sampling with research permits.' },
      { title: 'Respect for communities', detail: 'Research can ignore the rights and knowledge of local people.', solution: 'Seek community agreement, credit local knowledge, and share findings and benefits fairly.' },
    ],
    fact: 'Smithsonian researchers study how rainforest species evolved and continue to identify species new to science. Local people may already know them.', factSource: 'biodiversity', sourceIds: ['biodiversity','forest-census','plant-research'],
    purpose: 'At Barro Colorado Island in Panama, a tree census in 1982 began a long record of forest change. Returning to the same place can be as valuable as a new expedition.'
  },
  {
    id: 'mountain', name: 'Mountains', title: 'Above the clouds.', subtitle: 'A higher view of our changing planet.', location: 'THE HIMALAYAS & OTHER RANGES', tag: 'THE HIGH FRONTIER', color: '#efbd9a',
    description: 'Mountain scientists measure glaciers, map landscapes, and study life at high elevations. Climbing for personal achievement is recreation unless it also serves a research purpose.',
    imageAlt: 'Everest, Lhotse, and Makalu seen from Gokyo Ri in the Himalayas', caption: 'Himalayan peaks from Gokyo Ri · Gavin Challand',
    benefits: ['Improve maps and geographical knowledge.', 'Study glaciers, weather, and mountain ecosystems.', 'Build skills and a sense of achievement through climbing.'],
    risks: ['Altitude sickness can become life-threatening.', 'Avalanches, storms, and falls can cause serious injury.', 'Crowded routes and abandoned equipment create pollution.'],
    problems: [
      { title: 'Altitude sickness', detail: 'At high elevations, lower air pressure means less oxygen in each breath.', solution: 'Allow time to adjust through gradual ascent. If illness develops, stop ascending, seek expert help, and descend when needed.' },
      { title: 'Avalanches and emergencies', detail: 'Weather and snow conditions can change rapidly.', solution: 'Check forecasts, choose safer routes with experienced guides, carry communication equipment, and plan rescue options.' },
      { title: 'Waste and overcrowding', detail: 'Rubbish and human waste can damage mountain environments.', solution: 'Carry waste out, use managed camps, follow local rules, and turn back when conditions become unsafe.' },
    ],
    fact: 'On 29 May 1953, Tenzing Norgay and Edmund Hillary made the first confirmed ascent of Mount Everest.', factSource: 'everest', sourceIds: ['everest','altitude'],
    purpose: 'The 1953 Everest expedition was a landmark in mountaineering. Modern scientific expeditions ask different questions, such as how Himalayan glaciers are changing.'
  }
];
export const regionById = Object.fromEntries(regions.map(r => [r.id, r])) as Record<RegionId, Region>;

// Short versions for a classroom projector; the museum view provides the details.
export const slideArguments: Record<RegionId, { benefits: string[]; risks: string[] }> = {
  space: { benefits: ['Understand planets and the universe', 'Develop robots, sensors, and technology', 'Study conditions for life'], risks: ['Enormous costs and long preparation', 'Harmful radiation', 'Dangerous missions and equipment failures'] },
  ocean: { benefits: ['Discover species and ecosystems', 'Understand Earth’s climate', 'Map habitats for marine protection'], risks: ['Crushing water pressure', 'Expensive ships and equipment', 'Damage to fragile habitats'] },
  polar: { benefits: ['Learn about past climate from ice', 'Study ice and polar wildlife', 'Build international cooperation'], risks: ['Extreme cold, storms, and ice cracks', 'Isolation and difficult rescue', 'Fuel spills and disturbed wildlife'] },
  rainforest: { benefits: ['Discover species and biodiversity', 'Understand forests and carbon storage', 'Research plants with medical potential'], risks: ['Disease, insects, and difficult terrain', 'Heat and humidity', 'Damage to habitats and communities'] },
  mountain: { benefits: ['Improve maps and geographical knowledge', 'Study glaciers, weather, and ecosystems', 'Gain skills and personal achievement'], risks: ['Dangerous altitude sickness', 'Avalanches, storms, and falls', 'Pollution and abandoned equipment'] },
};

export const timeline = [
  { year: '1911', date: '14 DECEMBER 1911', title: 'The South Pole', region: 'polar' as RegionId, description: 'Amundsen and four companions reached the South Pole. Careful preparation played a major role.', source: 'amundsen' },
  { year: '1953', date: '29 MAY 1953', title: 'The Everest summit', region: 'mountain' as RegionId, description: 'Tenzing Norgay and Edmund Hillary made the first confirmed ascent, supported by a wider expedition team.', source: 'everest' },
  { year: '1969', date: '20 JULY 1969', title: 'One new world', region: 'space' as RegionId, description: 'Apollo 11 landed on the Moon. Armstrong and Aldrin explored its surface; Collins remained in lunar orbit.', source: 'apollo' },
  { year: '1977', date: '1977', title: 'Life in the darkness', region: 'ocean' as RegionId, description: 'Scientists found hydrothermal vent communities near the Galápagos Islands, supported by chemical energy.', source: 'vents' },
  { year: '1982', date: '1982', title: 'A forest, counted', region: 'rainforest' as RegionId, description: 'A tree census at Barro Colorado Island helped start a long record of tropical forest change.', source: 'forest-census' },
  { year: '2021', date: '18 FEBRUARY 2021', title: 'A rover on Mars', region: 'space' as RegionId, description: 'Perseverance landed in Jezero Crater to study rocks and investigate a landscape shaped by ancient water.', source: 'mars' },
];

export const technologies = [
  { name: 'Robotic explorers', icon: 'robot', text: 'Rovers and underwater ROVs reach dangerous places while people control them from a safer location.', example: 'Mars & the deep ocean', sources: ['mars','ocean-tech'] },
  { name: 'Maps & remote sensing', icon: 'satellite', text: 'Satellites, sonar, and cameras help teams study landscapes and plan routes before entering the field.', example: 'From glaciers to the seafloor', sources: ['mars','ocean-tech'] },
  { name: 'Protection & planning', icon: 'shield', text: 'Tested equipment, backup supplies, weather checks, and communication reduce the chance of an emergency.', example: 'Every expedition', sources: ['radiation','altitude','polar-care'] },
  { name: 'Shared knowledge', icon: 'people', text: 'Scientists, local guides, and communities can share skills, costs, and evidence. Cooperation improves decisions.', example: 'A common responsibility', sources: ['polar-care','plant-research'] },
];

export interface Question { question: string; choices: string[]; answer: number; explanation: string; }
export const quizQuestions: Question[] = [
  { question: 'What makes an expedition scientific exploration?', choices: ['Reaching a place before anyone else', 'Collecting evidence to answer questions', 'Taking exciting holiday photographs', 'Travelling without a guide'], answer: 1, explanation: 'Scientific exploration asks questions, gathers evidence, and shares knowledge. Tourism can be valuable, but its main purpose is different.' },
  { question: 'Why are remotely operated vehicles useful in the deep ocean?', choices: ['They remove all pressure from the ocean', 'They make all ocean research free', 'They let people explore from a safer location', 'They work only in shallow water'], answer: 2, explanation: 'An ROV is an underwater robot controlled from a ship. It can carry cameras and instruments into water that is dangerous for people.' },
  { question: 'What can air bubbles in Antarctic ice tell scientists?', choices: ['What the past atmosphere was like', 'The exact date of the next snowstorm', 'How to make sea ice disappear', 'Where every polar animal lives'], answer: 0, explanation: 'The bubbles contain samples of ancient air. Studying them helps scientists understand past changes in the atmosphere and climate.' },
  { question: 'Which plan shows responsible rainforest exploration?', choices: ['Clear a wide road for a short study', 'Collect every animal the team finds', 'Ignore people who live in the forest', 'Work with local communities and limit disturbance'], answer: 3, explanation: 'Responsible teams respect community rights, use local knowledge fairly, and keep their environmental impact as small as possible.' },
  { question: 'Which statement best describes our opinion?', choices: ['Explore responsibly, with safety and environmental care', 'Every possible mission is worth its cost', 'Personal achievement matters more than safety', 'Stop all exploration because it has risks'], answer: 0, explanation: 'Exploration can bring real benefits. We support it when its purpose is useful, risks are managed, and people and nature are respected.' },
];
export function quizScore(answers: (number | null)[]) { return quizQuestions.reduce((score,q,i) => score + Number(answers[i] === q.answer), 0); }

export const conclusion = 'We believe that exploration is important because it helps humanity discover new things, develop technology, and understand our planet. However, exploration must be responsible, safe, and respectful of the environment.';
export type SlideKind = 'title' | 'concept' | 'motives' | 'region' | 'compare' | 'problems' | 'technology' | 'environment' | 'debate' | 'conclusion' | 'thanks';
export interface Slide { title: string; subtitle: string; kind: SlideKind; region?: RegionId; notes: string; sources: string[]; }
export const slides: Slide[] = [
  { title: 'Beyond the Horizon', subtitle: 'Exploring the unknown', kind: 'title', sources: [], notes: 'Hello everyone. Imagine standing at the edge of a world you have never seen. Would you take the next step? Today we will explore five very different environments, from space to mountains. We will look at the discoveries, the dangers, and the responsibility that comes with exploration.' },
  { title: 'What is exploration?', subtitle: 'A journey with a question.', kind: 'concept', sources: ['ocean-climate','biodiversity'], notes: 'Exploration means investigating places or ideas to learn something new. Scientific explorers ask a question, collect evidence, and share their results. A tourist usually travels for enjoyment. A climber may travel for achievement. These activities can overlap, but a scientific mission needs a research purpose. Unknown to an outside researcher does not mean unknown to local people.' },
  { title: 'Why do humans explore?', subtitle: 'Curiosity turns into knowledge.', kind: 'motives', sources: ['mars','ocean-climate','biodiversity'], notes: 'People explore because we are curious, because we want to solve problems, and because we want to understand our world. Research can lead to useful technology and help protect nature. For this presentation, we chose five environments and three questions: what do we gain, what can go wrong, and how can we explore responsibly?' },
  { title: 'Space exploration', subtitle: 'The Moon and Mars', kind: 'region', region: 'space', sources: ['apollo','mars','radiation'], notes: 'Space exploration helps us understand other worlds and develops new technology. Apollo 11 landed on the Moon in 1969. In 2021, Perseverance landed on Mars to investigate rocks and possible signs of ancient life. However, space missions are very expensive, and radiation is dangerous. Robotic scouts, careful testing, and protective systems can reduce these risks.' },
  { title: 'Deep ocean exploration', subtitle: 'A world beneath the surface', kind: 'region', region: 'ocean', sources: ['vents','ocean-tech','ocean-climate'], notes: 'The deep ocean contains unusual ecosystems and helps us understand the climate. In 1977, researchers discovered communities around hydrothermal vents. Their food webs use chemical energy instead of sunlight. Exploration is difficult because of darkness and crushing pressure. Underwater robots with strong housings, cameras, and sonar let scientists study these places more safely.' },
  { title: 'Polar exploration', subtitle: 'Antarctica and the Arctic', kind: 'region', region: 'polar', sources: ['ice','polar-care','amundsen'], notes: 'Polar exploration teaches us about climate and ice. Small bubbles in ice cores preserve air from the past. Amundsen’s team reached the South Pole in 1911, but today science matters more than being first. Extreme cold, isolation, and storms make fieldwork dangerous. Good equipment, backup supplies, and international cooperation help protect researchers and the environment.' },
  { title: 'Rainforest exploration', subtitle: 'Understanding the living world', kind: 'region', region: 'rainforest', sources: ['biodiversity','forest-census','plant-research'], notes: 'Rainforests contain a huge variety of living things. Researchers study species and the relationships that keep a forest healthy. A long-running tree study in Panama began with a census in 1982. Diseases and difficult terrain are challenges, and careless research can damage habitats. Teams should work with local communities, use small camps, and collect only necessary samples.' },
  { title: 'Mountain exploration', subtitle: 'The Himalayas and beyond', kind: 'region', region: 'mountain', sources: ['everest','altitude'], notes: 'Mountains give us knowledge about glaciers, weather, and geography. Tenzing Norgay and Edmund Hillary reached the Everest summit in 1953. Their achievement is part of mountaineering history; climbing is not always scientific research. Altitude sickness, avalanches, and waste are serious concerns. Teams need gradual ascent, experienced guides, communication, and the courage to turn back.' },
  { title: 'Benefits and risks', subtitle: 'Every frontier has a trade-off.', kind: 'compare', sources: ['radiation','ocean-tech','polar-care','altitude'], notes: 'The advantages of exploration include discoveries, useful technology, and a better understanding of Earth. The disadvantages include high costs, danger, and environmental harm. These arguments must be considered together. A mission with a useful purpose can still be a poor choice if its risks are too high or its impact cannot be controlled.' },
  { title: 'Common problems', subtitle: 'Different places. Shared challenges.', kind: 'problems', sources: ['radiation','ocean-tech','altitude'], notes: 'Most expeditions face four shared challenges: extreme conditions, limited supplies, communication problems, and emergencies far from help. A good plan begins before the team leaves. Explorers should train, test their equipment, carry backups, and agree on when to stop. Preparation cannot remove every risk, but it makes better decisions possible.' },
  { title: 'Technology and solutions', subtitle: 'Explore smarter. Work together.', kind: 'technology', sources: ['mars','ocean-tech','polar-care'], notes: 'Modern technology helps us reach places safely. Robotic rovers study Mars, and ROVs explore deep water. Satellites and sonar help us make maps. Better protective equipment and communication support field teams. Technology works best with human judgment, local knowledge, and cooperation. A machine alone cannot decide whether a mission is responsible.' },
  { title: 'The environmental impact', subtitle: 'Discovery should not mean damage.', kind: 'environment', sources: ['polar-care','plant-research'], notes: 'Exploration can help protect nature by showing us what exists and how it is changing. It can also cause damage through waste, fuel use, habitat disturbance, or careless sampling. We think teams should measure their impact, follow local rules, remove waste, and choose the least harmful method that can answer their question.' },
  { title: 'Should we keep exploring?', subtitle: 'A question worth discussing.', kind: 'debate', sources: [], notes: 'There are strong arguments on both sides. In favour, exploration creates knowledge and can help society. Against it, money could support urgent needs, and some missions put people and ecosystems at risk. Our answer is yes, but with conditions. The scientific value should justify the cost, and safety, community rights, and environmental protection must come first.' },
  { title: 'Our conclusion', subtitle: 'Keep the curiosity. Carry the responsibility.', kind: 'conclusion', sources: [], notes: conclusion + ' We do not support every expedition automatically. We support exploration with a clear purpose and careful planning. For us, the best explorer brings back knowledge while showing respect for the world they visit.' },
  { title: 'Thank you.', subtitle: 'What would you explore next?', kind: 'thanks', sources: [], notes: 'Thank you for listening. Which of the five environments would you like to study, and why? What problem would you solve before going there? We are ready for your questions. If there is time, we can finish with our five-question classroom quiz.' },
];
