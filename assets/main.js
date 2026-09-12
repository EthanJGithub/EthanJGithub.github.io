(() => {
  'use strict';
  const menu = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#nav-links');
  const closeMenu = () => { menu.setAttribute('aria-expanded', 'false'); navigation.classList.remove('is-open'); };
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('is-open', open); });
  navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
  const projects = {
    vision: { category: '01 / COMPUTER VISION', heading: 'Pixels to<br>understanding.', description: 'Browser-native object detection with YOLO26 and WebGPU. Track objects, log detections, and ask your data questions in plain English.', metric: 'YOLO26', label: 'INFERENCE IN YOUR BROWSER', caption: 'RECORDED MODEL OUTPUT / YOLO26M', demo: 'https://vision-log-lilac.vercel.app', alt: 'Illustrative computer vision pipeline with tracked objects' },
    credit: { category: '02 / AGENTIC AI', heading: 'Decisions with<br>a paper trail.', description: 'Five agents take a loan from ingestion to audit. Policy retrieval, SHAP explanations, and human checkpoints make each decision traceable.', metric: '0.76', label: 'RISK MODEL ROC-AUC', caption: 'INGESTION → RISK → POLICY → DECISION → AUDIT', demo: 'https://ethanjgithub-credagent-streamlit-app-kruhoy.streamlit.app/', alt: 'Illustrative five-agent credit underwriting pipeline' },
    sentinel: { category: '04 / SENIOR HEALTHCARE', heading: 'Better sourcing.<br>Accountable decisions.', description: 'A senior-care procurement copilot that sources equipment, checks compliance with citations, reconciles the budget, and routes plans for human approval.', metric: '5 stages', label: 'PROCUREMENT WITH HUMAN APPROVAL', caption: 'PLAN → SOURCE → COMPLIANCE → BUDGET → AUDIT', demo: 'https://sentinel-console-gamma.vercel.app', alt: 'Illustrative senior-care procurement pipeline ending in human approval' },
    fraud: { category: '03 / MACHINE LEARNING', heading: 'Find the signal.<br>Catch the anomaly.', description: 'XGBoost and IsolationForest work together to identify known and novel fraud, with a scoring API, stream simulator, and operations dashboard.', metric: '0.88', label: 'PR-AUC AT 0.17% FRAUD RATE', caption: 'TRANSACTIONS → SCORING → ANOMALY SIGNALS', demo: 'https://fraud-pulse.vercel.app', alt: 'Illustrative transaction stream with highlighted anomaly signals' }
  };
  let selected = 'vision';
  const video = document.querySelector('#detection-video');
  video.controls = false;
  let detectionFrames = [];
  fetch('assets/visionlog-tracking-v2.json').then(r => r.json()).then(data => { detectionFrames = data.frames; updateFrame(video.currentTime); }).catch(() => {});
  function updateFrame(time) { const record = detectionFrames[Math.min(detectionFrames.length - 1, Math.floor((time + .00001) * 10))]; if (record) document.querySelector('#frame-count').textContent = String(record.detections.length).padStart(2, '0'); }
  if ('requestVideoFrameCallback' in video) { const onFrame = (_, metadata) => { updateFrame(video.paused ? video.currentTime : metadata.mediaTime); video.requestVideoFrameCallback(onFrame); }; video.requestVideoFrameCallback(onFrame); } else video.addEventListener('timeupdate', () => updateFrame(video.currentTime));
  video.addEventListener('seeked', () => updateFrame(video.currentTime));
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  const canvas = document.querySelector('#system-canvas');
  const context = canvas.getContext('2d');
  const panel = document.querySelector('#lab-panel');
  function select(tab) {
    selected = tab.dataset.project;
    const project = projects[selected];
    document.querySelector('#lab-visual').dataset.project = selected;
    document.querySelector('#real-output').hidden = selected !== 'vision';
    document.querySelector('#sentinel-graphic').hidden = selected !== 'sentinel';
    document.querySelector('#motion-toggle').hidden = false;
    document.querySelector('#visual-note').innerHTML = selected === 'vision' ? 'FRAME-BY-FRAME INFERENCE &middot; PEDESTRIANS &middot; <a href="https://github.com/opencv/opencv/blob/4.x/samples/data/vtest.avi" target="_blank" rel="noopener">SOURCE &#8599;</a>' : 'SYSTEM ARCHITECTURE';
    tabs.forEach(item => { const active = item === tab; item.setAttribute('aria-selected', String(active)); item.tabIndex = active ? 0 : -1; });
    panel.setAttribute('aria-labelledby', tab.id);
    document.querySelector('#lab-category').textContent = project.category;
    document.querySelector('#lab-heading').innerHTML = project.heading;
    document.querySelector('#lab-description').textContent = project.description;
    document.querySelector('#lab-metric').textContent = project.metric;
    document.querySelector('#lab-metric-label').textContent = project.label;
    document.querySelector('#visual-caption').textContent = project.caption;
    document.querySelector('#lab-demo').href = project.demo;
    canvas.setAttribute('aria-label', project.alt);
    draw(); schedule();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); tabs[next].focus(); select(tabs[next]); }
    });
  });
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reducedMotion.matches, visible = false, tick = 0, last = 0, frame = null;
  const pause = document.querySelector('#motion-toggle');
  function updatePause() { document.querySelector('#sentinel-graphic').classList.toggle('is-paused', paused); pause.setAttribute('aria-pressed', String(paused)); pause.innerHTML = paused ? 'Play animation <span aria-hidden="true">▷</span>' : 'Pause animation <span aria-hidden="true">Ⅱ</span>'; }
  video.addEventListener('ended', () => { paused = true; updatePause(); pause.textContent = 'Replay clip'; });
  pause.addEventListener('click', () => { if (selected === 'vision' && video.ended) video.currentTime = 0; paused = !paused; updatePause(); schedule(); });
  reducedMotion.addEventListener('change', event => { paused = event.matches; updatePause(); schedule(); });
  updatePause();
  let width = 0, height = 0;
  function resize() {
    const rect = canvas.getBoundingClientRect(); width = rect.width; height = rect.height;
    const ratio = Math.min(devicePixelRatio || 1, 2); canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    if (context) context.setTransform(ratio, 0, 0, ratio, 0, 0);
    draw();
  }
  function line(x1, y1, x2, y2, color = '#26372e') { context.strokeStyle = color; context.lineWidth = 1; context.beginPath(); context.moveTo(x1, y1); context.lineTo(x2, y2); context.stroke(); }
  function text(value, x, y, size = 9, color = '#819b8a') { context.font = `${size}px Consolas, monospace`; context.fillStyle = color; context.fillText(value, x, y); }
  function box(x, y, w, h, label, color) {
    context.fillStyle = color + '0a'; context.fillRect(x, y, w, h);
    context.strokeStyle = color + '70'; context.strokeRect(x, y, w, h);
    for (const [cx, cy, sx, sy] of [[x,y,1,1],[x+w,y,-1,1],[x,y+h,1,-1],[x+w,y+h,-1,-1]]) { line(cx,cy,cx+sx*9,cy,color); line(cx,cy,cx,cy+sy*9,color); }
    context.fillStyle = color; context.fillRect(x,y-18,Math.min(w, label.length*5.5+12),18);
    text(label,x+6,y-6,9,'#0c1811');
  }
  function credit() {
    const labels=selected==='sentinel'?['PLAN','SOURCE','VERIFY','BUDGET','AUDIT']:['INGEST','RISK','POLICY','DECIDE','AUDIT'];
    const node = Math.min(72,width*.135), gap=(width-48-node*5)/4, y=height*.45;
    labels.forEach((label,i) => {
      const x=24+i*(node+gap), active = Math.floor(tick*.9)%5===i;
      if(i<4) line(x+node,y+node/2,x+node+gap,y+node/2,'#526d53');
      context.fillStyle=active?'#253c27':'#131e18'; context.fillRect(x,y,node,node);
      context.strokeStyle=active?'#c1edab':'#38503c'; context.strokeRect(x,y,node,node);
      text(`0${i+1}`,x+node*.35,y+node*.5,16,active?'#c1edab':'#849d85');
      text(label,x+2,y+node+20,width<450?8:10);
      if(i===(selected==='sentinel'?4:2)){line(x+node/2,y,x+node/2,y-32);text('HUMAN REVIEW',Math.max(25,x-15),y-43,9,'#c1edab');}
    });
    line(24,height*.83,width-24,height*.83);text(selected==='sentinel'?'CITATION OR ABSTAIN':'POLICY RETRIEVAL',24,height*.9,9);text('IMMUTABLE AUDIT TRAIL',width*.52,height*.9,width<450?8:9,'#c1edab');
  }
  function fraud() {
    const left=28, right=width-28, top=height*.27, bottom=height*.77;
    for(let i=0;i<4;i++) line(left,top+i*(bottom-top)/3,right,top+i*(bottom-top)/3);
    const count=45;
    for(let i=0;i<count;i++) {
      const anomalous=i===12||i===33, x=left+i*(right-left)/count;
      const value=anomalous?.85:.12+Math.abs(Math.sin(i*7.8+tick*.6))*.20;
      context.fillStyle=anomalous?'#c1edab':'#416657';context.fillRect(x,bottom-value*(bottom-top),Math.max(2,(right-left)/count-4),value*(bottom-top));
      if(anomalous) { context.beginPath(); context.arc(x+2,bottom-value*(bottom-top)-10,3,0,Math.PI*2);context.fill(); }
    }
    context.setLineDash([4,5]);line(left,top+(bottom-top)*.36,right,top+(bottom-top)*.36,'#b2c493');context.setLineDash([]);
    text('ANOMALY SIGNAL',left,top-16,9,'#c1edab');text('XGBOOST + ISOLATIONFOREST',left,bottom+29,width<450?8:10);text('TRANSACTION SIGNALS',right-120,bottom+49,9);
  }
  function draw() {
    if(!context || !width) return;
    context.clearRect(0,0,width,height);
    for(let x=20;x<width;x+=26) for(let y=20;y<height;y+=26) {context.fillStyle='#2b3e3065';context.fillRect(x,y,1,1);}
    if(selected==='vision')return; else if(selected==='credit'||selected==='sentinel')credit();else fraud();
  }
  function animate(time) {frame=null; if(paused||!visible||document.hidden)return; tick+=Math.min((time-last)/1000,.05);last=time;draw();frame=requestAnimationFrame(animate);}
  function schedule() { document.querySelector('#sentinel-graphic').classList.toggle('is-paused', paused || !visible || document.hidden || selected !== 'sentinel'); if (selected === 'vision' && !paused && visible && !document.hidden) video.play().catch(() => { paused = true; updatePause(); }); else video.pause(); if(frame!==null)cancelAnimationFrame(frame);frame=null;if(!paused&&visible&&!document.hidden){last=performance.now();frame=requestAnimationFrame(animate);} }
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(entries=>{visible=entries[0].intersectionRatio >= .5;schedule();},{threshold:[0,.5]}).observe(document.querySelector('#lab-visual'));
  document.addEventListener('visibilitychange',schedule);
  resize();schedule();
})();
