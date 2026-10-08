import { readFile, writeFile } from 'node:fs/promises';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import ts from 'typescript';

// Read the same lesson data as the website, so rebuilding keeps the PDF in sync.
const code = ts.transpileModule(await readFile('src/data.ts', 'utf8'), { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText;
const { slides, regionById, slideArguments, conclusion, sources } = await import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'));
const credits = JSON.parse(await readFile('src/imageCredits.json', 'utf8'));
const pdf = await PDFDocument.create();
pdf.setTitle('Beyond the Horizon: Exploring the Unknown');
pdf.setAuthor('Grade 10 English exploration project');
pdf.setSubject('Five exploration regions, balanced arguments, practical solutions, and references.');
const regular = await pdf.embedFont(StandardFonts.Helvetica);
const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
const italic = await pdf.embedFont(StandardFonts.TimesRomanItalic);
const colors = { bg: rgb(.031,.051,.086), panel: rgb(.069,.11,.165), line: rgb(.17,.25,.32), ink: rgb(.91,.95,.97), muted: rgb(.68,.77,.84), cyan: rgb(.53,.95,.9), green: rgb(.61,.88,.74), amber: rgb(.94,.76,.59) };
const photos = {};
for (const key of ['earth','space','ocean','polar','rainforest','mountain']) photos[key] = await pdf.embedJpg(await readFile(`scripts/pdf-assets/${key}.jpg`));
const clean = text => text.replace(/[\u2010-\u2015]/g,'-').replace(/→/g,'to').replace(/←/g,'back').replace(/↗/g,'').replace(/·/g,' / ').replace(/…/g,'...');
function text(page, str, x, y, size=14, color=colors.ink, font=regular) { page.drawText(clean(str), { x, y, size, color, font }); }
function wrapped(page, str, x, y, width, size=14, color=colors.ink, font=regular, lineHeight=size*1.55) {
  const words=clean(str).split(/\s+/);let line='';let cursor=y;
  for(const word of words){const candidate=line?line+' '+word:word;if(font.widthOfTextAtSize(candidate,size)>width&&line){text(page,line,x,cursor,size,color,font);cursor-=lineHeight;line=word;}else line=candidate;}
  if(line)text(page,line,x,cursor,size,color,font);return cursor-lineHeight;
}
function rectangle(page,x,y,width,height,color=colors.panel,border=colors.line){page.drawRectangle({x,y,width,height,color,borderColor:border,borderWidth:.7});}
function bullets(page, items, x, top, width, size=14) {let y=top;for(const item of items){page.drawCircle({x:x+2,y:y+4,size:2,color:colors.muted});y=wrapped(page,item,x+15,y,width-18,size,colors.ink,regular,size*1.55)-13;}return y;}
function footer(page,n){page.drawLine({start:{x:54,y:38},end:{x:906,y:38},thickness:.5,color:colors.line});text(page,'BEYOND THE HORIZON / GRADE 10 ENGLISH',54,23,8,colors.muted);text(page,`${String(n).padStart(2,'0')} / 15`,859,23,9,colors.cyan,bold);}
function cards(page, items, columns=3, top=355, height=175){const gap=18,width=(852-gap*(columns-1))/columns;for(let i=0;i<items.length;i++){const col=i%columns,row=Math.floor(i/columns),x=54+col*(width+gap),y=top-row*(height+gap);rectangle(page,x,y-height,width,height);text(page,String(i+1).padStart(2,'0'),x+20,y-27,11,colors.cyan,bold);wrapped(page,items[i][0],x+20,y-60,width-40,19,colors.ink,bold,24);wrapped(page,items[i][1],x+20,y-101,width-40,14,colors.muted,regular,22);}}
function sourceLine(page, slide){if(slide.sources.length)text(page,'Sources: '+[...new Set(slide.sources.map(id=>sources.find(s=>s.id===id).organization))].join(' / '),54,52,7.5,colors.muted);}

for(let i=0;i<slides.length;i++){
  const slide=slides[i],page=pdf.addPage([960,540]);rectangle(page,0,0,960,540,colors.bg,colors.bg);
  if(slide.kind==='title'||slide.kind==='thanks'){
    page.drawImage(photos.earth,{x:290,y:0,width:943,height:540,opacity:.62});page.drawRectangle({x:0,y:0,width:630,height:540,color:colors.bg,opacity:.55});
    text(page,'A GRADE 10 ENGLISH EXPLORATION PROJECT',56,475,9,colors.cyan,bold);
    if(slide.kind==='title'){text(page,'BEYOND THE',54,359,66,colors.ink,bold);text(page,'HORIZON.',54,281,66,colors.ink,bold);text(page,'Exploring the unknown.',56,224,37,colors.cyan,italic);text(page,'Five frontiers. Extraordinary discoveries.',56,163,16,colors.muted);text(page,'One shared future.',56,137,16,colors.muted);}
    else{text(page,'Thank you.',54,332,78,colors.ink,bold);text(page,'What would you explore next?',56,260,34,colors.cyan,italic);text(page,'Which frontier would you choose?',56,190,18,colors.muted);text(page,'How would you explore it responsibly?',56,157,18,colors.muted);}
    text(page,'SPACE / DEEP OCEAN / POLAR REGIONS / RAINFORESTS / MOUNTAINS',56,84,10,colors.cyan,bold);footer(page,i+1);continue;
  }
  text(page,`BEYOND THE HORIZON / ${String(i+1).padStart(2,'0')}`,54,484,9,colors.cyan,bold);
  text(page,slide.title,54,438,34,colors.ink,bold);text(page,slide.subtitle,55,407,22,colors.cyan,italic);
  switch(slide.kind){
    case 'concept':
      text(page,'Investigating places and ideas to learn something new.',54,360,21,colors.ink,bold);
      cards(page,[['Ask a question','What do we want to understand?'],['Find evidence','Observe, measure, and record.'],['Share knowledge','Help others learn from the results.']],3,330,170);
      wrapped(page,'Tourism is mainly for enjoyment. Scientific exploration has a research purpose. A place can be new to a researcher and already familiar to local people.',54,117,852,15,colors.muted);break;
    case 'motives':
      cards(page,[['Curiosity','Understand Earth, other worlds, and the life around us.'],['Better solutions','Develop technology and answer useful questions.'],['A shared future','Use discoveries to understand and protect nature.']],3,360,190);
      text(page,'OUR PRESENTATION FOCUS',54,126,10,colors.cyan,bold);text(page,'Five environments / Benefits and risks / Problems and solutions',54,98,17,colors.ink);break;
    case 'region':{
      const r=regionById[slide.region];rectangle(page,54,89,251,286);page.drawImage(photos[r.id],{x:55,y:210,width:249,height:161.85});
      wrapped(page,r.location,71,176,219,10,colors.cyan,bold,15);wrapped(page,r.caption,71,126,219,8,colors.muted);
      rectangle(page,326,183,280,192,rgb(.075,.145,.127));rectangle(page,622,183,284,192,rgb(.15,.127,.11));
      text(page,'ADVANTAGES',344,351,10,colors.green,bold);text(page,'DISADVANTAGES',640,351,10,colors.amber,bold);
      bullets(page,slideArguments[r.id].benefits,344,322,244,14);bullets(page,slideArguments[r.id].risks,640,322,247,14);
      rectangle(page,326,89,580,79,rgb(.075,.16,.18));text(page,'A POSSIBLE SOLUTION',343,147,9,colors.cyan,bold);wrapped(page,r.problems[0].solution,343,124,545,11.5,colors.ink,regular,17);break;
    }
    case 'compare':
      rectangle(page,54,129,415,244,rgb(.075,.145,.127));rectangle(page,487,129,419,244,rgb(.15,.127,.11));text(page,'WHAT WE GAIN',76,340,12,colors.green,bold);text(page,'WHAT WE RISK',509,340,12,colors.amber,bold);bullets(page,['New discoveries and useful knowledge','Better tools and technology','A clearer picture of our changing planet'],76,299,369,17);bullets(page,['Large costs and competing needs','Danger to explorers and support teams','Damage to habitats and communities'],509,299,370,17);text(page,'A useful discovery must justify its cost, danger, and impact.',54,93,17,colors.cyan);break;
    case 'problems':
      cards(page,[['Extreme conditions','Cold, pressure, radiation, or altitude: protection and tested equipment.'],['Limited supplies','Food, water, power, or spare parts: careful planning and backups.'],['Communication','Distance and weak signals: reliable systems and clear procedures.'],['Help far away','Delayed rescue: training, emergency plans, and safe stopping rules.']],2,371,142);break;
    case 'technology':
      cards(page,[['Robotic explorers','Rovers and ROVs keep people away from the most dangerous conditions.'],['Maps and remote sensing','Satellites, sonar, and cameras help teams plan and observe.'],['Protection and planning','Protective equipment, backups, and forecasts reduce risks.'],['Shared knowledge','Scientists, local guides, and communities learn together.']],2,371,142);break;
    case 'environment':
      cards(page,[['Observe first','Use cameras and remote tools where possible. Limit sampling.'],['Reduce the impact','Remove waste, prevent spills, and avoid disturbing wildlife.'],['Respect people','Follow local rules, seek agreement, and share benefits.']],3,358,205);
      wrapped(page,'Research can guide conservation. Careless exploration can damage what it studies.',54,112,850,17,colors.cyan);break;
    case 'debate':
      cards(page,[['Yes, because...','Discoveries can improve technology, explain our world, and support conservation.'],['But we must ask...','Could the money meet urgent needs? Can we manage the danger and environmental cost?']],2,362,205);
      wrapped(page,'Our answer: yes - with a clear purpose, careful planning, and respect.',54,112,852,20,colors.cyan,bold);break;
    case 'conclusion':
      wrapped(page,conclusion,65,345,824,27,colors.ink,bold,43);text(page,'STAY CURIOUS / STAY SAFE / SHOW RESPECT',65,97,14,colors.cyan,bold);break;
  }
  sourceLine(page,slide);footer(page,i+1);
}
for(let offset=0;offset<sources.length;offset+=8){
  const page=pdf.addPage([960,540]);rectangle(page,0,0,960,540,colors.bg,colors.bg);text(page,'RESEARCH AND REFERENCES',54,484,9,colors.cyan,bold);text(page,'Curiosity, backed by science.',54,442,31,colors.ink,bold);text(page,'Sources checked 8 October 2026. Comparison ratings and final opinion are classroom judgments.',54,411,12,colors.muted);
  sources.slice(offset,offset+8).forEach((s,i)=>{const col=i%2,row=Math.floor(i/2),x=54+col*435,y=369-row*81;wrapped(page,s.organization+': '+s.title,x,y,408,11,colors.ink,bold,15);wrapped(page,s.supports,x,y-32,408,9,colors.muted,regular,13);wrapped(page,s.url,x,y-57,408,6.5,colors.cyan,regular,9);});
  text(page,'Photo credits and licenses: IMAGE_CREDITS.md and the website Sources section.',54,25,8,colors.muted);
}
const creditPage=pdf.addPage([960,540]);rectangle(creditPage,0,0,960,540,colors.bg,colors.bg);text(creditPage,'PHOTOGRAPHY AND MAP CREDITS',54,484,9,colors.cyan,bold);text(creditPage,'Real places. Real photographs.',54,442,31,colors.ink,bold);
credits.forEach((c,i)=>{const col=i%2,row=Math.floor(i/2),x=54+col*435,y=387-row*108;wrapped(creditPage,c.title,x,y,408,11,colors.ink,bold,15);wrapped(creditPage,c.credit,x,y-32,408,9,colors.muted,regular,13);wrapped(creditPage,c.source,x,y-50,408,6.5,colors.cyan,regular,9);wrapped(creditPage,c.license+' / '+c.licenseUrl,x,y-70,408,7,colors.muted,regular,10);});
text(creditPage,'Photos resized and cropped. Antarctica derivative: CC BY-SA 4.0. Map: Natural Earth (public domain).',54,52,8,colors.muted);text(creditPage,'The rainforest is Queensland. The Atolla jellyfish was illuminated by an underwater robot.',54,31,8,colors.muted);
await writeFile('public/Beyond-the-Horizon.pdf',await pdf.save());
console.log(`Presentation PDF generated: ${pdf.getPageCount()} pages (15 slides + references).`);
