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
    strings:{ de:{subtitle:'Lehrveranstaltung', footer:'Kursregeln haben Vorrang vor der allgemeinen KI-Richtlinie.'},
              en:{subtitle:'Course', footer:'Course rules take priority over the general AI guidelines.'} }
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
    strings:{ de:{subtitle:'Lehrstuhl für Medieninformatik', footer:'Kursregeln haben Vorrang · Lehrstuhl für Medieninformatik'},
              en:{subtitle:'Chair of Media Informatics', footer:'Course rules take priority · Chair of Media Informatics'} }
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
    formTitle:'Kursregeln zur KI-Nutzung', intro:'Konkretisieren Sie die allgemeine KI-Richtlinie für Ihre Lehrveranstaltung. Die kommunizierten Kursregeln haben Vorrang.', meta:'Kursdaten', areasHeading:'Nutzungsregeln nach Anwendungsfeld', areasHint:'Legen Sie für jedes Anwendungsfeld fest, ob die Nutzung erlaubt ist, eine ausdrückliche Erlaubnis erfordert oder nicht erlaubt ist.', docsRequirementHeading:'Angabe der KI-Nutzung', docsProofHeading:'Inhalt der Angabe', notesHeading:'Beispiele & Hinweise', notesOptional:'Optional – nur bei zusätzlichem Erklärungsbedarf', preview:'Vorschau', ready:'Fertig für Ihre Folien', reset:'Zurücksetzen', generate:'Vorschau bestätigen', live:'Live-Vorschau aktiv', updated:'Vorschau ist aktuell', download:'PNG herunterladen', pptx:'PPTX herunterladen', copy:'Text kopieren', copied:'Text kopiert', imageReady:'PNG wurde erstellt', pptxReady:'PPTX wurde erstellt', error:'Export fehlgeschlagen', visual:'Ampel', text:'Text', pageLabel:'Seite',
    fields:{course:'Kurs / Modul',lecturer:'Dozierende',semester:'Semester',date:'Stand',allowedExamples:'Beispiele erlaubter Nutzung',forbiddenExamples:'Beispiele nicht erlaubter Nutzung',notes:'Weitere Hinweise'},
    status:{allow:'Erlaubt',limit:'Ausdrückliche Erlaubnis nötig',deny:'Nicht erlaubt'},
    areas:['Literaturrecherche','Texte lesen & zusammenfassen','Brainstorming & Sparringpartner','Texte überarbeiten','Lernhilfe & Prüfungsvorbereitung','Texte schreiben (Abschnitte / Kapitel)','Programmieren: Erklärung & Fehlersuche','Programmieren: wesentliche Lösungsteile','Studien- & Forschungsplanung','Datenanalyse & Auswertung','Bildgenerierung','Präsentationserstellung'],
    docs:['Angabe gemäß allgemeiner KI-Richtlinie','Kurze Angabe der KI-Nutzung genügt','Keine Angabe erforderlich','Werkzeug / Modell und Zweck nennen','Betroffene Arbeitsschritte und konkreten Beitrag nennen','Vollständige Prompts oder Chatverläufe beifügen'],
    notePlaceholder:'Bedingung / Anmerkung (optional)', documentation:'Angabe der KI-Nutzung', examplesAllowed:'Beispiele erlaubter Nutzung', examplesDenied:'Beispiele nicht erlaubter Nutzung', moreNotes:'Weitere Hinweise', guidelinesNotice:'Allgemeine KI-Richtlinie beachten',
    views:{instructor:'Lehrende',student:'Studierende'},
    student:{eyebrow:'Angabe erstellen',title:'KI-Nutzung offenlegen',intro:'Erstellen Sie eine kurze, nachvollziehbare Angabe für Ihre Abgabe. Maßgeblich bleiben die Regeln Ihres Kurses.',contextHeading:'Kontext',course:'Kurs / Abgabe (optional)',coursePlaceholder:'z. B. Bachelorseminar – Hausarbeit',useHeading:'Ihre KI-Nutzung',tool:'Werkzeug oder Modell',toolPlaceholder:'z. B. ChatGPT (GPT-5)',purpose:'Zweck der Nutzung',purposePlaceholder:'z. B. Suchbegriffe für die Literaturrecherche entwickeln',parts:'Betroffene Arbeitsschritte oder Teile',partsPlaceholder:'z. B. Literaturrecherche und sprachliche Überarbeitung der Einleitung',scope:'Ungefährer Umfang',scopePlaceholder:'z. B. drei Suchanfragen und zwei selbst verfasste Absätze',generate:'Angabe aktualisieren',live:'Live-Vorschau aktiv',preview:'Ihre Angabe',previewTitle:'Zum Einfügen in Ihre Abgabe',empty:'Füllen Sie die vier Felder aus. Ihre Angabe entsteht hier automatisch.',copy:'Angabe kopieren',copied:'Angabe kopiert',guidance:'Prüfen Sie vor der Abgabe, ob Ihr Kurs eine andere oder ausführlichere Dokumentation verlangt.'}
  },
  en: {
    formTitle:'Course rules for AI use', intro:'Specify the general AI guidelines for your course. Communicated course rules take priority.', meta:'Course details', areasHeading:'Rules by area of use', areasHint:'For each area, decide whether AI use is allowed, requires explicit permission, or is not allowed.', docsRequirementHeading:'Disclosure of AI use', docsProofHeading:'Content of the disclosure', notesHeading:'Examples & notes', notesOptional:'Optional – only when additional explanation is useful', preview:'Preview', ready:'Ready for your slides', reset:'Reset', generate:'Confirm preview', live:'Live preview active', updated:'Preview is up to date', download:'Download PNG', pptx:'Download PPTX', copy:'Copy text', copied:'Text copied', imageReady:'PNG created', pptxReady:'PPTX created', error:'Export failed', visual:'Signal', text:'Text', pageLabel:'Page',
    fields:{course:'Course / module',lecturer:'Teaching staff',semester:'Semester',date:'Valid as of',allowedExamples:'Examples of permitted use',forbiddenExamples:'Examples of non-permitted use',notes:'Additional notes'},
    status:{allow:'Allowed',limit:'Explicit permission required',deny:'Not allowed'},
    areas:['Literature search','Reading & summarising texts','Brainstorming & sparring partner','Editing texts','Learning support & exam preparation','Writing texts (sections / chapters)','Programming: explanation & debugging','Programming: substantial solution parts','Study & research planning','Data analysis & evaluation','Image generation','Presentation creation'],
    docs:['Disclosure per the general AI guidelines','A short disclosure of AI use suffices','No disclosure required','Name the tool / model and purpose','Name the affected steps and specific contribution','Attach complete prompts or chat logs'],
    notePlaceholder:'Condition / note (optional)', documentation:'Disclosure of AI use', examplesAllowed:'Examples of permitted use', examplesDenied:'Examples of non-permitted use', moreNotes:'Additional notes', guidelinesNotice:'Follow the general AI guidelines',
    views:{instructor:'Teaching staff',student:'Students'},
    student:{eyebrow:'Create disclosure',title:'Disclose your AI use',intro:'Create a short, transparent disclosure for your submission. The rules of your course remain authoritative.',contextHeading:'Context',course:'Course / submission (optional)',coursePlaceholder:'e.g. Bachelor seminar – term paper',useHeading:'Your AI use',tool:'Tool or model',toolPlaceholder:'e.g. ChatGPT (GPT-5)',purpose:'Purpose of use',purposePlaceholder:'e.g. develop search terms for the literature review',parts:'Affected steps or parts',partsPlaceholder:'e.g. literature search and language editing of the introduction',scope:'Approximate extent',scopePlaceholder:'e.g. three search queries and two self-written paragraphs',generate:'Update disclosure',live:'Live preview active',preview:'Your disclosure',previewTitle:'Ready to paste into your submission',empty:'Complete the four fields. Your disclosure will appear here automatically.',copy:'Copy disclosure',copied:'Disclosure copied',guidance:'Before submitting, check whether your course requires a different or more detailed form of documentation.'}
  }
};

const defaults = (lang = 'de', theme = 'neutral') => ({
  lang,
  theme,
  areas:['allow','allow','allow','limit','allow','deny','limit','deny','limit','limit','deny','allow'].map((status, i) => ({status,note:i===3?(lang==='de'?'Nur Grammatik & Stil, keine neuen Inhalte':'Grammar & style only, no new content'):''})),
  docs:[true,false,false,true,true,false]
});
let state = defaults();
let snapshot = null;
let activeView = 'instructor';
const form = document.querySelector('#builder-form');
const studentForm = document.querySelector('#student-form');

function t(){ return strings(state.lang); }
function cssStatus(status){ const s=statuses[status]; return `--status-color:${s.color};--status-fg:${s.fg}`; }
function hasDetails(s){ return !!(s.allowedExamples.trim()||s.forbiddenExamples.trim()||s.notes.trim()); }
function slugCourse(course){ return course.replace(/[^a-z0-9]+/gi,'-')||'Kurs'; }
const logoUrl=`${import.meta.env.BASE_URL}assets/images/UR-Logo-Bildmarke-RGB.png`;
const guidelinesUrl='https://www.uni-regensburg.de/informatik-data-science/fakultaet/einrichtungen/medieninformatik/studium/ki-richtlinien';

function renderFormControls(){
  const tr=t();
  document.documentElement.lang=state.lang;
  document.querySelector('#brand-subtitle').textContent=tr.subtitle;
  document.querySelector('#form-title').textContent=tr.formTitle;
  document.querySelector('#form-intro').textContent=tr.intro;
  document.querySelector('#meta-heading').textContent=tr.meta;
  document.querySelector('#areas-heading').textContent=tr.areasHeading;
  document.querySelector('#areas-hint').textContent=tr.areasHint;
  document.querySelector('#docs-requirement-heading').textContent=tr.docsRequirementHeading;
  document.querySelector('#docs-proof-heading').textContent=tr.docsProofHeading;
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
  document.querySelectorAll('[data-lang]').forEach(el=>{
    const isActive=el.dataset.lang===state.lang;
    el.classList.toggle('active',isActive);
    el.setAttribute('aria-pressed',isActive?'true':'false');
  });
  document.querySelector('#theme-switch').innerHTML=Object.keys(themes).map(id=>{
    const isActive=state.theme===id;
    return `<button type="button" data-theme="${id}" class="${isActive?'active':''}" aria-pressed="${isActive?'true':'false'}">${themes[id].label[state.lang]}</button>`;
  }).join('');
  document.querySelector('[data-tab="visual"]').textContent=tr.visual;
  document.querySelector('[data-tab="text"]').textContent=tr.text;
  document.querySelectorAll('[data-view]').forEach(el=>{
    const isActive=el.dataset.view===activeView;
    el.textContent=tr.views[el.dataset.view];
    el.classList.toggle('active',isActive);
    el.setAttribute('aria-pressed',isActive?'true':'false');
  });
  renderStudentControls();

  document.querySelector('#area-options').innerHTML=tr.areas.map((name,i)=>{
    const a=state.areas[i];
    const noteField=a.status==='limit'?`<input class="area-note" data-note="${i}" value="${escapeHtml(a.note)}" placeholder="${tr.notePlaceholder}" aria-label="${name}: ${tr.notePlaceholder}">`:'';
    return `<div class="area-row"><span class="area-name">${name}</span><div class="status-picker" role="group" aria-label="${name}">${['allow','limit','deny'].map(status=>`<button type="button" class="status-button ${a.status===status?'active':''}" data-area="${i}" data-status="${status}" title="${tr.status[status]}" aria-label="${name}: ${tr.status[status]}" aria-pressed="${a.status===status?'true':'false'}" style="${cssStatus(status)}">${statuses[status].glyph}</button>`).join('')}</div>${noteField}</div>`;
  }).join('');
  document.querySelector('#documentation-requirement-options').innerHTML=tr.docs.slice(0,3).map((label,i)=>`<label class="check-option"><input type="checkbox" data-doc="${i}" ${state.docs[i]?'checked':''}><span>${label}</span></label>`).join('');
  document.querySelector('#documentation-proof-options').innerHTML=tr.docs.slice(3).map((label,j)=>{const i=j+3;return `<label class="check-option ${state.docs[2]?'disabled':''}"><input type="checkbox" data-doc="${i}" ${state.docs[i]?'checked':''} ${state.docs[2]?'disabled':''}><span>${label}</span></label>`}).join('');
}

function renderStudentControls(){
  const tr=t().student;
  const text={
    '#student-eyebrow':tr.eyebrow,'#student-title':tr.title,'#student-intro':tr.intro,
    '#student-context-heading':tr.contextHeading,'#student-course-label':tr.course,
    '#student-use-heading':tr.useHeading,'#student-tool-label':tr.tool,
    '#student-purpose-label':tr.purpose,'#student-parts-label':tr.parts,
    '#student-scope-label':tr.scope,'#student-generate-button':tr.generate,
    '#student-live-note':tr.live,'#student-preview-eyebrow':tr.preview,
    '#student-preview-title':tr.previewTitle,'#student-copy-button':tr.copy,
    '#student-guidance':tr.guidance
  };
  Object.entries(text).forEach(([selector,value])=>{ document.querySelector(selector).textContent=value; });
  const placeholders={
    '#student-course':tr.coursePlaceholder,'#student-tool':tr.toolPlaceholder,
    '#student-purpose':tr.purposePlaceholder,'#student-parts':tr.partsPlaceholder,
    '#student-scope':tr.scopePlaceholder
  };
  Object.entries(placeholders).forEach(([selector,value])=>{ document.querySelector(selector).placeholder=value; });
}

function cleanSentencePart(value=''){
  return value.trim().replace(/[.!?]+$/,'');
}

function getStudentData(){
  const data=new FormData(studentForm);
  return {course:cleanSentencePart(data.get('studentCourse')||''),tool:cleanSentencePart(data.get('studentTool')||''),purpose:cleanSentencePart(data.get('studentPurpose')||''),parts:cleanSentencePart(data.get('studentParts')||''),scope:cleanSentencePart(data.get('studentScope')||'')};
}

function buildStudentDisclosure(data){
  if(!data.tool||!data.purpose||!data.parts||!data.scope) return '';
  if(state.lang==='en'){
    const context=data.course?` for “${data.course}”`:'';
    return `In preparing this submission${context}, ${data.tool} was used for the following purpose: ${data.purpose}. The use concerned ${data.parts} and covered approximately ${data.scope}.`;
  }
  const context=data.course?` für „${data.course}“`:'';
  return `Bei der Erstellung dieser Abgabe${context} wurde ${data.tool} für folgenden Zweck eingesetzt: ${data.purpose}. Die Nutzung betraf ${data.parts} und umfasste ungefähr ${data.scope}.`;
}

function renderStudentOutput(){
  const tr=t().student, data=getStudentData(), disclosure=buildStudentDisclosure(data);
  const context=document.querySelector('#student-output-context');
  context.textContent=data.course;
  context.hidden=!data.course;
  document.querySelector('#student-output').textContent=disclosure||tr.empty;
  document.querySelector('#student-copy-button').disabled=!disclosure;
}

function switchView(view){
  activeView=view==='student'?'student':'instructor';
  document.querySelector('#instructor-view').hidden=activeView!=='instructor';
  document.querySelector('#student-view').hidden=activeView!=='student';
  renderFormControls();
  if(activeView==='student') document.querySelector('#student-tool').focus();
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
  const docsMarkup=selectedDocs.length?selectedDocs.map(label=>`<span class="doc-chip">✓ ${label}</span>`).join(''):`<a class="doc-chip link" href="${guidelinesUrl}" target="_blank" rel="noopener">${tr.guidelinesNotice}</a>`;
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
  lines.push('',`${tr.documentation}: ${docs.length?docs.join('; '):`${tr.guidelinesNotice} (${guidelinesUrl})`}`);
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
  if(status){ const idx=+status.dataset.area; state.areas[idx].status=status.dataset.status; if(state.areas[idx].status!=='limit') state.areas[idx].note=''; renderFormControls(); updateLive(); }
  const lang=e.target.closest('[data-lang]');
  if(lang){
    const prevLang=state.lang;
    state.lang=lang.dataset.lang;
    if(prevLang==='de'&&state.lang==='en'&&state.areas[3]?.note==='Nur Grammatik & Stil, keine neuen Inhalte'){
      state.areas[3].note='Grammar & style only, no new content';
    } else if(prevLang==='en'&&state.lang==='de'&&state.areas[3]?.note==='Grammar & style only, no new content'){
      state.areas[3].note='Nur Grammatik & Stil, keine neuen Inhalte';
    }
    renderFormControls(); snapshot=getFormData(); renderOutput(); renderStudentOutput();
  }
  const view=e.target.closest('[data-view]');
  if(view) switchView(view.dataset.view);
  const theme=e.target.closest('button[data-theme]');
  if(theme){ state.theme=theme.dataset.theme; applyTheme(state.theme); }
  const tab=e.target.closest('[data-tab]');
  if(tab){
    document.querySelectorAll('[data-tab]').forEach(x=>{
      const isActive=x===tab;
      x.classList.toggle('active',isActive);
      x.setAttribute('aria-selected',isActive?'true':'false');
    });
    document.querySelectorAll('.tab-pane').forEach(x=>x.classList.toggle('active',x.id===`${tab.dataset.tab}-pane`));
  }
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
document.querySelector('#reset-button').addEventListener('click',()=>{
  if(activeView==='student'){
    studentForm.reset();
    renderStudentOutput();
    document.querySelector('#student-tool').focus();
    return;
  }
  state=defaults(state.lang,state.theme);
  form.reset();
  const dInput=form.querySelector('input[name="date"]');
  if(dInput) dInput.value=new Date().toISOString().slice(0,10);
  applyTheme(state.theme);
});

studentForm.addEventListener('input',renderStudentOutput);
studentForm.addEventListener('submit',e=>{
  e.preventDefault();
  renderStudentOutput();
  const firstInvalid=studentForm.querySelector(':invalid');
  if(firstInvalid) firstInvalid.focus();
});
document.querySelector('#student-copy-button').addEventListener('click',async()=>{
  const disclosure=buildStudentDisclosure(getStudentData());
  if(!disclosure) return;
  try {
    await navigator.clipboard.writeText(disclosure);
    showStudentToast(t().student.copied);
  } catch {
    showStudentToast(disclosure);
  }
});

function showStudentToast(message){
  const el=document.querySelector('#student-toast');
  el.textContent=message;
  clearTimeout(showStudentToast.timer);
  showStudentToast.timer=setTimeout(()=>{el.textContent='';},2500);
}

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

function truncateText(ctx,text,maxWidth){
  if(ctx.measureText(text).width<=maxWidth) return text;
  let t=text;
  while(t.length>0&&ctx.measureText(t+'…').width>maxWidth){
    t=t.slice(0,-1);
  }
  return t?t+'…':'';
}

function drawPage1(snapshot,tr,logoImage){
  const th=activeTheme;
  const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d'),w=1600,h=900;canvas.width=w;canvas.height=h;
  const cd=th===themes.chair,r=w*.215/16,left=cd?10*r:44,right=cd?3*r:44,gap=cd?30:70,colW=(w-left-right-gap)/2,rowTop=cd?225:250;
  const total=hasDetails(snapshot)?2:1;
  drawPageFrame(ctx,w,h,tr,snapshot,snapshot.course,logoImage,left,right);
  const maxTextW=colW-52;
  snapshot.areas.forEach((a,i)=>{
    const col=i<6?0:1,row=i%6,x=left+col*(colW+gap),y=rowTop+row*68,s=statuses[a.status];
    ctx.fillStyle=th.line;
    ctx.fillRect(x,y+42,colW,1);
    if(a.note&&a.note.trim()){
      ctx.fillStyle=th.ink;
      ctx.font=`600 16px ${th.fontCanvas}`;
      ctx.fillText(truncateText(ctx,tr.areas[i],maxTextW),x,y+20);
      ctx.fillStyle=th.muted;
      ctx.font=`13px ${th.fontCanvas}`;
      ctx.fillText(truncateText(ctx,a.note.trim(),maxTextW),x,y+36);
    } else {
      ctx.fillStyle=th.ink;
      ctx.font=`600 18px ${th.fontCanvas}`;
      ctx.fillText(truncateText(ctx,tr.areas[i],maxTextW),x,y+27);
    }
    ctx.fillStyle=s.color;
    ctx.fillRect(x+colW-40,y+3,36,36);
    ctx.fillStyle=s.fg;
    ctx.textAlign='center';
    ctx.font=`800 22px ${th.fontCanvas}`;
    ctx.fillText(s.glyph,x+colW-22,y+29);
    ctx.textAlign='left';
  });
  const pngDocs=snapshot.docs.map((on,i)=>on?tr.docs[i]:null).filter(Boolean).join(' · ')||`${tr.guidelinesNotice}: ${guidelinesUrl}`;
  const contentW=w-left-right;
  ctx.fillStyle=th.soft;
  ctx.fillRect(left,710,contentW,72);
  ctx.fillStyle=th.ink;
  ctx.font=`800 17px ${th.fontCanvas}`;
  ctx.fillText(tr.documentation.toUpperCase(),left+20,740);
  ctx.font=`600 17px ${th.fontCanvas}`;
  ctx.fillText(pngDocs.slice(0,125),left+20,765);
  ctx.fillStyle=th.ink;
  ctx.fillRect(left,805,contentW,3);
  ctx.fillStyle=th.muted;
  ctx.font=`18px ${th.fontCanvas}`;
  ctx.fillText(`${statuses.allow.glyph} ${tr.status.allow}     ${statuses.limit.glyph} ${tr.status.limit}     ${statuses.deny.glyph} ${tr.status.deny}`,left,848);
  if(total>1){
    ctx.fillText(`${tr.pageLabel} 1/${total}`,left+(contentW/2)-30,848);
  }
  ctx.textAlign='right';
  ctx.fillText(tr.footer,w-right,848);
  ctx.textAlign='left';
  return canvas;
}

function drawPage2(snapshot,tr,logoImage){
  const th=activeTheme;
  const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d'),w=1600,h=900;canvas.width=w;canvas.height=h;
  const cd=th===themes.chair,r=w*.215/16,left=cd?10*r:44,right=cd?3*r:44,top=cd?225:250,gap=23,colW=(w-left-right-2*gap)/3;
  const total=hasDetails(snapshot)?2:1;
  drawPageFrame(ctx,w,h,tr,snapshot,tr.notesHeading,logoImage,left,right);
  [[tr.examplesAllowed,snapshot.allowedExamples],[tr.examplesDenied,snapshot.forbiddenExamples],[tr.moreNotes,snapshot.notes]].forEach(([label,value],i)=>{
    const x=left+i*(colW+gap);
    if(i>0){ ctx.strokeStyle=th.line;ctx.setLineDash([2,3]);ctx.beginPath();ctx.moveTo(x-gap/2,top);ctx.lineTo(x-gap/2,780);ctx.stroke();ctx.setLineDash([]); }
    ctx.fillStyle=th.accent;ctx.font=`800 16px ${th.fontCanvas}`;ctx.fillText(label.toUpperCase(),x,top);
    if(value.trim()) drawRichText(ctx,value.trim(),x,top+30,colW,24,15,th.fontCanvas,th.ink);
  });
  ctx.fillStyle=th.ink;ctx.fillRect(left,805,w-left-right,3);
  ctx.fillStyle=th.muted;ctx.font=`18px ${th.fontCanvas}`;
  if(total>1){
    ctx.fillText(`${tr.pageLabel} 2/${total}`,left,848);
  }
  ctx.textAlign='right';ctx.fillText(tr.footer,w-right,848);ctx.textAlign='left';
  return canvas;
}

function downloadCanvas(canvas,filename){
  const link=document.createElement('a');link.download=filename;link.href=canvas.toDataURL('image/png');link.click();
}

document.querySelector('#png-button').addEventListener('click',async()=>{
  try {
    const tr=strings(snapshot.lang), slug=slugCourse(snapshot.course), multi=hasDetails(snapshot);
    const logoImage=document.querySelector('#ur-logo');
    if(activeTheme===themes.chair&&!logoImage.complete) await logoImage.decode().catch(()=>{});
    downloadCanvas(drawPage1(snapshot,tr,logoImage),`KI-Regeln-${slug}${multi?'-1':''}.png`);
    if(multi) setTimeout(()=>downloadCanvas(drawPage2(snapshot,tr,logoImage),`KI-Regeln-${slug}-2.png`),250);
    showToast(t().imageReady);
  } catch(err) {
    console.error('PNG export error:', err);
    showToast(t().error);
  }
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
      const cellText=a.note&&a.note.trim()
        ?[
          {text:names[c][i],options:{fontSize:8.5,color:hex(th.ink),breakLine:true,...font(th)}},
          {text:a.note.trim(),options:{fontSize:7,color:hex(th.muted),...font(th)}}
        ]
        :names[c][i];
      return [
        {text:cellText,options:{fontSize:9,color:hex(th.ink),valign:'middle',...font(th)}},
        {text:st.glyph,options:{fontSize:12,bold:true,align:'center',valign:'middle',fill:{color:hex(st.color)},color:hex(st.fg),...font(th)}}
      ];
    });
    slide.addTable(rows,{x:left+c*(colW+gap),y:cd?1.65:1.15,w:colW,colW:[colW-.55,.55],border:{type:'solid',color:hex(th.line),pt:0.5},autoPage:false});
  });
  const docsSelected=s.docs.map((on,i)=>on?tr.docs[i]:null).filter(Boolean);
  const contentW=10-left-right;slide.addShape('rect',{x:left,y:4.55,w:contentW,h:0.6,fill:{color:hex(th.soft)},line:{type:'none'}});
  slide.addText(tr.documentation.toUpperCase(),{x:left+.15,y:4.6,w:contentW-.3,h:0.22,fontSize:9,bold:true,color:hex(th.ink),...font(th)});
  if(docsSelected.length){
    slide.addText(docsSelected.join(' · '),{x:left+.15,y:4.83,w:contentW-.3,h:0.28,fontSize:9,color:hex(th.ink),...font(th)});
  } else {
    slide.addText([{text:tr.guidelinesNotice,options:{hyperlink:{url:guidelinesUrl},color:hex(th.accent),fontSize:9,...font(th)}}],{x:left+.15,y:4.83,w:contentW-.3,h:0.28});
  }
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

document.querySelector('#pptx-button').addEventListener('click',async()=>{
  try {
    if(typeof PptxGenJS==='undefined'){
      throw new Error('PptxGenJS is not available');
    }
    const tr=strings(snapshot.lang);
    const date=formatDate(snapshot.date,snapshot.lang);
    const total=hasDetails(snapshot)?2:1;
    const pres=new PptxGenJS();
    pres.defineLayout({name:'KIB169',width:10,height:5.625});
    pres.layout='KIB169';
    addPolicySlide(pres,tr,snapshot,date,total);
    if(total>1) addDetailSlide(pres,tr,snapshot,date,total);
    await pres.writeFile({fileName:`KI-Regeln-${slugCourse(snapshot.course)}.pptx`});
    showToast(t().pptxReady);
  } catch(err) {
    console.error('PPTX export error:', err);
    showToast(t().error);
  }
});

const dateInput=form.querySelector('input[name="date"]');
if(dateInput&&!dateInput.value){
  dateInput.value=new Date().toISOString().slice(0,10);
}

applyTheme(state.theme);
renderStudentOutput();
