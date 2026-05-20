d3.csv('https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adbds.csv').then(data => {
  const measures = ['Aminotransferase, alanine','Aminotransferase, aspartate'];
  function delta(id, measure){ const s=data.filter(d=>d.USUBJID===id && d.TEST===measure && d.VISITN && d.STRESN).sort((a,b)=>+a.VISITN-+b.VISITN); return s.length>1 ? +s.at(-1).STRESN - +s[0].STRESN : null; }
  const ids = [...new Set(data.map(d => d.USUBJID).filter(Boolean))];
  const points = ids.map(id => ({id, x:delta(id, measures[0]), y:delta(id, measures[1])})).filter(d=>Number.isFinite(d.x)&&Number.isFinite(d.y));
  new Chart(document.getElementById('chart'), { type:'scatter', data:{ datasets:[{ label:'Change from baseline', data:points, backgroundColor:'#7c3aed' }] }, options:{responsive:true,plugins:{title:{display:true,text:'Delta-delta comparison'}, tooltip:{callbacks:{label:ctx=>`${ctx.raw.id}: ΔALT ${ctx.raw.x.toFixed(1)}, ΔAST ${ctx.raw.y.toFixed(1)}`}}},scales:{x:{title:{display:true,text:'Δ ALT'}},y:{title:{display:true,text:'Δ AST'}}}} });
});
