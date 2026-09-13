const root = document.getElementById('result');
const app = document.body.dataset.app;
function element(tag, text, parent = root, cls) {
  const node = document.createElement(tag); if (text != null) node.textContent = text;
  if (cls) node.className = cls; parent.append(node); return node;
}
function metric(label, value, parent) { const card = element('div', null, parent, 'card'); element('span', value, card, 'number'); element('span', label, card); }
function details(label, data) { const d = element('details'); element('summary', label, d); element('pre', typeof data === 'string' ? data : JSON.stringify(data, null, 2), d); }
function list(title, values) { element('h2', title); const ul = element('ul'); for (const v of values) element('li', v, ul); }
const money = value => new Intl.NumberFormat('en-US', {style:'currency', currency:'USD', maximumFractionDigits:0}).format(value);
async function show() {
  if (app === 'visionlog') {
    root.replaceChildren(); const video = element('video'); video.src='../assets/visionlog-tracking-v3.mp4'; video.poster='../assets/visionlog-tracking-v3.webp'; video.controls=true; video.playsInline=true; video.muted=true; video.preload='auto';
    list('What to inspect', ['IDs start at 1 and 2; the next two entrants receive 3 and 4.', 'The count and boxes are encoded into the same frame, so they stay synchronized.', 'This reviewed segment demonstrates one successful case. Longer occluded continuations remain under evaluation.']);
    const a=element('a','Inspect per-frame detections ↗'); a.href='../assets/visionlog-tracking-v3.json'; return;
  }
  const response = await fetch(`data/${app}.json`); if (!response.ok) throw new Error('Recorded example unavailable'); const data=await response.json();
  root.replaceChildren(); element('p', data.execution);
  if (app === 'credagent') {
    const controls=element('div'); const panel=element('div');
    function select(index) {
      panel.replaceChildren(); controls.querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));
      const example=data.examples[index], r=example.result; const cards=element('div',null,panel,'cards');
      metric('Recorded decision',r.final_decision || 'AWAITING REVIEW',cards); metric('Uncalibrated risk score',`${(r.risk_probability*100).toFixed(1)}%`,cards);
      element('h2','Decision reasoning',panel); element('p',r.decision_reasoning || 'Human review is required before the graph can finish.',panel);
      element('h2','Model factors',panel); const ul=element('ul',null,panel); for(const factor of r.top_risk_factors || [])element('li',factor,ul);
      element('p',`Recorded provider: ${[...new Set((example.llm_calls || []).map(c=>c.provider))].join(', ') || 'See audit record'}`,panel);
    }
    data.examples.forEach((e,i)=>{ const b=element('button',e.name,controls); b.onclick=()=>select(i); }); select(0);
    element('p','These example decisions and notices require qualified human review. The model score is not a calibrated default probability.');
    details('Evaluation: full history versus available form inputs',data.metadata); details('Inspect inputs, policy excerpts and audit records',data.examples);
  } else if(app==='fraudpulse') {
    const cards=element('div',null,root,'cards'); metric('Final-test PR-AUC',data.metadata.pr_auc,cards); metric('Precision at validation-selected threshold',`${(data.metadata.precision_at_flag*100).toFixed(1)}%`,cards); metric('Recall at that threshold',`${(data.metadata.recall_at_flag*100).toFixed(1)}%`,cards);
    element('p','A stratified 60/20/20 split separates training, validation and final testing. These example transactions illustrate decisions; they are not a new evaluation dataset.');
    const feed=element('div',null,root,'cards'); data.results.forEach(row=>{const c=element('div',null,feed,'card');element('h2',row.result.decision,c);element('p',`${money(row.amount)} · risk score ${(row.result.fraud_probability*100).toFixed(1)}%`,c);element('p',`Anomaly score ${row.result.anomaly_score}`,c);}); details('Model card and split protocol',data.metadata);
  } else {
    const r=data.result, cards=element('div',null,root,'cards'); metric('Recorded status',r.status,cards);metric('Planned equipment',money(r.budget.subtotal_usd),cards);metric('Violations requiring review',r.violations,cards);
    element('h2','Request',root);element('p',data.request.request);element('p','This recording uses a representative catalog and local retrieval with real Groq reasoning. It is not evidence that the public backend uses the same configuration. No order was placed.');
    list('Findings that need attention',r.findings.filter(f=>f.verdict!=='PASS').map(f=>`${f.verdict} · ${f.name}: ${f.rationale}`));
    details('Citations and evidence',r.findings);details('Agent trace and provider measurements',{trace:r.trace,metrics:r.metrics});details('Equipment and budget',{cart:r.cart,budget:r.budget});
  }
  const a=element('a','Download the recorded data ↗');a.href=`data/${app}.json`;
}
show().catch(()=>{root.replaceChildren();element('p','The example could not load. Use the build-log link below or open the interactive app.');});
