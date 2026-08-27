import '../css/styles.css';

const themes = {
  neutral: {
    label:{de:'Neutral',en:'Neutral'},
    fontUi:"system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif",
    fontCanvas:"system-ui,-apple-system,'Segoe UI',Arial,sans-serif",
    fontPptx:null,
    ink:'#1f2124', muted:'#6b7075', line:'#d5d8dc', soft:'#f2f3f5',
    paper:'#f6f7f8', white:'#ffffff',
    accent:'#4a5157', accentDark:'#444444',
    frame:'#d5d8dc', frameWidth:1, ruleWidth:2,
    statuses:{ allow:{glyph:'✓',color:'#2f7d4f',fg:'#ffffff'},
               limit:{glyph:'!',color:'#b8860b',fg:'#1f2124'},
               deny:{glyph:'×',color:'#b03a2b',fg:'#ffffff'} },
    strings:{ de:{subtitle:'Lehrveranstaltung', footer:'Konkretisiert die allgemeine KI-Richtlinie der Einrichtung.'},
              en:{subtitle:'Course', footer:'Specifies the general AI policy of the institution.'} }
  },
  chair: {
    label:{de:'CD',en:'CD'},
    fontUi:'"Helvetica Neue",Helvetica,Arial,sans-serif',
    fontCanvas:'Helvetica, Arial, sans-serif',
    fontPptx:'Helvetica',
    ink:'#000000', muted:'#444444', line:'#8e8e8d', soft:'#f2f2f2',
    paper:'#f3f3f3', white:'#ffffff',
    accent:'#DA3C43', accentDark:'#BA3339',
    frame:'#8e8e8d', frameWidth:1, ruleWidth:1,
    statuses:{ allow:{glyph:'✓',color:'#19733b',fg:'#fff'},
               limit:{glyph:'!',color:'#d99800',fg:'#201e1d'},
               deny:{glyph:'×',color:'#c93320',fg:'#fff'} },
    strings:{ de:{subtitle:'Lehrstuhl für Medieninformatik', footer:'Lehrstuhl für Medieninformatik · Universität Regensburg'},
              en:{subtitle:'Chair of Media Informatics', footer:'Chair of Media Informatics · Universität Regensburg'} }
  }
};
let activeTheme = themes.neutral;
let statuses = activeTheme.statuses;

function applyTheme(id){
  activeTheme = themes[id] || themes.neutral;
  statuses = activeTheme.statuses;
  const root=document.documentElement.style, th=activeTheme;
  root.setProperty('--ink',th.ink);
  root.setProperty('--paper',th.paper);
  root.setProperty('--white',th.white);
  root.setProperty('--muted',th.muted);
  root.setProperty('--line',th.line);
  root.setProperty('--soft',th.soft);
  root.setProperty('--accent',th.accent);
  root.setProperty('--accent-dark',th.accentDark);
  root.setProperty('--font',th.fontUi);
  root.setProperty('--frame',th.frame);
  root.setProperty('--frame-width',`${th.frameWidth}px`);
  root.setProperty('--rule-width',`${th.ruleWidth}px`);
  root.setProperty('--green',th.statuses.allow.color);
  root.setProperty('--amber',th.statuses.limit.color);
  root.setProperty('--red',th.statuses.deny.color);
  document.documentElement.dataset.theme=id;
  renderFormControls();
  snapshot=getFormData();
  renderOutput();
}
function strings(lang){ return {...translations[lang], ...activeTheme.strings[lang]}; }
function font(th){ return th.fontPptx?{fontFace:th.fontPptx}:{}; }

const translations = {
  de: {
    formTitle:'KI-Nutzung im Kurs', intro:'Legen Sie verständliche Regeln für den Einsatz generativer KI fest.', meta:'Kursdaten', areasHeading:'Erlaubte Einsatzbereiche', areasHint:'Wählen Sie für jeden Bereich eine Ampelfarbe und ergänzen Sie bei Bedarf eine Bedingung.', docsHeading:'Dokumentation', notesHeading:'Beispiele & Hinweise', notesOptional:'Optional – nur bei zusätzlichem Erklärungsbedarf', preview:'Vorschau', ready:'Fertig für Ihre Folien', reset:'Zurücksetzen', generate:'Vorschau bestätigen', live:'Live-Vorschau aktiv', updated:'Vorschau ist aktuell', download:'PNG herunterladen', pptx:'PPTX herunterladen', copy:'Text kopieren', copied:'Text kopiert', imageReady:'PNG wurde erstellt', pptxReady:'PPTX wurde erstellt', visual:'Ampel', text:'Text', pageLabel:'Seite',
    fields:{course:'Kurs / Modul',lecturer:'Dozent/in',semester:'Semester',date:'Stand',allowedExamples:'Beispiele erlaubter Nutzung',forbiddenExamples:'Beispiele nicht erlaubter Nutzung',notes:'Weitere Hinweise'},
    status:{allow:'Erlaubt',limit:'Eingeschränkt',deny:'Nicht erlaubt'},
    areas:['Recherche & Literaturarbeit','Texte lesen, verstehen & zusammenfassen','Brainstorming & Ideensammlung','Sprachliche Überarbeitung','Lernunterstützung & Prüfungsvorbereitung','Textgenerierung (Abschnitte / Kapitel)','Programmierung: Erklärung & Fehlersuche','Programmierung: wesentliche Lösungsteile','Studien- & Forschungsdesign','Datenanalyse & -interpretation','Bildgenerierung','Präsentationserstellung'],
    docs:['Standardanforderung laut Richtlinie','Kurzer Nutzungshinweis genügt','Keine Dokumentation erforderlich','Konkrete Prompts beifügen','Chatverläufe beifügen','Kurze Reflexion über den KI-Einsatz'],
    notePlaceholder:'Bedingung / Anmerkung (optional)', documentation:'Dokumentation', examplesAllowed:'Beispiele erlaubter Nutzung', examplesDenied:'Beispiele nicht erlaubter Nutzung', moreNotes:'Weitere Hinweise', noSelection:'Keine Angabe'
  },
  en: {
    formTitle:'AI use in this course', intro:'Define clear rules for the use of generative AI.', meta:'Course details', areasHeading:'Permitted areas of use', areasHint:'Choose a signal for each area and add a condition if needed.', docsHeading:'Documentation', notesHeading:'Examples & notes', notesOptional:'Optional – only when additional explanation is useful', preview:'Preview', ready:'Ready for your slides', reset:'Reset', generate:'Confirm preview', live:'Live preview active', updated:'Preview is up to date', download:'Download PNG', pptx:'Download PPTX', copy:'Copy text', copied:'Text copied', imageReady:'PNG created', pptxReady:'PPTX created', visual:'Signal', text:'Text', pageLabel:'Page',
    fields:{course:'Course / module',lecturer:'Lecturer',semester:'Semester',date:'Valid as of',allowedExamples:'Examples of permitted use',forbiddenExamples:'Examples of non-permitted use',notes:'Additional notes'},
    status:{allow:'Allowed',limit:'Restricted',deny:'Not allowed'},
    areas:['Research & literature work','Reading, understanding & summarising','Brainstorming & idea generation','Language editing & proofreading','Learning support & exam preparation','Text generation (sections / chapters)','Programming: explanation & debugging','Programming: substantial solution parts','Study & research design','Data analysis & interpretation','Image generation','Presentation creation'],
    docs:['Standard policy requirements','A short usage note suffices','No documentation required','Attach concrete prompts','Attach chat logs','Short reflection on AI use'],
    notePlaceholder:'Condition / note (optional)', documentation:'Documentation', examplesAllowed:'Examples of permitted use', examplesDenied:'Examples of non-permitted use', moreNotes:'Additional notes', noSelection:'Not specified'
  }
};

const defaults = () => ({
  lang:'de',
  theme:'neutral',
  areas:['allow','allow','allow','limit','allow','deny','limit','deny','limit','limit','deny','allow'].map((status, i) => ({status,note:i===3?'Nur Grammatik & Stil, keine neuen Inhalte':''})),
  docs:[true,false,false,true,false,true]
});
let state = defaults();
let snapshot = null;
const form = document.querySelector('#builder-form');

function t(){ return strings(state.lang); }
function cssStatus(status){ const s=statuses[status]; return `--status-color:${s.color};--status-fg:${s.fg}`; }
function hasDetails(s){ return !!(s.allowedExamples.trim()||s.forbiddenExamples.trim()||s.notes.trim()); }
function slugCourse(course){ return course.replace(/[^a-z0-9]+/gi,'-')||'Kurs'; }
const logoUrl=`${import.meta.env.BASE_URL}assets/images/UR-Logo-Bildmarke-RGB.png`;

function renderFormControls(){
  const tr=t();
  document.documentElement.lang=state.lang;
  document.querySelector('#brand-subtitle').textContent=tr.subtitle;
  document.querySelector('#form-title').textContent=tr.formTitle;
  document.querySelector('#form-intro').textContent=tr.intro;
  document.querySelector('#meta-heading').textContent=tr.meta;
  document.querySelector('#areas-heading').textContent=tr.areasHeading;
  document.querySelector('#areas-hint').textContent=tr.areasHint;
  document.querySelector('#docs-heading').textContent=tr.docsHeading;
  document.querySelector('#notes-heading').textContent=tr.notesHeading;
  document.querySelector('#notes-optional').textContent=tr.notesOptional;
  document.querySelector('#preview-eyebrow').textContent=tr.preview;
  document.querySelector('#preview-title').textContent=tr.ready;
  document.querySelector('#reset-button').textContent=tr.reset;
  document.querySelector('#generate-button').textContent=tr.generate;
  document.querySelector('#png-button').textContent=tr.download;
  document.querySelector('#pptx-button').textContent=tr.pptx;
  document.querySelectorAll('#copy-text-button,#copy-text-button-alt').forEach(el=>el.textContent=tr.copy);
  document.querySelectorAll('[data-label]').forEach(el=>el.textContent=tr.fields[el.dataset.label]);
  document.querySelectorAll('[data-lang]').forEach(el=>el.classList.toggle('active',el.dataset.lang===state.lang));
  document.querySelector('#theme-switch').innerHTML=Object.keys(themes).map(id=>`<button type="button" data-theme="${id}" class="${state.theme===id?'active':''}">${themes[id].label[state.lang]}</button>`).join('');
  document.querySelector('[data-tab="visual"]').textContent=tr.visual;
  document.querySelector('[data-tab="text"]').textContent=tr.text;

  document.querySelector('#area-options').innerHTML=tr.areas.map((name,i)=>`<div class="area-row"><span class="area-name">${name}</span><div class="status-picker" aria-label="${name}">${['allow','limit','deny'].map(status=>`<button type="button" class="status-button ${state.areas[i].status===status?'active':''}" data-area="${i}" data-status="${status}" title="${tr.status[status]}" style="${cssStatus(status)}">${statuses[status].glyph}</button>`).join('')}</div><input class="area-note" data-note="${i}" value="${escapeHtml(state.areas[i].note)}" placeholder="${tr.notePlaceholder}"></div>`).join('');
  document.querySelector('#documentation-options').innerHTML=tr.docs.map((label,i)=>`<label class="check-option ${state.docs[2]&&i>2?'disabled':''}"><input type="checkbox" data-doc="${i}" ${state.docs[i]?'checked':''} ${state.docs[2]&&i>2?'disabled':''}><span>${label}</span></label>`).join('');
}

function escapeHtml(value=''){ return value.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

// Small shared markdown subset: bullet lines ("- "/"* ") plus inline **bold**/*italic*.
// Used by the live preview, the PNG canvas export and the PPTX export so all three stay in sync.
function parseInlineRuns(text){
  const runs=[]; const re=/\*\*(.+?)\*\*|\*(.+?)\*/g; let last=0,m;
  while((m=re.exec(text))){
    if(m.index>last) runs.push({text:text.slice(last,m.index)});
    runs.push(m[1]!==undefined?{text:m[1],bold:true}:{text:m[2],italic:true});
    last=re.lastIndex;
  }
  if(last<text.length) runs.push({text:text.slice(last)});
  return runs.length?runs:[{text}];
}
function parseMarkdown(text){
  return text.split('\n').map(line=>line.trim()).filter(Boolean).map(line=>{
    const bullet=/^[-*]\s+/.test(line);
    return {type:bullet?'bullet':'para',runs:parseInlineRuns(bullet?line.replace(/^[-*]\s+/,''):line)};
  });
}
function runsToHtml(runs){
  return runs.map(r=>{let s=escapeHtml(r.text); if(r.bold) s=`<strong>${s}</strong>`; if(r.italic) s=`<em>${s}</em>`; return s;}).join('');
}
function markdownToHtml(text){
  const blocks=parseMarkdown(text); let html='',i=0;
  while(i<blocks.length){
    if(blocks[i].type==='bullet'){ let items=''; while(i<blocks.length&&blocks[i].type==='bullet'){ items+=`<li>${runsToHtml(blocks[i].runs)}</li>`; i++; } html+=`<ul>${items}</ul>`; }
    else { html+=`<p>${runsToHtml(blocks[i].runs)}</p>`; i++; }
  }
  return html;
}
function getFormData(){ const data=new FormData(form); return {course:data.get('course')||'',lecturer:data.get('lecturer')||'',semester:data.get('semester')||'',date:data.get('date')||'',allowedExamples:data.get('allowedExamples')||'',forbiddenExamples:data.get('forbiddenExamples')||'',notes:data.get('notes')||'',lang:state.lang,areas:structuredClone(state.areas),docs:[...state.docs]}; }

function formatDate(dateStr, lang = 'de'){
  if(!dateStr) return '';
  try {
    const d = new Date(`${dateStr}T12:00:00`);
    if(isNaN(d.getTime())) return dateStr;
    return new Intl.DateTimeFormat(lang==='de'?'de-DE':'en-GB').format(d);
  } catch {
    return dateStr;
  }
}

function cardHeader(tr,s,date,title){
  return `<div class="card-identity"><img class="card-logo" src="${logoUrl}" alt=""><span class="card-bars" aria-hidden="true"><i></i><i></i></span><span class="card-department"><strong>${escapeHtml(s.lecturer)}</strong><span>${escapeHtml(tr.subtitle)}</span></span></div><header class="card-header"><div><div class="card-kicker">${tr.formTitle}</div><h3 class="card-title">${escapeHtml(title)}</h3></div><div class="card-meta"><span class="meta-lecturer">${escapeHtml(s.lecturer)}<br></span>${escapeHtml(s.semester)}<br>${date}</div></header>`;
}
function pageMarker(tr,n,total){ return total>1?`<span class="page-marker">${tr.pageLabel} ${n}/${total}</span>`:''; }

function renderOutput(){
  const s=snapshot, tr=strings(s.lang);
  const date=formatDate(s.date,s.lang);
  const total=hasDetails(s)?2:1;
  const grid=`<div class="policy-grid">${tr.areas.map((name,i)=>{const a=s.areas[i],x=statuses[a.status];return `<div class="policy-row"><span class="policy-row-copy"><span>${name}</span>${a.note?`<span class="policy-row-note">${escapeHtml(a.note)}</span>`:''}</span><span class="policy-status" style="${cssStatus(a.status)}">${x.glyph}</span></div>`}).join('')}</div>`;
  const selectedDocs=s.docs.map((on,i)=>on?tr.docs[i]:null).filter(Boolean);
  const docsMarkup=selectedDocs.length?selectedDocs.map(label=>`<span class="doc-chip">✓ ${label}</span>`).join(''):`<span class="doc-chip muted">${tr.noSelection}</span>`;
  document.querySelector('#policy-card').innerHTML=`${cardHeader(tr,s,date,s.course)}<div class="policy-body">${grid}</div><div class="documentation-strip"><strong>${tr.documentation}</strong><div>${docsMarkup}</div></div><footer class="card-footer"><div class="legend">${['allow','limit','deny'].map(k=>`<span class="legend-item"><span class="legend-dot" style="background:${statuses[k].color}">${statuses[k].glyph}</span>${tr.status[k]}</span>`).join('')}</div>${pageMarker(tr,1,total)}<span class="footer-note">${tr.footer}</span></footer>`;

  const card2=document.querySelector('#policy-card-2');
  if(total>1){
    const blocks=[[tr.examplesAllowed,s.allowedExamples],[tr.examplesDenied,s.forbiddenExamples],[tr.moreNotes,s.notes]].map(([label,value])=>`<div class="detail-block"><strong>${label}</strong><div class="detail-body-text">${value.trim()?markdownToHtml(value):''}</div></div>`).join('');
    card2.innerHTML=`${cardHeader(tr,s,date,tr.notesHeading)}<div class="policy-body detail-body">${blocks}</div><footer class="card-footer">${pageMarker(tr,2,total)}<span class="footer-note">${tr.footer}</span></footer>`;
    card2.hidden=false;
  } else {
    card2.hidden=true;
  }

  document.querySelector('#text-output').textContent=buildText(s);
  document.querySelector('#dirty-note').textContent=tr.live;
}

function buildText(s){
  const tr=translations[s.lang], date=formatDate(s.date,s.lang), lines=[`${tr.formTitle}: ${s.course}`,`${tr.fields.lecturer}: ${s.lecturer}`,`${tr.fields.semester}: ${s.semester}`,`${tr.fields.date}: ${date}`,'',tr.areasHeading];
  tr.areas.forEach((name,i)=>lines.push(`- ${statuses[s.areas[i].status].glyph} ${name}: ${tr.status[s.areas[i].status]}${s.areas[i].note?` — ${s.areas[i].note}`:''}`));
  const docs=s.docs.map((on,i)=>on?tr.docs[i]:null).filter(Boolean);
  lines.push('',`${tr.documentation}: ${docs.join('; ')||tr.noSelection}`);
  [[tr.examplesAllowed,s.allowedExamples],[tr.examplesDenied,s.forbiddenExamples],[tr.moreNotes,s.notes]].forEach(([label,value])=>{if(value.trim())lines.push('',`${label}:`,value.trim())});
  return lines.join('\n');
}

function updateLive(){
  snapshot=getFormData();
  renderOutput();
  const indicator=document.querySelector('.live-indicator');
  indicator.classList.remove('updating');
  requestAnimationFrame(()=>indicator.classList.add('updating'));
}
function scheduleLiveUpdate(){ clearTimeout(scheduleLiveUpdate.timer); scheduleLiveUpdate.timer=setTimeout(updateLive,80); }
function showToast(message){ const el=document.querySelector('#toast');el.textContent=message;clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>el.textContent='',2500); }

document.addEventListener('click',e=>{
  const status=e.target.closest('[data-status]');
  if(status){ state.areas[+status.dataset.area].status=status.dataset.status; renderFormControls(); updateLive(); }
  const lang=e.target.closest('[data-lang]');
  if(lang){ state.lang=lang.dataset.lang; renderFormControls(); snapshot=getFormData();renderOutput(); }
  const theme=e.target.closest('button[data-theme]');
  if(theme){ state.theme=theme.dataset.theme; applyTheme(state.theme); }
  const tab=e.target.closest('[data-tab]');
  if(tab){ document.querySelectorAll('[data-tab]').forEach(x=>x.classList.toggle('active',x===tab));document.querySelectorAll('.tab-pane').forEach(x=>x.classList.toggle('active',x.id===`${tab.dataset.tab}-pane`)); }
});

document.addEventListener('change',e=>{
  if(e.target.matches('[data-doc]')){
    const i=+e.target.dataset.doc;
    if(i<=2&&e.target.checked) state.docs=state.docs.map((v,j)=>j<=2?j===i:v);
    else state.docs[i]=e.target.checked;
    if(i===2&&e.target.checked) state.docs=state.docs.map((v,j)=>j>2?false:v);
    renderFormControls();updateLive();
  }
});
document.addEventListener('input',e=>{ if(e.target.matches('[data-note]')) state.areas[+e.target.dataset.note].note=e.target.value; scheduleLiveUpdate(); });
form.addEventListener('input',scheduleLiveUpdate);
form.addEventListener('submit',e=>{e.preventDefault();updateLive();showToast(t().updated)});
document.querySelector('#reset-button').addEventListener('click',()=>{state=defaults();form.reset();applyTheme(state.theme)});

async function copyText(){ try{await navigator.clipboard.writeText(buildText(snapshot));showToast(t().copied)}catch{showToast(buildText(snapshot))} }
document.querySelectorAll('#copy-text-button,#copy-text-button-alt').forEach(el=>el.addEventListener('click',copyText));

// Word-wraps a parseMarkdown() block list, drawing bullets and bold/italic runs. Returns the new y.
function drawRichText(ctx,text,x,y,maxWidth,lineHeight,basePt,family,color){
  const blocks=parseMarkdown(text), bulletIndent=lineHeight*0.7;
  const fontFor=w=>`${w.italic?'italic ':''}${w.bold?'700 ':''}${basePt}px ${family}`;
  blocks.forEach(block=>{
    const words=[]; block.runs.forEach(r=>r.text.split(' ').filter(Boolean).forEach(word=>words.push({text:word,bold:r.bold,italic:r.italic})));
    const indent=block.type==='bullet'?bulletIndent:0;
    ctx.font=`${basePt}px ${family}`; const spaceWidth=ctx.measureText(' ').width;
    let line=[],lineWidth=0,first=true;
    const flush=()=>{
      ctx.fillStyle=color;
      if(block.type==='bullet'&&first) ctx.fillText('•',x,y);
      let cx=x+indent;
      line.forEach((w,i)=>{ ctx.font=fontFor(w); ctx.fillText(w.text,cx,y); cx+=ctx.measureText(w.text).width+(i<line.length-1?spaceWidth:0); });
      y+=lineHeight; first=false; line=[]; lineWidth=0;
    };
    words.forEach(w=>{
      ctx.font=fontFor(w); const ww=ctx.measureText(w.text).width, add=line.length?spaceWidth+ww:ww;
      if(line.length&&lineWidth+add>maxWidth-indent){ flush(); line=[w]; lineWidth=ww; }
      else { line.push(w); lineWidth+=add; }
    });
    if(line.length) flush();
    y+=lineHeight*0.35;
  });
  return y;
}

function drawPageFrame(ctx,w,h,tr,snapshot,title,logoImage,left=44,right=44){
  const th=activeTheme;
  const date=formatDate(snapshot.date,snapshot.lang);
  ctx.fillStyle=th.white;ctx.fillRect(0,0,w,h);ctx.strokeStyle=th.frame;ctx.lineWidth=th.frameWidth*2;ctx.strokeRect(2,2,w-4,h-4);
  if(th===themes.chair){
    const r=w*.215/16, barX=10*r, barW=(w-barX)/2;
    ctx.fillStyle='#8E8E8D';ctx.fillRect(barX,0,barW,3*r);ctx.fillStyle=th.accent;ctx.fillRect(barX+barW,0,barW,3*r);
    const logoH=4*r,logoW=logoH*(logoImage.naturalWidth/logoImage.naturalHeight);ctx.drawImage(logoImage,3*r,r,logoW,logoH);
    ctx.textAlign='right';ctx.fillStyle=th.ink;ctx.font=`700 14px ${th.fontCanvas}`;ctx.fillText(snapshot.lecturer,w-3*r,3.95*r);ctx.font=`700 11px ${th.fontCanvas}`;ctx.fillText(tr.subtitle.toUpperCase(),w-3*r,4.62*r);ctx.textAlign='left';
    ctx.fillStyle=th.accentDark;ctx.font=`700 17px ${th.fontCanvas}`;ctx.fillText(tr.formTitle.toUpperCase(),barX,146);
    ctx.fillStyle='#595958';ctx.font=`700 42px ${th.fontCanvas}`;ctx.fillText(title.slice(0,45),barX,194);
    ctx.textAlign='right';ctx.fillStyle=th.muted;ctx.font=`18px ${th.fontCanvas}`;ctx.fillText(snapshot.semester,w-3*r,132);ctx.fillText(date,w-3*r,158);ctx.textAlign='left';
  } else {
    ctx.fillStyle=th.accent;ctx.font=`700 22px ${th.fontCanvas}`;ctx.fillText(tr.formTitle.toUpperCase(),left,80);ctx.fillStyle=th.ink;ctx.font=`800 52px ${th.fontCanvas}`;ctx.fillText(title.slice(0,45),left,145);
    ctx.textAlign='right';ctx.fillStyle=th.muted;ctx.font=`24px ${th.fontCanvas}`;ctx.fillText(snapshot.lecturer,w-right,75);ctx.fillText(snapshot.semester,w-right,110);ctx.fillText(date,w-right,145);ctx.textAlign='left';ctx.fillStyle=th.accent;ctx.fillRect(left,175,w-left-right,5);
  }
}

function drawPage1(snapshot,tr,logoImage){
  const th=activeTheme;
  const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d'),w=1600,h=900;canvas.width=w;canvas.height=h;
  const cd=th===themes.chair,r=w*.215/16,left=cd?10*r:44,right=cd?3*r:44,gap=cd?30:70,colW=(w-left-right-gap)/2,rowTop=cd?225:250;
  drawPageFrame(ctx,w,h,tr,snapshot,snapshot.course,logoImage,left,right);
  ctx.font=`600 19px ${th.fontCanvas}`;snapshot.areas.forEach((a,i)=>{const col=i<6?0:1,row=i%6,x=left+col*(colW+gap),y=rowTop+row*68,s=statuses[a.status];ctx.fillStyle=th.line;ctx.fillRect(x,y+39,colW,1);ctx.fillStyle=th.ink;ctx.fillText(tr.areas[i].slice(0,50),x,y+27);ctx.fillStyle=s.color;ctx.fillRect(x+colW-40,y+3,36,36);ctx.fillStyle=s.fg;ctx.textAlign='center';ctx.font=`800 22px ${th.fontCanvas}`;ctx.fillText(s.glyph,x+colW-22,y+29);ctx.textAlign='left';ctx.font=`600 19px ${th.fontCanvas}`});
  const pngDocs=snapshot.docs.map((on,i)=>on?tr.docs[i]:null).filter(Boolean).join(' · ')||tr.noSelection;
  const contentW=w-left-right;ctx.fillStyle=th.soft;ctx.fillRect(left,710,contentW,72);ctx.fillStyle=th.ink;ctx.font=`800 17px ${th.fontCanvas}`;ctx.fillText(tr.documentation.toUpperCase(),left+20,740);ctx.font=`600 17px ${th.fontCanvas}`;ctx.fillText(pngDocs.slice(0,125),left+20,765);
  ctx.fillStyle=th.ink;ctx.fillRect(left,805,contentW,3);ctx.fillStyle=th.muted;ctx.font=`18px ${th.fontCanvas}`;ctx.fillText(`${statuses.allow.glyph} ${tr.status.allow}     ${statuses.limit.glyph} ${tr.status.limit}     ${statuses.deny.glyph} ${tr.status.deny}`,left,848);ctx.textAlign='right';ctx.fillText(tr.footer,w-right,848);ctx.textAlign='left';
  return canvas;
}

function drawPage2(snapshot,tr,logoImage){
  const th=activeTheme;
  const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d'),w=1600,h=900;canvas.width=w;canvas.height=h;
  const cd=th===themes.chair,r=w*.215/16,left=cd?10*r:44,right=cd?3*r:44,top=cd?225:250,gap=23,colW=(w-left-right-2*gap)/3;
  drawPageFrame(ctx,w,h,tr,snapshot,tr.notesHeading,logoImage,left,right);
  [[tr.examplesAllowed,snapshot.allowedExamples],[tr.examplesDenied,snapshot.forbiddenExamples],[tr.moreNotes,snapshot.notes]].forEach(([label,value],i)=>{
    const x=left+i*(colW+gap);
    if(i>0){ ctx.strokeStyle=th.line;ctx.setLineDash([2,3]);ctx.beginPath();ctx.moveTo(x-gap/2,top);ctx.lineTo(x-gap/2,780);ctx.stroke();ctx.setLineDash([]); }
    ctx.fillStyle=th.accent;ctx.font=`800 16px ${th.fontCanvas}`;ctx.fillText(label.toUpperCase(),x,top);
    if(value.trim()) drawRichText(ctx,value.trim(),x,top+30,colW,24,15,th.fontCanvas,th.ink);
  });
  ctx.fillStyle=th.ink;ctx.fillRect(left,805,w-left-right,3);ctx.fillStyle=th.muted;ctx.font=`18px ${th.fontCanvas}`;ctx.textAlign='right';ctx.fillText(tr.footer,w-right,848);ctx.textAlign='left';
  return canvas;
}

function downloadCanvas(canvas,filename){
  const link=document.createElement('a');link.download=filename;link.href=canvas.toDataURL('image/png');link.click();
}

document.querySelector('#png-button').addEventListener('click',async()=>{
  const tr=strings(snapshot.lang), slug=slugCourse(snapshot.course), multi=hasDetails(snapshot);
  const logoImage=document.querySelector('#ur-logo');
  if(activeTheme===themes.chair&&!logoImage.complete) await logoImage.decode();
  downloadCanvas(drawPage1(snapshot,tr,logoImage),`KI-Regeln-${slug}${multi?'-1':''}.png`);
  if(multi) setTimeout(()=>downloadCanvas(drawPage2(snapshot,tr,logoImage),`KI-Regeln-${slug}-2.png`),150);
  showToast(t().imageReady);
});

function hex(color){ let c=color.replace('#','').toUpperCase(); if(c.length===3) c=c.split('').map(ch=>ch+ch).join(''); return c; }

function addSlideHeader(slide,tr,s,date,title,left=.27,right=.27){
  const th=activeTheme;
  if(th===themes.chair){
    const r=.215/16*10,barX=10*r,barW=(10-barX)/2,logoH=4*r,logoW=logoH*1792/1328;
    slide.addImage({path:logoUrl,x:3*r,y:r,w:logoW,h:logoH});
    slide.addShape('rect',{x:barX,y:0,w:barW,h:3*r,fill:{color:'8E8E8D'},line:{type:'none'}});
    slide.addShape('rect',{x:barX+barW,y:0,w:barW,h:3*r,fill:{color:hex(th.accent)},line:{type:'none'}});
    slide.addText(s.lecturer,{x:barX+barW,y:3.7*r,w:barW-right,h:.14,fontSize:7.5,bold:true,color:'000000',align:'right',...font(th)});
    slide.addText(tr.subtitle.toUpperCase(),{x:barX+barW,y:4.75*r,w:barW-right,h:.13,fontSize:6.5,bold:true,color:'000000',align:'right',...font(th)});
    slide.addText(tr.formTitle.toUpperCase(),{x:barX,y:0.88,w:5.3,h:0.22,fontSize:8.5,bold:true,color:hex(th.accentDark),...font(th)});
    slide.addText(title.slice(0,60),{x:barX,y:1.08,w:5.3,h:0.48,fontSize:20,bold:true,color:'595958',...font(th)});
    slide.addText(`${s.semester}\n${date}`,{x:6.65,y:0.88,w:10-right-6.65,h:0.45,fontSize:8.5,color:hex(th.muted),align:'right',...font(th)});
  } else {
    slide.addText(tr.formTitle,{x:left,y:0.22,w:6,h:0.3,fontSize:11,bold:true,color:hex(th.accent),...font(th)});
    slide.addText(title.slice(0,60),{x:left,y:0.5,w:6.2,h:0.55,fontSize:26,bold:true,color:hex(th.ink),...font(th)});
    slide.addText(`${s.lecturer}\n${s.semester}\n${date}`,{x:6.6,y:0.2,w:10-right-6.6,h:0.7,fontSize:10,color:hex(th.muted),align:'right',...font(th)});
    slide.addShape('rect',{x:left,y:0.95,w:10-left-right,h:0.03,fill:{color:hex(th.accent)},line:{type:'none'}});
  }
}
function addSlideFooter(slide,tr,n,total){
  const th=activeTheme;
  const left=th===themes.chair?10*(.215/16*10):.27,right=th===themes.chair?3*(.215/16*10):.27,width=10-left-right;
  slide.addShape('rect',{x:left,y:5.32,w:width,h:0.02,fill:{color:hex(th.ink)},line:{type:'none'}});
  if(total>1) slide.addText(`${tr.pageLabel} ${n}/${total}`,{x:left,y:5.38,w:2,h:0.22,fontSize:8,color:hex(th.muted),...font(th)});
  slide.addText(tr.footer,{x:10-right-4,y:5.38,w:4,h:0.22,fontSize:7,color:hex(th.muted),align:'right',...font(th)});
}

// Converts a markdown subset (bullets, **bold**, *italic*) into PptxGenJS text-run objects
// with native bullet/bold/italic formatting, ready to pass as the `text` arg of addText().
function mdToPptxRuns(text,baseOptions){
  const blocks=parseMarkdown(text), runs=[];
  blocks.forEach(block=>{
    if(!block.runs.length){ runs.push({text:'',options:{...baseOptions,breakLine:true}}); return; }
    block.runs.forEach((r,ri)=>{
      const isLast=ri===block.runs.length-1;
      const options={...baseOptions,bold:!!r.bold,italic:!!r.italic,breakLine:isLast};
      if(ri===0&&block.type==='bullet') options.bullet={indent:14};
      runs.push({text:r.text,options});
    });
  });
  return runs;
}

function addPolicySlide(pres,tr,s,date,total){
  const th=activeTheme;
  const slide=pres.addSlide();
  const cd=th===themes.chair,r=.215/16*10,left=cd?10*r:.27,right=cd?3*r:.27,gap=cd?.3:.3,colW=(10-left-right-gap)/2;
  addSlideHeader(slide,tr,s,date,s.course,left,right);
  const columns=[s.areas.slice(0,6),s.areas.slice(6,12)];
  const names=[tr.areas.slice(0,6),tr.areas.slice(6,12)];
  columns.forEach((col,c)=>{
    const rows=col.map((a,i)=>{
      const st=statuses[a.status];
      return [
        {text:a.note?`${names[c][i]}\n${a.note}`:names[c][i],options:{fontSize:9,color:hex(th.ink),valign:'middle',...font(th)}},
        {text:st.glyph,options:{fontSize:12,bold:true,align:'center',valign:'middle',fill:{color:hex(st.color)},color:hex(st.fg),...font(th)}}
      ];
    });
    slide.addTable(rows,{x:left+c*(colW+gap),y:cd?1.65:1.15,w:colW,colW:[colW-.55,.55],border:{type:'solid',color:hex(th.line),pt:0.5},autoPage:false});
  });
  const docs=s.docs.map((on,i)=>on?tr.docs[i]:null).filter(Boolean).join(' · ')||tr.noSelection;
  const contentW=10-left-right;slide.addShape('rect',{x:left,y:4.55,w:contentW,h:0.6,fill:{color:hex(th.soft)},line:{type:'none'}});
  slide.addText(tr.documentation.toUpperCase(),{x:left+.15,y:4.6,w:contentW-.3,h:0.22,fontSize:9,bold:true,color:hex(th.ink),...font(th)});
  slide.addText(docs,{x:left+.15,y:4.83,w:contentW-.3,h:0.28,fontSize:9,color:hex(th.ink),...font(th)});
  const legend=['allow','limit','deny'].map(k=>`${statuses[k].glyph} ${tr.status[k]}`).join('     ');
  slide.addText(legend,{x:left,y:5.38,w:5,h:0.22,fontSize:8,color:hex(th.muted),...font(th)});
  addSlideFooter(slide,tr,1,total);
}

function addDetailSlide(pres,tr,s,date,total){
  const th=activeTheme;
  const slide=pres.addSlide();
  const cd=th===themes.chair,r=.215/16*10,left=cd?10*r:.27,right=cd?3*r:.27,top=cd?1.65:1.2,gap=.14,colW=(10-left-right-2*gap)/3,bodyH=3.4;
  addSlideHeader(slide,tr,s,date,tr.notesHeading,left,right);
  [[tr.examplesAllowed,s.allowedExamples],[tr.examplesDenied,s.forbiddenExamples],[tr.moreNotes,s.notes]].forEach(([label,value],i)=>{
    const x=left+i*(colW+gap);
    if(i>0) slide.addShape('line',{x:x-gap/2,y:top,w:0,h:bodyH,line:{color:hex(th.line),width:.75,dashType:'dash'}});
    slide.addText(label.toUpperCase(),{x,y:top,w:colW,h:0.26,fontSize:10,bold:true,color:hex(th.accent),...font(th)});
    if(value.trim()) slide.addText(mdToPptxRuns(value.trim(),{fontSize:10.5,color:hex(th.ink),...font(th)}),{x,y:top+0.3,w:colW,h:bodyH-0.3,valign:'top'});
  });
  addSlideFooter(slide,tr,2,total);
}

document.querySelector('#pptx-button').addEventListener('click',()=>{
  const tr=strings(snapshot.lang);
  const date=formatDate(snapshot.date,snapshot.lang);
  const total=hasDetails(snapshot)?2:1;
  const pres=new PptxGenJS();
  pres.defineLayout({name:'KIB169',width:10,height:5.625});
  pres.layout='KIB169';
  addPolicySlide(pres,tr,snapshot,date,total);
  if(total>1) addDetailSlide(pres,tr,snapshot,date,total);
  pres.writeFile({fileName:`KI-Regeln-${slugCourse(snapshot.course)}.pptx`});
  showToast(t().pptxReady);
});

applyTheme(state.theme);
