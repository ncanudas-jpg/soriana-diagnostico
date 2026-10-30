/* ==========================================================================
   app.js — lógica e interacción. Los datos y textos viven en js/data.js
   ========================================================================== */
(() => {
  'use strict';
  const D = window.SITE;
  const root = document.documentElement;
  root.classList.add('js');

  /* ---------- utilidades ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const reduceMq = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const fmt = (n, dec = 0) => Number(n).toLocaleString('es-MX', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  const cssVar = (n) => getComputedStyle(root).getPropertyValue(n).trim();
  const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; };
  const isDark = () => (root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches);
  const C = D.colores;
  const CO = { soriana: { n: 'Soriana', c: C.soriana }, chedraui: { n: 'Chedraui', c: C.chedraui } };

  const decOf = (r) => {
    const d = Math.max(...[...r.s, ...r.c].map((v) => (String(v).split('.')[1] || '').length));
    return clamp(Math.max(d, r.unit === 'x' ? 2 : r.unit === 'mdp' ? 0 : 1), 0, 2);
  };
  const fv = (v, unit, dec) => {
    if (v == null || Number.isNaN(v)) return '—';
    if (unit === 'pct') return fmt(v, dec) + '%';
    if (unit === 'x') return fmt(v, dec) + 'x';
    if (unit === 'dias') return fmt(v, dec) + ' d';
    return fmt(v, dec);
  };
  const R = (id) => D.razones.find((r) => r.id === id);

  function tween(node, to, f, dur = 900) {
    const from = node._v ?? 0;
    node._v = to;
    cancelAnimationFrame(node._raf);
    if (reduceMq.matches || from === to) { node.textContent = f(to); return; }
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      node.textContent = f(from + (to - from) * (1 - Math.pow(1 - p, 3)));
      if (p < 1) node._raf = requestAnimationFrame(step);
    };
    node._raf = requestAnimationFrame(step);
  }

  /* ---------- cálculo de KPI desde la base (hoja DATOS) ---------- */
  const calc = {
    mop: (b, i) => (b.utilidadOperacion[i] / b.ingresos[i]) * 100,
    crec: (b, i) => (i > 0 ? (b.ingresos[i] / b.ingresos[i - 1] - 1) * 100 : null),
    mebitda: (b, i) => (b.ebitda[i] / b.ingresos[i]) * 100,
    mneto: (b, i) => (b.utilidadNeta[i] / b.ingresos[i]) * 100,
    roe: (b, i) => (b.utilidadNeta[i] / b.capital[i]) * 100,
    circ: (b, i) => b.activoCirc[i] / b.pasivoCirc[i],
    dio: (b, i) => 365 / (b.costoVentas[i] / b.inventario[i]),
    dso: (b, i) => 365 / (b.ingresos[i] / b.cxc[i]),
    dpo: (b, i) => 365 / (b.costoVentas[i] / b.cxp[i]),
    ccc: (b, i) => calc.dso(b, i) + calc.dio(b, i) - calc.dpo(b, i),
    rdeuda: (b, i) => (b.pasivoTotal[i] / b.activoTotal[i]) * 100,
    dneta: (b, i) => (b.deudaSinArr[i] - b.efectivo[i]) / b.ebitda[i]
  };
  const kpiValue = (co, id, i) => calc[id](D.base[co], i);

  /* ---------- logos con respaldo (nunca ícono roto) ---------- */
  function renderLogos(node) {
    const main = D.logos.find((l) => l.principal), rest = D.logos.filter((l) => !l.principal);
    const pill = (l) => `<span class="logo${l.principal ? ' logo--main' : ''}" style="--c:${l.color};${l.alto ? `--h:${l.alto}px` : ''}"><span class="lt">${esc(l.nombre)}</span></span>`;
    node.innerHTML = `${pill(main)}<span class="logos-vs" aria-hidden="true">frente a</span><span class="logos-rest">${rest.map(pill).join('')}</span>`;
    const els = $$('.logo', node);
    [main, ...rest].forEach((l, i) => {
      if (!l.archivo) return;
      const img = new Image();
      img.alt = l.principal ? '' : l.nombre;
      img.onload = () => {
        els[i].classList.add('has-img');
        if (l.principal) els[i].prepend(img); else els[i].replaceChildren(img); // el principal conserva el nombre en texto
      };
      img.src = l.archivo;
    });
  }

  /* ---------- encabezados ---------- */
  function renderHeads() {
    $$('[data-head]').forEach((h) => {
      const key = h.dataset.head, x = D.heads[key];
      h.classList.add('reveal');
      h.innerHTML = `<p class="kicker">${esc(x.k)}</p><h2 class="h2" id="h-${key}">${esc(x.t)}</h2>${x.s ? `<p class="sub">${esc(x.s)}</p>` : ''}`;
    });
  }

  /* ---------- nav ---------- */
  function renderNav() {
    $('#navLinks').innerHTML = D.nav.map((n) => `<li><a href="#${n.id}" data-nav="${n.id}">${esc(n.texto)}</a></li>`).join('');
  }

  /* ---------- hero ---------- */
  function renderHero() {
    const [a, ...rest] = D.meta.titulo.split('. ');
    $('#heroEyebrow').textContent = D.meta.eyebrow || 'Organización Soriana · BMV: SORIANAB';
    $('#heroTitle').innerHTML = `${esc(a)}.<em>${esc(rest.join('. '))}</em>`;
    $('#heroSub').textContent = D.meta.subtitulo;
    renderLogos($('#heroLogos'));
    $('#heroBy').textContent = [D.meta.autores.join(' · '), D.meta.materia, D.meta.profesor, D.meta.institucion].filter(Boolean).join(' · ');
  }

  /* ---------- perfil ---------- */
  function renderPerfil() {
    $('#counters').innerHTML = D.perfil.contadores.map((c) => {
      if (c.texto) return `<div class="card counter lift"><span class="num">${esc(c.texto)}</span><span class="lbl">${esc(c.etiqueta)}</span></div>`;
      const final = `${c.prefijo}${c.sinSeparador ? c.valor : fmt(c.valor)}${c.sufijo}`;
      return `<div class="card counter lift"><span class="num" aria-hidden="true" data-to="${c.valor}" data-pre="${esc(c.prefijo)}" data-suf="${esc(c.sufijo)}" data-raw="${c.sinSeparador ? 1 : 0}">0</span><span class="sr">${esc(final)}</span><span class="lbl">${esc(c.etiqueta)}</span></div>`;
    }).join('');

    const tabs = D.perfil.pestanas;
    const box = $('#perfilTabs');
    box.innerHTML = `<div class="tablist" role="tablist" aria-label="Perfil de la empresa">${tabs.map((t, i) => `<button role="tab" id="tab-${t.id}" aria-controls="panel-perfil" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-i="${i}">${esc(t.titulo)}</button>`).join('')}</div><div role="tabpanel" id="panel-perfil" aria-labelledby="tab-${tabs[0].id}" tabindex="0"></div>`;
    const panel = $('#panel-perfil');
    const sel = (i) => {
      $$('[role=tab]', box).forEach((b, k) => { b.setAttribute('aria-selected', k === i); b.tabIndex = k === i ? 0 : -1; });
      panel.setAttribute('aria-labelledby', `tab-${tabs[i].id}`);
      panel.textContent = tabs[i].texto;
      panel.style.animation = 'none'; void panel.offsetWidth; panel.style.animation = '';
    };
    sel(0);
    box.addEventListener('click', (e) => { const b = e.target.closest('[role=tab]'); if (b) sel(+b.dataset.i); });
    box.addEventListener('keydown', (e) => {
      const cur = +($('[role=tab][aria-selected=true]', box).dataset.i);
      let n = null;
      if (e.key === 'ArrowRight') n = (cur + 1) % tabs.length;
      if (e.key === 'ArrowLeft') n = (cur - 1 + tabs.length) % tabs.length;
      if (e.key === 'Home') n = 0;
      if (e.key === 'End') n = tabs.length - 1;
      if (n !== null) { e.preventDefault(); sel(n); $$('[role=tab]', box)[n].focus(); }
    });
  }

  function runCounters(scope = document) {
    $$('.counter .num[data-to]', scope).forEach((n) => {
      if (n._started) return;
      n._started = true;
      const raw = n.dataset.raw === '1';
      tween(n, +n.dataset.to, (v) => `${n.dataset.pre}${raw ? Math.round(v) : fmt(Math.round(v))}${n.dataset.suf}`, 1600);
    });
  }

  /* ---------- PESTEL ---------- */
  /* ---------- FODA ---------- */
  /* ---------- pestañas genéricas (paneles con data-pane) ---------- */
  function initTabset(el, defs, onSelect) {
    const list = document.createElement('div');
    list.className = 'tablist'; list.setAttribute('role', 'tablist');
    list.innerHTML = defs.map((d, i) => `<button type="button" role="tab" id="${el.id}-t-${d.id}" aria-controls="${el.id}-p-${d.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-i="${i}">${esc(d.label)}</button>`).join('');
    el.prepend(list);
    const panes = defs.map((d, i) => {
      const p = $(`[data-pane="${d.id}"]`, el);
      p.id = `${el.id}-p-${d.id}`; p.setAttribute('role', 'tabpanel'); p.setAttribute('aria-labelledby', `${el.id}-t-${d.id}`); p.hidden = i !== 0;
      return p;
    });
    const tabs = $$('[role=tab]', list);
    const select = (i, focus) => {
      tabs.forEach((b, k) => { b.setAttribute('aria-selected', k === i); b.tabIndex = k === i ? 0 : -1; });
      panes.forEach((p, k) => { p.hidden = k !== i; });
      if (focus) tabs[i].focus();
      if (onSelect) onSelect(defs[i].id, panes[i]);
      requestAnimationFrame(() => ensureCharts(panes[i]));
    };
    list.addEventListener('click', (e) => { const b = e.target.closest('[role=tab]'); if (b) select(+b.dataset.i); });
    list.addEventListener('keydown', (e) => {
      const cur = tabs.findIndex((b) => b.getAttribute('aria-selected') === 'true');
      const n = e.key === 'ArrowRight' ? (cur + 1) % tabs.length : e.key === 'ArrowLeft' ? (cur - 1 + tabs.length) % tabs.length : e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : null;
      if (n !== null) { e.preventDefault(); select(n, true); }
    });
    return select;
  }

  /* ---------- Diagnóstico: PESTEL + FODA, el detalle aparece al tocar ---------- */
  function renderDiag() {
    const box = $('#diag');
    const FC = { F: ['#006C32', '#fff'], O: ['#B6BF00', '#1d1d1f'], D: ['#E4002B', '#fff'], A: ['#9d001f', '#fff'] };
    const chip = (g, i, letra, nombre, col, on) => `<button type="button" class="dchip" data-g="${g}" data-i="${i}" aria-pressed="false" style="--c:${col};--on:${on}"><span class="l" aria-hidden="true">${esc(letra)}</span><span>${esc(nombre)}</span></button>`;
    box.innerHTML = `<div class="diag-groups">
      <div class="dgroup"><h3><b>PESTEL</b> · el entorno</h3><div class="dchips">${D.pestel.map((p, i) => chip('p', i, p.letra, p.factor, '#006C32', '#fff')).join('')}</div></div>
      <div class="dgroup foda"><h3><b>FODA</b> · por dentro y por fuera</h3><div class="dchips">${D.foda.map((f, i) => chip('f', i, f.letra, f.nombre, FC[f.letra][0], FC[f.letra][1])).join('')}</div></div>
    </div><div class="card diag-panel" aria-live="polite"><p class="hint">👆 Toca cualquier letra y aquí aparece el detalle. Nada de leer muros de texto.</p></div>`;
    const panel = $('.diag-panel', box);
    box.addEventListener('click', (e) => {
      const b = e.target.closest('.dchip'); if (!b) return;
      const i = +b.dataset.i, g = b.dataset.g;
      $$('.dchip', box).forEach((x) => x.setAttribute('aria-pressed', x === b));
      panel.style.setProperty('--c', b.style.getPropertyValue('--c'));
      if (g === 'p') {
        const p = D.pestel[i];
        panel.innerHTML = `<h3>${esc(p.factor)}</h3><div class="cols"><div><h4>Qué está pasando</h4><p>${esc(p.situacion)}</p></div><div><h4>Qué significa para Soriana</h4><p>${esc(p.impacto)}</p></div></div>`;
      } else {
        const f = D.foda[i];
        panel.innerHTML = `<h3>${esc(f.nombre)}</h3><ul>${f.items.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`;
      }
    });
  }

  /* ---------- Modelo: Canvas + Tendencias en pestañas ---------- */
  function renderModelo() {
    renderCanvas(); renderCarousel();
    initTabset($('#modeloTabs'), D.ui.modeloTabs);
  }

  /* ---------- Carrusel ---------- */
  function renderCarousel() {
    const car = $('#carousel');
    car.innerHTML = D.tendencias.map((t) => `<article class="card lift tcard" aria-label="Tendencia ${t.n}: ${esc(t.titulo)}"><div><span class="tn">TENDENCIA ${t.n}</span><h3>${esc(t.titulo)}</h3></div><div class="tfig">${esc(t.cifra)}</div><p>${esc(t.texto)}</p></article>`).join('');
    const dots = $('#carDots');
    dots.innerHTML = D.tendencias.map((t, i) => `<button type="button" aria-label="Ir a ${esc(t.titulo)}" data-i="${i}"></button>`).join('');
    const cards = $$('.tcard', car);
    const step = () => cards[0].getBoundingClientRect().width + 20;
    const idx = () => clamp(Math.round(car.scrollLeft / step()), 0, cards.length - 1);
    const paint = () => $$('button', dots).forEach((b, k) => b.setAttribute('aria-current', k === idx()));
    const go = (i) => car.scrollTo({ left: clamp(i, 0, cards.length - 1) * step(), behavior: reduceMq.matches ? 'auto' : 'smooth' });
    let raf; car.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(paint); }, { passive: true });
    $('#carPrev').addEventListener('click', () => go(idx() - 1));
    $('#carNext').addEventListener('click', () => go(idx() + 1));
    dots.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) go(+b.dataset.i); });
    paint();
  }

  /* ---------- Canvas ---------- */
  function renderCanvas() {
    const grid = $('#canvasGrid');
    grid.innerHTML = D.canvas.map((b) => `<button class="cb" type="button" data-id="${b.id}" aria-haspopup="dialog"><strong>${esc(b.titulo)}</strong><span>${b.items.length} elementos · <span class="cb-more">Ver detalle</span></span></button>`).join('');
    const dlg = $('#canvasDialog');
    grid.addEventListener('click', (e) => {
      const b = e.target.closest('.cb'); if (!b) return;
      const d = D.canvas.find((x) => x.id === b.dataset.id);
      $('#dlgTitle').textContent = d.titulo;
      $('#dlgList').innerHTML = d.items.map((t) => `<li>${esc(t)}</li>`).join('');
      if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
    });
    dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  }

  /* ==========================================================================
     GRÁFICAS (Chart.js)
     ========================================================================== */
  const charts = new Map(); // key -> { canvas, make, chart }
  const hasChart = () => typeof window.Chart === 'function';

  function themeChart() {
    if (!hasChart()) return;
    Chart.defaults.font.family = getComputedStyle(document.body).fontFamily;
    Chart.defaults.font.size = 13;
    Chart.defaults.color = cssVar('--text-2');
    Chart.defaults.borderColor = cssVar('--line');
  }
  const animOpt = () => (reduceMq.matches ? false : { duration: 950, easing: 'easeOutQuart' });

  function baseOptions(unit, decFn) {
    const tickFmt = (v) => (unit === 'mdp' ? fmt(v) : unit === 'pct' ? v + '%' : unit === 'x' ? v + 'x' : v);
    return {
      responsive: true, maintainAspectRatio: false, animation: animOpt(),
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8, boxHeight: 8, padding: 16 } },
        tooltip: {
          padding: 12, cornerRadius: 12, boxPadding: 4,
          callbacks: { label: (c) => (c.parsed.y == null ? null : ` ${c.dataset.label}: ${fv(c.parsed.y, unit, decFn ? decFn(c) : unit === 'x' ? 2 : unit === 'mdp' ? 0 : 1)}`) }
        }
      },
      scales: {
        x: { grid: { display: false }, border: { display: false }, ticks: { maxRotation: 0, autoSkip: false } },
        y: { grid: { color: cssVar('--line') }, border: { display: false }, ticks: { callback: tickFmt } }
      }
    };
  }

  const bar = (label, data, color, extra = {}) => ({ label, data, backgroundColor: color, borderRadius: 8, borderSkipped: false, maxBarThickness: 56, ...extra });
  const wrapLabel = (s, n = 16) => { const out = []; let cur = ''; s.split(' ').forEach((w) => { if ((cur + ' ' + w).trim().length > n && cur) { out.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); }); out.push(cur); return out; };

  function buildChart(key) {
    const r = charts.get(key);
    if (!r || !hasChart()) return;
    themeChart();
    if (r.chart) r.chart.destroy();
    r.chart = new Chart(r.canvas, r.make());
  }
  function refreshChart(key) {
    const r = charts.get(key);
    if (!r || !r.chart) return;
    const cfg = r.make();
    r.chart.data = cfg.data;
    r.chart.options = cfg.options;
    r.chart.update();
  }
  function registerChart(key, canvas, make) {
    charts.set(key, { canvas, make, chart: null });
    if (!hasChart()) { canvas.parentElement.insertAdjacentHTML('beforeend', '<p class="chart-note">No se pudo cargar Chart.js (¿sin conexión?). Los datos siguen disponibles en las tablas.</p>'); return; }
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { buildChart(key); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(canvas);
  }
  function ensureCharts(scope) {
    $$('canvas', scope).forEach((cv) => {
      if (!cv.offsetParent) return; // oculto en una pestaña
      for (const [key, r] of charts) if (r.canvas === cv) { if (!r.chart) buildChart(key); else r.chart.resize(); }
    });
  }
  const rebuildAllCharts = () => { themeChart(); charts.forEach((r, key) => { if (r.chart) buildChart(key); }); };

  /* ---------- capítulos cuantitativos ---------- */
  function chapterConfig(view) {
    let labels, datasets, unit, decFn;
    if (view.tipo === 'base') {
      unit = 'mdp';
      labels = view.anios.map(String);
      datasets = ['soriana', 'chedraui'].map((co) => bar(CO[co].n, view.anios.map((a) => D.base[co][view.metrica][D.anios.indexOf(a)]), CO[co].c));
    } else {
      const rs = view.ids.map(R);
      unit = rs[0].unit;
      decFn = (c) => decOf(rs[c.dataIndex] || rs[0]);
      const yi = (a) => [2024, 2025].indexOf(a);
      if (rs.length === 1) {
        labels = view.anios.map(String);
        datasets = ['s', 'c'].map((k) => bar(k === 's' ? 'Soriana' : 'Chedraui', view.anios.map((a) => rs[0][k][yi(a)]), k === 's' ? C.soriana : C.chedraui));
        if (view.conRef && rs[0].ref.v != null) datasets.push(bar('Walmex 2025', view.anios.map((a) => (a === 2025 ? rs[0].ref.v : null)), C.ref));
      } else {
        labels = rs.map((r) => wrapLabel(r.nombre));
        if (view.anios.length === 1) {
          const i = yi(view.anios[0]);
          datasets = [bar(`Soriana ${view.anios[0]}`, rs.map((r) => r.s[i]), C.soriana), bar(`Chedraui ${view.anios[0]}`, rs.map((r) => r.c[i]), C.chedraui)];
          if (view.conRef) datasets.push(bar('Referencia (Walmex)', rs.map((r) => (r.ref.v ?? null)), C.ref));
        } else {
          datasets = [];
          [['s', C.soriana, 'Soriana'], ['c', C.chedraui, 'Chedraui']].forEach(([k, col, n]) => view.anios.forEach((a, j) => datasets.push(bar(`${n} ${a}`, rs.map((r) => r[k][yi(a)]), j === 0 ? rgba(col, 0.42) : col))));
        }
      }
    }
    if (view.criterio) datasets.push({ type: 'line', label: view.criterio.txt, data: labels.map(() => view.criterio.y), borderColor: cssVar('--text-2'), borderDash: [6, 6], borderWidth: 2, pointRadius: 0, fill: false, order: -1 });
    const options = baseOptions(unit, decFn);
    return { type: 'bar', data: { labels, datasets }, options };
  }

  function renderFinanzas() {
    const temas = D.capitulos, st = { ch: 0, v: 0 };
    const cv = $('#finChart');
    const view = () => temas[st.ch].vistas[st.v];
    $('#finTemas').innerHTML = temas.map((c, i) => `<button type="button" class="chip" data-i="${i}" aria-pressed="${i === 0}">${esc(c.head.t.replace(/\.$/, ''))}</button>`).join('');
    const paint = () => {
      const ch = temas[st.ch], v = view();
      $$('#finTemas .chip').forEach((b, k) => b.setAttribute('aria-pressed', k === st.ch));
      $('#finVistas').innerHTML = ch.vistas.length > 1 ? ch.vistas.map((x, k) => `<button type="button" class="chip" data-v="${k}" aria-pressed="${k === st.v}">${esc(x.label)}</button>`).join('') : '';
      $('#finLectura').textContent = v.lectura;
      $('#finLabel').textContent = `${ch.head.t.replace(/\.$/, '')} — ${v.label}`;
      $('#finUnit').textContent = `· ${unitLabel(v)}`;
      $('#finExtra').innerHTML = ch.id === 'ingresos' ? q2Callout() : '';
      cv.setAttribute('aria-label', `Gráfica de ${v.label}, Soriana frente a Chedraui. ${v.lectura}`);
    };
    paint();
    registerChart('fin', cv, () => chapterConfig(view()));
    const redraw = () => { paint(); refreshChart('fin'); if (!charts.get('fin').chart) buildChart('fin'); };
    $('#finTemas').addEventListener('click', (e) => { const b = e.target.closest('[data-i]'); if (b) { st.ch = +b.dataset.i; st.v = 0; redraw(); } });
    $('#finVistas').addEventListener('click', (e) => { const b = e.target.closest('[data-v]'); if (b) { st.v = +b.dataset.v; redraw(); } });
  }
  function unitLabel(v) {
    if (v.tipo === 'base') return 'millones de pesos (mdp)';
    const u = R(v.ids[0]).unit;
    return u === 'pct' ? 'porcentaje (%)' : u === 'x' ? 'veces (x)' : u === 'dias' ? 'días' : 'mdp';
  }
  function q2Callout() {
    const q = D.segundoTrimestre;
    return `<div class="callout"><h4>${esc(q.titulo)}</h4>
      <div class="pair"><div>Ventas 2T (mdp)<b>${fmt(q.ventas.antes)} → ${fmt(q.ventas.ahora)}</b></div><div>Utilidad 2T (mdp)<b class="arrow-up">${fmt(q.utilidad.antes)} → ${fmt(q.utilidad.ahora)}</b></div></div>
      <p>${esc(q.texto)}</p></div>`;
  }

  /* ==========================================================================
     COMPARACIÓN
     ========================================================================== */
  const YEARS = [2024, 2025];
  const cmp = { yi: 1, ref: false, id: 'dio' };
  const winner = (r, yi) => {
    if (r.better === 'na') return null;
    const s = r.s[yi], c = r.c[yi];
    if (s === c) return 'tie';
    return (r.better === 'high' ? s > c : s < c) ? 's' : 'c';
  };

  function renderControls() {
    [$('#dueloCtl')].forEach((n) => {
      n.innerHTML = `<div class="seg" role="radiogroup" aria-label="Año">${YEARS.map((y, i) => `<button type="button" role="radio" data-yi="${i}" aria-checked="${i === cmp.yi}">${y}</button>`).join('')}</div>
        <label class="switch"><input type="checkbox" data-ref ${cmp.ref ? 'checked' : ''}><span class="tr" aria-hidden="true"></span><span>Referencia de industria <span class="muted">(Walmex / Damodaran)</span></span></label>`;
      n.addEventListener('click', (e) => { const b = e.target.closest('[data-yi]'); if (b) { cmp.yi = +b.dataset.yi; syncCmp(); } });
      n.addEventListener('change', (e) => { if (e.target.matches('[data-ref]')) { cmp.ref = e.target.checked; syncCmp(); } });
    });
  }

  function renderTable() {
    const yi = cmp.yi;
    let html = `<thead><tr><th scope="col">Razón financiera</th><th scope="col">Soriana ${YEARS[yi]}</th><th scope="col">Chedraui ${YEARS[yi]}</th><th scope="col">Mejor posicionada</th><th scope="col" class="col-ref">Referencia de industria</th></tr></thead><tbody>`;
    let cat = '', ws = 0, wc = 0;
    D.razones.forEach((r) => {
      if (r.cat !== cat) { cat = r.cat; html += `<tr class="cat"><td colspan="4">${esc(cat)}</td><td class="col-ref"></td></tr>`; }
      const w = winner(r, yi), d = decOf(r);
      if (w === 's') ws++; if (w === 'c') wc++;
      const badge = w === 's' ? `<span class="badge" style="--c:var(--soriana)">Soriana</span>` : w === 'c' ? `<span class="badge" style="--c:var(--chedraui)">Chedraui</span>` : w === 'tie' ? '<span class="badge na">Empate</span>' : '<span class="badge na">No aplica</span>';
      html += `<tr><td>${r.aviso ? `<span class="warn" title="${esc(r.aviso)}" aria-label="${esc(r.aviso)}" tabindex="0" role="img">⚠</span> ` : ''}<button type="button" class="rowlink" data-id="${r.id}" title="Compararla en el deslizador">${esc(r.nombre)}</button></td>
        <td class="${w === 's' ? 'win s' : ''}">${fv(r.s[yi], r.unit, d)}</td><td class="${w === 'c' ? 'win c' : ''}">${fv(r.c[yi], r.unit, d)}</td><td>${badge}</td><td class="ref col-ref">${esc(r.ref.txt)}</td></tr>`;
    });
    $('#ratioTable').innerHTML = html + '</tbody>';
    const total = ws + wc;
    cmp.score = { ws, wc, total };
    $('#cmpFoot').textContent = `${yi === 1 ? D.comparacionNotas.resultado2025 + ' ' : ''}${D.comparacionNotas.capitalTrabajo} ${D.comparacionNotas.datos} ⚠ Margen bruto: pasa el cursor o enfoca el aviso para leer la advertencia; compara mejor en margen operativo y EBITDA.`;
  }

  function radarConfig() {
    const yi = cmp.yi, axes = D.radar.map((a) => ({ ...a, r: R(a.id) }));
    const norm = (v, t) => clamp((v / t) * 100, 0, 100);
    const mk = (label, vals, color, fill) => ({ label, data: axes.map((a, i) => norm(vals[i], a.tope)), real: vals, borderColor: color, backgroundColor: rgba(color, fill), pointBackgroundColor: color, borderWidth: 2.5, pointRadius: 4 });
    const datasets = [mk(`Soriana ${YEARS[yi]}`, axes.map((a) => a.r.s[yi]), C.soriana, 0.22), mk(`Chedraui ${YEARS[yi]}`, axes.map((a) => a.r.c[yi]), C.chedraui, 0.22)];
    if (cmp.ref) datasets.push({ ...mk('Referencia (Walmex / Damodaran)', axes.map((a) => a.r.ref.v), C.ref, 0.1), borderDash: [6, 5] });
    return {
      type: 'radar',
      data: { labels: axes.map((a) => wrapLabel(a.r.nombre, 14)), datasets },
      options: {
        responsive: true, maintainAspectRatio: false, animation: animOpt(),
        scales: { r: { min: 0, max: 100, ticks: { display: false, stepSize: 25 }, grid: { color: cssVar('--line') }, angleLines: { color: cssVar('--line') }, pointLabels: { color: cssVar('--text'), font: { size: 12, weight: '600' } } } },
        plugins: {
          legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8, boxHeight: 8, padding: 16 } },
          tooltip: { padding: 12, cornerRadius: 12, callbacks: { label: (c) => ` ${c.dataset.label}: ${fv(c.dataset.real[c.dataIndex], 'pct', 1)}` } }
        }
      }
    };
  }

  function barGroup() { return D.gruposBarras.find((g) => g.id === $('#barGroup').value) || D.gruposBarras[0]; }
  function barConfig() {
    const g = barGroup(), yi = cmp.yi, rs = g.ids.map(R);
    const datasets = [bar(`Soriana ${YEARS[yi]}`, rs.map((r) => r.s[yi]), C.soriana), bar(`Chedraui ${YEARS[yi]}`, rs.map((r) => r.c[yi]), C.chedraui)];
    const refs = rs.map((r) => (r.ref.v != null && !r.ref.criterio ? r.ref.v : null));
    const hasRef = refs.some((v) => v != null);
    if (cmp.ref && hasRef) datasets.push(bar('Referencia (Walmex / Damodaran)', refs, C.ref));
    $('#barNote').textContent = cmp.ref ? (hasRef ? 'Barras grises: referencia de industria disponible (Walmex o Damodaran). Donde falta, no hay dato sectorial directo.' : 'Este grupo no tiene una referencia numérica de industria; ver la columna de referencia en la tabla.') : '';
    return { type: 'bar', data: { labels: rs.map((r) => wrapLabel(r.nombre, 14)), datasets }, options: baseOptions(g.unit, (c) => decOf(rs[c.dataIndex])) };
  }

  function renderSlider() {
    const box = $('#cmpSlider');
    if (!box.dataset.ready) {
      box.dataset.ready = 1;
      box.innerHTML = `<div class="row"><label for="cmpSel"><strong>Razón a comparar</strong></label><select id="cmpSel" class="select">${D.razones.filter((r) => r.better !== 'na').map((r) => `<option value="${r.id}">${esc(r.nombre)}</option>`).join('')}</select></div>
        <div class="split" id="split"><div class="side c"><div><div class="n" id="nC"></div><div class="v" id="vC"></div></div></div><div class="side s"><div><div class="n" id="nS"></div><div class="v" id="vS"></div></div></div><div class="handle" aria-hidden="true"></div>
        <input type="range" min="0" max="100" step="1" id="splitRange" aria-label="Deslizar para comparar Soriana (izquierda) y Chedraui (derecha)"></div>
        <p class="gap-text" id="gapText" aria-live="polite"></p><p class="footnote" id="refText" style="margin:0"></p>`;
      $('#cmpSel').addEventListener('change', (e) => { cmp.id = e.target.value; paintSlider(true); });
      $('#splitRange').addEventListener('input', (e) => $('#split').style.setProperty('--p', e.target.value + '%'));
      $('#cmpSel').value = cmp.id;
    }
    paintSlider(true);
  }
  function paintSlider(resetPos) {
    const r = R(cmp.id), yi = cmp.yi, d = decOf(r), s = r.s[yi], c = r.c[yi];
    $('#nS').textContent = `Soriana ${YEARS[yi]}`; $('#nC').textContent = `Chedraui ${YEARS[yi]}`;
    $('#vS').textContent = fv(s, r.unit, d); $('#vC').textContent = fv(c, r.unit, d);
    if (resetPos) {
      const share = clamp((Math.abs(s) / ((Math.abs(s) + Math.abs(c)) || 1)) * 100, 15, 85);
      $('#split').style.setProperty('--p', share + '%'); $('#splitRange').value = share;
    }
    const w = winner(r, yi), diff = Math.abs(s - c);
    const dir = r.better === 'high' ? 'más es mejor' : 'menos es mejor';
    $('#gapText').innerHTML = `Diferencia: <strong>${fv(diff, r.unit, d)}</strong>${w === 's' ? ` · mejor posicionada: <strong style="color:var(--soriana-text)">Soriana</strong> (${dir})` : w === 'c' ? ` · mejor posicionada: <strong style="color:var(--chedraui-text)">Chedraui</strong> (${dir})` : ''}.`;
    $('#refText').textContent = cmp.ref ? `Referencia: ${r.ref.txt}` : '';
  }

  function syncCmp() {
    $$('#dueloCtl [data-yi]').forEach((b) => b.setAttribute('aria-checked', +b.dataset.yi === cmp.yi));
    $$('#dueloCtl [data-ref]').forEach((i) => (i.checked = cmp.ref));
    $('#duelo').classList.toggle('show-ref', cmp.ref);
    renderTable();
    paintVs();
    refreshChart('radar'); refreshChart('bars');
    paintSlider(true);
  }

  /* ---------- marcador del duelo ---------- */
  function renderVs() {
    const l = (n) => D.logos.find((x) => x.nombre === n) || {};
    const tile = (x) => `<span class="tile">${x.archivo ? `<img src="${esc(x.archivo)}" alt="" onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:'${esc((x.nombre || '?')[0])}'}))">` : `<span>${esc((x.nombre || '?')[0])}</span>`}</span>`;
    $('#vsBoard').innerHTML = `
      <div class="vs-side s" id="vsSide-s">${tile(l('Soriana'))}<div><div class="nm">Soriana</div><div class="num" id="vsS">0</div><div class="lbl" id="vsSl"></div></div></div>
      <div class="vs-mid" aria-hidden="true">VS</div>
      <div class="vs-side c" id="vsSide-c">${tile(l('Chedraui'))}<div><div class="nm">Chedraui</div><div class="num" id="vsC">0</div><div class="lbl" id="vsCl"></div></div></div>
      <p class="vs-note">${esc(D.rival.nota)} Conteo de razones donde cada una está mejor posicionada.</p>`;
  }
  function paintVs() {
    const sc = cmp.score; if (!sc) return;
    tween($('#vsS'), sc.ws, (v) => String(Math.round(v)), 700);
    tween($('#vsC'), sc.wc, (v) => String(Math.round(v)), 700);
    $('#vsSl').textContent = `de ${sc.total} razones · ${YEARS[cmp.yi]}`; $('#vsCl').textContent = `de ${sc.total} razones · ${YEARS[cmp.yi]}`;
    $('#vsSide-s').classList.toggle('win', sc.ws > sc.wc); $('#vsSide-c').classList.toggle('win', sc.wc > sc.ws);
  }

  /* ---------- juego: ¿quién gana? ---------- */
  function renderQuiz() {
    const box = $('#quiz'), J = D.ui.juego, yi = YEARS.indexOf(J.anio), qs = J.ids.map(R);
    let i = 0, score = 0;
    const draw = () => {
      if (i >= qs.length) {
        const msg = score >= 5 ? '¡Ya piensas como analista financiero!' : score >= 3 ? 'Nada mal: la competencia está cerrada.' : 'Chedraui sorprende… repasa la tabla y vuelve a intentar.';
        box.innerHTML = `<span class="q-n">Resultado</span><div class="q-score">${score}/${qs.length}</div><p class="q-t">${msg}</p><button type="button" class="pill-btn solid" data-act="again">Jugar otra vez</button>`;
        return;
      }
      const r = qs[i];
      box.innerHTML = `<span class="q-n">Pregunta ${i + 1} de ${qs.length}</span><h3 class="q-t">¿Quién está mejor posicionada en ${esc(r.nombre)}?</h3><p class="q-h">${r.better === 'high' ? 'Más es mejor' : 'Menos es mejor'} · cifras ${J.anio}</p>
        <div class="q-opts"><button type="button" class="q-btn" style="--c:#E4002B" data-pick="s">Soriana</button><button type="button" class="q-btn" style="--c:#F28C00" data-pick="c">Chedraui</button></div><div class="q-res" aria-live="polite"></div>`;
    };
    box.addEventListener('click', (e) => {
      if (e.target.closest('[data-act=again]')) { i = 0; score = 0; draw(); return; }
      if (e.target.closest('[data-act=next]')) { i++; draw(); return; }
      const b = e.target.closest('[data-pick]'); if (!b || b.disabled) return;
      const r = qs[i], win = winner(r, yi), ok = b.dataset.pick === win, d = decOf(r);
      if (ok) score++;
      $$('.q-btn', box).forEach((x) => { x.disabled = true; if (x === b) x.classList.add('picked'); });
      $('.q-res', box).className = `q-res ${ok ? 'ok' : 'no'}`;
      $('.q-res', box).innerHTML = `<b>${ok ? '¡Le atinaste! 🎯' : 'Uy, casi. 😅'}</b><p>Soriana ${fv(r.s[yi], r.unit, d)} · Chedraui ${fv(r.c[yi], r.unit, d)}. Gana ${win === 's' ? 'Soriana' : 'Chedraui'}.</p><button type="button" class="pill-btn solid" data-act="next">${i + 1 < qs.length ? 'Siguiente' : 'Ver resultado'}</button>`;
    });
    draw();
  }

  function renderComparacion() {
    renderControls();
    renderVs();
    const sel = $('#barGroup');
    sel.innerHTML = D.gruposBarras.map((g) => `<option value="${g.id}">${esc(g.nombre)}</option>`).join('');
    $('#barChart').closest('figure').insertAdjacentHTML('beforeend', '<p class="chart-note" id="barNote"></p>');
    $('#radarNote').textContent = 'Cada eje se muestra como porcentaje de un tope (crecimiento 8%, margen operativo 8%, EBITDA 12%, neto 5%, ROE 14%); un crecimiento negativo se dibuja en 0. Pasa el cursor para ver el valor real.';
    registerChart('radar', $('#radarChart'), radarConfig);
    registerChart('bars', $('#barChart'), barConfig);
    sel.addEventListener('change', () => { refreshChart('bars'); });
    renderTable();
    renderSlider();
    renderQuiz();
    const select = initTabset($('#dueloTabs'), D.ui.dueloTabs);
    $('#ratioTable').addEventListener('click', (e) => {
      const b = e.target.closest('.rowlink'); if (!b) return;
      cmp.id = b.dataset.id; $('#cmpSel').value = cmp.id; paintSlider(true);
      select(3);
    });
    paintVs();
  }

  /* ==========================================================================
     TABLERO (solo Soriana): año contra año y contra lo ideal
     ========================================================================== */
  const dash = { yi: 2, ci: 1 }; // yi = año elegido, ci = año con el que se compara (índices de D.anios)
  const SB = () => D.base.soriana;
  const yearFill = () => D.anios.map((_, i) => (i === dash.yi ? C.soriana : i === dash.ci ? rgba(C.soriana, 0.45) : rgba('#8e8e93', 0.32)));

  function sparkSVG(vals, color, hi) {
    const pts = vals.map((v, i) => (v == null ? null : [i, v])).filter(Boolean);
    const W = 200, H = 40, pad = 6;
    const xs = (i) => (vals.length === 1 ? W / 2 : (i / (vals.length - 1)) * (W - 2 * pad) + pad);
    const min = Math.min(...pts.map((p) => p[1])), max = Math.max(...pts.map((p) => p[1]));
    const ys = (v) => (max === min ? H / 2 : H - pad - ((v - min) / (max - min)) * (H - 2 * pad));
    const path = pts.map((p, k) => `${k ? 'L' : 'M'}${xs(p[0]).toFixed(1)} ${ys(p[1]).toFixed(1)}`).join(' ');
    const dot = pts.find((p) => p[0] === hi) || pts[pts.length - 1];
    return `<svg class="spark" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" style="--co:${color}" aria-hidden="true" focusable="false">${pts.length > 1 ? `<path class="line" vector-effect="non-scaling-stroke" d="${path}"/>` : ''}<path d="M${xs(dot[0]).toFixed(1)} ${ys(dot[1]).toFixed(1)}h0" stroke="${color}" stroke-width="10" stroke-linecap="round" vector-effect="non-scaling-stroke" fill="none"/></svg>`;
  }

  function gaugeHTML(k, v, color, other) {
    const f = (x) => fv(x, k.unit, k.dec);
    if (v == null) return '<div class="gauge-txt"><span>Sin dato para este año (necesita el año previo)</span></div>';
    const ref = k.ref, span = k.max - k.min;
    const pos = (x) => clamp(((x - k.min) / span) * 100, 0, 100);
    let marker = '', refTxt = '', good = null, status = '';
    if (ref.tipo === 'valor' || ref.tipo === 'umbral') {
      marker = `<i class="gauge-ref" style="left:${pos(ref.v)}%"></i>`;
      good = k.buena === 'alto' ? v >= ref.v : v <= ref.v;
      refTxt = `Ideal · ${ref.txt}: ${f(ref.v)}`;
      status = good ? (k.buena === 'alto' ? 'Supera el ideal' : 'Mejor que el ideal') : (k.buena === 'alto' ? 'Por debajo del ideal' : 'Por encima del ideal');
    } else if (ref.tipo === 'rango') {
      marker = `<i class="gauge-band" style="left:${pos(ref.lo)}%;width:${pos(ref.hi) - pos(ref.lo)}%"></i>`;
      refTxt = `Ideal · ${ref.txt}`;
      if (v >= ref.lo && v <= ref.hi) { good = true; status = 'Dentro del ideal'; }
      else if (v < ref.lo) { good = k.buena === 'bajo'; status = 'Por debajo del rango'; }
      else { good = k.buena === 'alto'; status = 'Por encima del rango'; }
    } else if (ref.tipo === 'par') {
      marker = `<i class="gauge-ref" style="left:${pos(other)}%"></i>`;
      good = k.buena === 'alto' ? v >= other : v <= other;
      refTxt = `Referencia · Chedraui: ${f(other)}`;
      status = good ? 'Mejor que Chedraui' : 'Detrás de Chedraui';
    }
    return `<div class="gauge" style="--co:${color}"><div class="gauge-track" role="img" aria-label="${esc(k.nombre)}: ${f(v)}. ${esc(refTxt)}. ${esc(status)}">${marker}<i class="gauge-dot" style="left:${pos(v)}%"></i></div><div class="gauge-txt"><span>${esc(refTxt)}</span><b class="${good ? 'good' : 'bad'}">${esc(status)}</b></div></div>`;
  }

  function deltaChip(node, v, prev, buena, unit, dec, relative) {
    if (v == null || prev == null) { node.className = 'delta flat'; node.textContent = '— sin dato previo'; node.removeAttribute('title'); return; }
    const diff = relative ? (v / prev - 1) * 100 : v - prev;
    const eps = relative ? 0.05 : Math.pow(10, -dec) / 2;
    const flat = Math.abs(diff) < eps, up = diff > 0;
    const good = buena === 'alto' ? up : !up;
    const unitTxt = relative ? '%' : unit === 'pct' ? ' pp' : unit === 'x' ? 'x' : ' d';
    node.className = 'delta ' + (flat ? 'flat' : good ? 'good' : 'bad');
    node.textContent = `${flat ? '▬' : up ? '▲' : '▼'} ${fmt(Math.abs(diff), relative ? 1 : dec)}${unitTxt} vs ${D.anios[dash.ci]}`;
    node.title = `Frente a ${D.anios[dash.ci]}: ${relative ? fmt(prev) : fv(prev, unit, dec)}`;
  }

  /* configuraciones de las gráficas del tablero */
  function comboConfig() {
    const b = SB(), o = baseOptions('mdp');
    o.scales = {
      x: { grid: { display: false }, border: { display: false } },
      y: { beginAtZero: true, position: 'left', border: { display: false }, grid: { color: cssVar('--line') }, ticks: { callback: (v) => fmt(v) }, title: { display: true, text: 'Ingresos (mdp)' } },
      y1: { beginAtZero: true, position: 'right', border: { display: false }, grid: { display: false }, ticks: { callback: (v) => fmt(v) }, title: { display: true, text: 'Utilidad neta (mdp)' } }
    };
    return { type: 'bar', data: { labels: D.anios.map(String), datasets: [
      { type: 'bar', label: 'Ingresos (mdp)', data: b.ingresos, backgroundColor: yearFill(), borderRadius: 10, borderSkipped: false, maxBarThickness: 80, yAxisID: 'y' },
      { type: 'line', label: 'Utilidad neta (mdp)', data: b.utilidadNeta, borderColor: C.verde, backgroundColor: C.verde, borderWidth: 3, tension: 0.3, pointRadius: (c) => (c.dataIndex === dash.yi ? 8 : 4), yAxisID: 'y1' }
    ] }, options: o };
  }
  function margenConfig() {
    const ids = [['mebitda', 'Margen EBITDA', C.soriana], ['mop', 'Margen operativo', C.verde], ['mneto', 'Margen neto', '#8a9400']];
    const ds = ids.map(([id, label, col]) => ({ label, data: D.anios.map((_, i) => kpiValue('soriana', id, i)), borderColor: col, backgroundColor: col, borderWidth: 3, tension: 0.3, pointRadius: (c) => (c.dataIndex === dash.yi ? 8 : 4) }));
    D.tablero.ideales.forEach((x) => { const col = ids.find((q) => q[0] === x.key)[2]; ds.push({ label: x.txt, data: D.anios.map(() => x.ref), borderColor: rgba(col, 0.55), backgroundColor: 'transparent', borderDash: [7, 6], borderWidth: 2, pointRadius: 0, tension: 0 }); });
    return { type: 'line', data: { labels: D.anios.map(String), datasets: ds }, options: baseOptions('pct') };
  }
  function cicloConfig() {
    const f = (i) => ['dso', 'dio', 'dpo', 'ccc'].map((id) => kpiValue('soriana', id, i));
    const datasets = [bar(`${D.anios[dash.yi]}`, f(dash.yi), C.soriana)];
    if (dash.ci != null) datasets.unshift(bar(`${D.anios[dash.ci]}`, f(dash.ci), rgba(C.soriana, 0.4)));
    return { type: 'bar', data: { labels: ['Cobro a clientes', 'Inventario', 'Pago a proveedores', 'Ciclo de efectivo'].map((s) => wrapLabel(s, 14)), datasets }, options: baseOptions('dias') };
  }
  function estrConfig() {
    const b = SB(), at = (i) => [b.pasivoTotal[i], b.capital[i]];
    const mk = (i, a) => ({ label: String(D.anios[i]), data: at(i), backgroundColor: [rgba(C.soriana, a), rgba(C.verde, a)], borderColor: cssVar('--card'), borderWidth: 3 });
    return { type: 'doughnut', data: { labels: ['Pasivos', 'Capital contable'], datasets: [mk(dash.ci, 0.42), mk(dash.yi, 1)] }, options: {
      responsive: true, maintainAspectRatio: false, animation: animOpt(), cutout: '42%',
      plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8, boxHeight: 8, padding: 16 } },
        tooltip: { padding: 12, cornerRadius: 12, callbacks: { label: (c) => { const tot = c.dataset.data.reduce((x, y) => x + y, 0); return ` ${c.dataset.label} · ${c.label}: ${fmt(c.parsed)} mdp (${fmt((c.parsed / tot) * 100, 1)}%)`; } } } }
    } };
  }

  function renderDashboard() {
    const T = D.tablero;
    $('#dboard').innerHTML = `
      <div class="dk-strip" id="dkStrip"></div>
      <figure class="card dcard dc7"><figcaption><strong>${esc(T.titulos.combo)}</strong><span>${esc(T.subtitulos.combo)}</span></figcaption><div class="chart-box sm"><canvas id="dCombo" role="img" aria-label="Ingresos y utilidad neta de Soriana por año"></canvas></div></figure>
      <figure class="card dcard dc5"><figcaption><strong>${esc(T.titulos.margenes)}</strong><span>${esc(T.subtitulos.margenes)}</span></figcaption><div class="chart-box sm"><canvas id="dMargen" role="img" aria-label="Márgenes de Soriana por año contra el ideal"></canvas></div></figure>
      <div class="card dcard dc5 dgauges"><div class="dg-head"><strong>${esc(T.titulos.ideal)}</strong><span>${esc(T.subtitulos.ideal)}</span></div><div class="grows" id="dGauges"></div></div>
      <figure class="card dcard dc7"><figcaption><strong>${esc(T.titulos.ciclo)}</strong><span>${esc(T.subtitulos.ciclo)}</span></figcaption><div class="chart-box sm fill"><canvas id="dCiclo" role="img" aria-label="Días de cobro, inventario, pago y ciclo de efectivo"></canvas></div></figure>
      <figure class="card dcard dc7"><figcaption><strong>${esc(T.titulos.estructura)}</strong><span id="dEstrCap"></span></figcaption><div class="chart-box sm fill"><canvas id="dEstr" role="img" aria-label="Pasivos y capital contable de Soriana"></canvas></div></figure>`;
    registerChart('d-combo', $('#dCombo'), comboConfig);
    registerChart('d-margen', $('#dMargen'), margenConfig);
    registerChart('d-ciclo', $('#dCiclo'), cicloConfig);
    registerChart('d-estr', $('#dEstr'), estrConfig);

    const yrBtn = (attr, i, on, dis) => `<button type="button" role="radio" data-${attr}="${i}" aria-checked="${on}"${dis ? ' disabled' : ''}>${D.anios[i]}</button>`;
    $('#dashYear').addEventListener('click', (e) => {
      const b = e.target.closest('[data-yi]'); if (!b) return;
      dash.yi = +b.dataset.yi;
      if (dash.ci === dash.yi) dash.ci = dash.yi > 0 ? dash.yi - 1 : 1; // el año de comparación no puede ser el mismo
      paintDash();
    });
    $('#dashCmp').addEventListener('click', (e) => { const b = e.target.closest('[data-ci]'); if (b && !b.disabled) { dash.ci = +b.dataset.ci; paintDash(); } });
    renderDashboard.btn = yrBtn;
    $('#dashFoot').textContent = T.nota;
    paintDash();
  }

  function paintDash() {
    const T = D.tablero, b = SB(), btn = renderDashboard.btn, yi = dash.yi, ci = dash.ci;
    $('#dashYear').innerHTML = D.anios.map((_, i) => btn('yi', i, i === yi, false)).join('');
    $('#dashCmp').innerHTML = D.anios.map((_, i) => btn('ci', i, i === ci, i === yi)).join('');

    // tarjetas de cabecera
    const strip = $('#dkStrip');
    if (!strip.children.length) strip.innerHTML = T.cabecera.map((k) => `<article class="card lift dk" data-f="${k.campo}"><div class="kpi-top"><h3>${esc(k.nombre)}</h3><span class="delta"></span></div><div class="val"></div><div class="spark-wrap"></div></article>`).join('');
    T.cabecera.forEach((k) => {
      const card = $(`[data-f="${k.campo}"]`, strip), series = b[k.campo];
      tween($('.val', card), series[yi], (x) => fmt(Math.round(x)), 800);
      deltaChip($('.delta', card), series[yi], series[ci], 'alto', 'mdp', 0, true);
      $('.spark-wrap', card).innerHTML = sparkSVG(series, C.soriana, yi) + `<div class="spark-lbl">${D.anios.map((a, i) => `<span${i === yi ? ' class="on"' : ''}>${a}</span>`).join('')}</div>`;
    });

    // medidores contra lo ideal
    $('#dGauges').innerHTML = D.kpis.map((k) => {
      const v = kpiValue('soriana', k.id, yi), prev = kpiValue('soriana', k.id, ci);
      const other = k.ref.tipo === 'par' ? kpiValue('chedraui', k.id, yi) : null;
      return `<div class="grow"><div class="grow-top"><span class="gname">${esc(k.nombre)}</span><span class="gval">${v == null ? 'n/d' : fv(v, k.unit, k.dec)}</span><span class="delta" data-k="${k.id}"></span></div>${gaugeHTML(k, v, C.soriana, other)}</div>`;
    }).join('');
    D.kpis.forEach((k) => deltaChip($(`#dGauges [data-k="${k.id}"]`), kpiValue('soriana', k.id, yi), kpiValue('soriana', k.id, ci), k.buena, k.unit, k.dec, false));

    $('#dEstrCap').textContent = `Anillo exterior: ${D.anios[ci]} · interior: ${D.anios[yi]}`;
    ['d-combo', 'd-margen', 'd-ciclo', 'd-estr'].forEach(refreshChart);
  }

  /* ==========================================================================
     PROPUESTA
     ========================================================================== */
  function accCards(items, ok, prefix) {
    return items.map((p, i) => `<article class="pcard"><h3><button class="pcard-top" type="button" aria-expanded="false" aria-controls="${prefix}-${i}"><span class="pletter${ok ? ' ok' : ''}" aria-hidden="true">${i + 1}</span><span class="pname">${esc(p.t)}</span><span class="pchev" aria-hidden="true">+</span></button></h3>
      <div class="pbody" id="${prefix}-${i}" role="region" aria-label="${esc(p.t)}"><div><div class="pbody-in"><p>${esc(p.d)}</p>${p.acciones && p.acciones.length ? `<div><h4>Qué hacer</h4><ul class="acts">${p.acciones.map((a) => `<li>${esc(a)}</li>`).join('')}</ul></div>` : ''}</div></div></div></article>`).join('');
  }
  function bindAcc(box) {
    box.addEventListener('click', (e) => {
      const b = e.target.closest('.pcard-top'); if (!b) return;
      const open = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', open);
      b.closest('.pcard').classList.toggle('open', open);
    });
  }
  function renderPropuesta() {
    $('#propBien').innerHTML = accCards(D.propuesta.bien, true, 'pb');
    $('#propMejora').innerHTML = accCards(D.propuesta.mejora, false, 'pm');
    bindAcc($('#propBien')); bindAcc($('#propMejora'));
    $('#timeline').innerHTML = D.propuesta.roadmap.map((e) => `<li><span class="when">${esc(e.rango)}</span><h3>${esc(e.titulo)}</h3><ul>${e.items.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></li>`).join('');
    $('#metaTable').innerHTML = `<thead><tr><th scope="col">KPI</th><th scope="col">Hoy</th><th scope="col">Meta ilustrativa</th><th scope="col">Cambio</th></tr></thead><tbody>${D.propuesta.kpis.map((k) => {
      const d = k.meta - k.actual, u = k.unit === 'pct' ? '%' : ' d', sign = d > 0 ? '+' : d < 0 ? '−' : '';
      return `<tr><td>${esc(k.nombre)}</td><td>${fmt(k.actual, k.dec)}${u}</td><td class="meta">${fmt(k.meta, k.dec)}${u}</td><td>${sign}${fmt(Math.abs(d), k.dec)}${k.unit === 'pct' ? ' pp' : ' d'}</td></tr>`;
    }).join('')}</tbody>`;
    $('#metaFoot').textContent = D.propuesta.metasNota;
    initTabset($('#propTabs'), D.ui.propTabs);
    renderSim();
  }

  function renderSim() {
    const S = D.propuesta.simulador, sl = S.sliders, box = $('#sim');
    const perDay = S.costoVentas / 365;
    box.innerHTML = `
      <div class="card sim-in">
        <div class="sl"><label for="sDias"><span>Días de inventario</span><output id="oDias" for="sDias"></output></label><input class="rng" type="range" id="sDias" min="${sl.dias.min}" max="${sl.dias.max}" step="${sl.dias.paso}"><p class="hint">Hoy: ${fmt(S.diasActual, 1)} días. Cada día menos libera ≈ ${fmt(perDay)} mdp.</p></div>
        <div class="sl"><label for="sMargen"><span>Margen EBITDA</span><output id="oMargen" for="sMargen"></output></label><input class="rng" type="range" id="sMargen" min="${sl.margen.min}" max="${sl.margen.max}" step="${sl.margen.paso}"><p class="hint">Hoy: ${fmt(S.margenActual, 2)}%. Chedraui 8.4%, Walmex 10.2%.</p></div>
        <div class="sl"><label for="sCrec"><span>Crecimiento de ventas</span><output id="oCrec" for="sCrec"></output></label><input class="rng" type="range" id="sCrec" min="${sl.crec.min}" max="${sl.crec.max}" step="${sl.crec.paso}"><p class="hint">2025: −0.9%. Ingresos base: ${fmt(S.ingresos)} mdp.</p></div>
        <div class="sim-actions"><button type="button" class="pill-btn solid" id="simMeta">Metas del equipo</button><button type="button" class="pill-btn" id="simHoy">Restablecer a hoy</button></div>
      </div>
      <div class="card sim-out">
        <div class="res"><span class="k">Efectivo liberado</span><span class="v" id="rLib"><span id="rLibN"></span> <small>mdp</small></span><span class="d" id="dLib"></span></div>
        <div class="res"><span class="k">EBITDA adicional</span><span class="v" id="rEb"><span id="rEbN"></span> <small>mdp</small></span><span class="d" id="dEb"></span></div>
        <div class="ebitda-bars" aria-hidden="true"><div class="b"><span>EBITDA hoy</span><span class="bar"><i id="bHoy" style="--co:${C.ref}"></i></span><span id="tHoy"></span></div><div class="b"><span>Proyectado</span><span class="bar"><i id="bProy" style="--co:${C.soriana}"></i></span><span id="tProy"></span></div></div>
        <p class="footnote" style="margin:0">${esc(S.nota)}</p>
      </div>`;
    const sD = $('#sDias'), sM = $('#sMargen'), sC = $('#sCrec');
    const fill = (inp) => inp.style.setProperty('--fill', ((inp.value - inp.min) / (inp.max - inp.min)) * 100 + '%');
    const signed = (v, dec = 0) => (v > 0 ? '+' : v < 0 ? '−' : '') + fmt(Math.abs(v), dec);
    const upd = () => {
      const dias = +sD.value, cr = +sC.value;
      const mar = Math.abs(+sM.value - S.margenActual) < 0.006 ? (S.ebitda / S.ingresos) * 100 : +sM.value; // 6.84% es el redondeo del margen real
      [sD, sM, sC].forEach(fill);
      $('#oDias').textContent = `${fmt(dias, 1)} días`; $('#oMargen').textContent = `${fmt(+sM.value, 2)}%`; $('#oCrec').textContent = `${signed(cr, 1)}%`;
      const lib = (S.diasActual - dias) * perDay;
      const ing = S.ingresos * (1 + cr / 100), eb = (ing * mar) / 100, add = eb - S.ebitda;
      const rl = $('#rLib'), re = $('#rEb');
      tween($('#rLibN'), lib, (v) => signed(Math.round(v)), 500);
      tween($('#rEbN'), add, (v) => signed(Math.round(v)), 500);
      rl.className = 'v ' + (lib > 0.5 ? 'pos' : lib < -0.5 ? 'neg' : '');
      re.className = 'v ' + (add > 0.5 ? 'pos' : add < -0.5 ? 'neg' : '');
      $('#dLib').textContent = lib >= 0 ? `(${fmt(S.diasActual, 1)} − ${fmt(dias, 1)}) días × ${fmt(S.costoVentas)} / 365` : 'Más días de inventario inmovilizan efectivo.';
      $('#dEb').textContent = `EBITDA proyectado ${fmt(Math.round(eb))} mdp sobre ingresos de ${fmt(Math.round(ing))} mdp.`;
      const mx = Math.max(S.ebitda, eb) * 1.05;
      $('#bHoy').style.setProperty('--w', (S.ebitda / mx) * 100 + '%'); $('#bProy').style.setProperty('--w', (eb / mx) * 100 + '%');
      $('#tHoy').textContent = fmt(S.ebitda); $('#tProy').textContent = fmt(Math.round(eb));
    };
    const set = (d, m, c) => { sD.value = d; sM.value = m; sC.value = c; upd(); };
    [sD, sM, sC].forEach((i) => i.addEventListener('input', upd));
    $('#simMeta').addEventListener('click', () => set(sl.dias.meta, sl.margen.meta, sl.crec.meta));
    $('#simHoy').addEventListener('click', () => set(S.diasActual, S.margenActual, 0));
    set(sl.dias.meta, sl.margen.meta, sl.crec.meta);
  }

  /* ==========================================================================
     CIERRE
     ========================================================================== */
  function renderCierre() {
    const c = D.cierre;
    $('#closing').innerHTML = `<p class="quote">${esc(c.lema)}</p><div class="paras">${c.conclusion.map((p) => `<p>${esc(p)}</p>`).join('')}</div>`;
    $('#sources').innerHTML = c.fuentes.map((f) => `<li>${f.u ? `<a href="${esc(f.u)}" target="_blank" rel="noopener noreferrer">${esc(f.t)}</a>` : esc(f.t)}</li>`).join('');
    $('#credits').innerHTML = `<h3>Créditos</h3><p class="names">${D.meta.autores.map(esc).join('<br>')}</p>${[[D.meta.materia, D.meta.profesor], [D.meta.institucion], [D.meta.fecha]].map((l) => l.filter(Boolean).join(' · ')).filter(Boolean).map((t) => `<p>${esc(t)}</p>`).join('')}`;
    $('#closeFoot').textContent = c.nota;
  }

  /* ==========================================================================
     SCROLL: progreso, nav activa, parallax, revelado, contadores
     ========================================================================== */
  function setupScroll() {
    const bar = $('#progressBar'), links = $$('[data-nav]');
    const sections = D.nav.map((n) => document.getElementById(n.id));
    let ticking = false;
    const update = () => {
      ticking = false;
      if (document.body.classList.contains('presenting')) return;
      const y = window.scrollY, max = document.documentElement.scrollHeight - innerHeight;
      bar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
      let cur = sections[0].id;
      sections.forEach((s) => { if (s.getBoundingClientRect().top <= innerHeight * 0.4) cur = s.id; });
      links.forEach((a) => { const on = a.dataset.nav === cur; a.classList.toggle('active', on); on ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current'); });
      if (!reduceMq.matches && y < innerHeight * 1.3) root.style.setProperty('--py', y.toFixed(0));
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    addEventListener('resize', update);
    update();

    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      runCounters(e.target);
      io.unobserve(e.target);
    }), { threshold: 0.01, rootMargin: '0px 0px -8% 0px' });
    $$('.reveal').forEach((n) => io.observe(n));
  }

  /* ==========================================================================
     MODO PRESENTACIÓN
     ========================================================================== */
  const pres = { on: false, i: 0, slides: [] };
  function goToSlide(name) {
    const s = $(`[data-slide="${name}"]`); if (!s) return;
    if (pres.on) show(pres.slides.indexOf(s)); else s.scrollIntoView({ behavior: reduceMq.matches ? 'auto' : 'smooth', block: 'start' });
  }
  function currentSlideIdx() {
    const mid = innerHeight * 0.5;
    const i = pres.slides.findIndex((s) => { const r = s.getBoundingClientRect(); return r.top <= mid && r.bottom > mid; });
    return i < 0 ? 0 : i;
  }
  function show(i) {
    pres.i = clamp(i, 0, pres.slides.length - 1);
    pres.slides.forEach((s, k) => s.classList.toggle('active', k === pres.i));
    const s = pres.slides[pres.i];
    s.scrollTop = 0;
    $$('#presDots button').forEach((b, k) => b.setAttribute('aria-selected', k === pres.i));
    $('#presCount').textContent = `${pres.i + 1} / ${pres.slides.length}`;
    s.querySelectorAll('.reveal').forEach((n) => n.classList.add('in'));
    runCounters(s);
    requestAnimationFrame(() => ensureCharts(s));
    const dot = $$('#presDots button')[pres.i]; if (dot) dot.scrollIntoView({ inline: 'center', block: 'nearest' });
  }
  function enterPres() {
    pres.slides = $$('.slide');
    pres.on = true;
    const start = currentSlideIdx();
    document.body.classList.add('presenting');
    $('#presUI').hidden = false;
    $('#presentBtn').setAttribute('aria-pressed', 'true');
    show(start);
  }
  function exitPres() {
    if (!pres.on) return;
    const s = pres.slides[pres.i];
    pres.on = false;
    document.body.classList.remove('presenting');
    pres.slides.forEach((x) => x.classList.remove('active'));
    $('#presUI').hidden = true;
    $('#presentBtn').setAttribute('aria-pressed', 'false');
    if (document.fullscreenElement) document.exitFullscreen?.();
    s.scrollIntoView({ block: 'start' });
  }
  const togglePres = () => (pres.on ? exitPres() : enterPres());
  const toggleFull = () => { if (document.fullscreenElement) document.exitFullscreen?.(); else document.documentElement.requestFullscreen?.().catch(() => {}); };

  function setupPresentation() {
    const slides = $$('.slide');
    $('#presDots').innerHTML = slides.map((s, i) => `<button type="button" role="tab" aria-selected="false" aria-label="Diapositiva ${i + 1}: ${esc((s.querySelector('h1,h2')?.textContent || 'Portada').replace(/\s+/g, ' ').trim())}" data-i="${i}"></button>`).join('');
    $('#presDots').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) show(+b.dataset.i); });
    $('#presentBtn').addEventListener('click', togglePres);
    $('#presPrev').addEventListener('click', () => show(pres.i - 1));
    $('#presNext').addEventListener('click', () => show(pres.i + 1));
    $('#presFull').addEventListener('click', toggleFull);
    $('#presExit').addEventListener('click', exitPres);

    const typing = (t) => t.closest('input,select,textarea,[role=tab],.carousel');
    document.addEventListener('keydown', (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if ($('#canvasDialog').open) return;
      const k = e.key;
      if ((k === 'p' || k === 'P') && !e.target.closest('input[type=text],textarea,select')) { e.preventDefault(); togglePres(); return; }
      if (!pres.on) return;
      if (k === 'Escape') { e.preventDefault(); exitPres(); return; }
      if (k === 'f' || k === 'F') { e.preventDefault(); toggleFull(); return; }
      if (typing(e.target)) return;
      if (k === 'ArrowRight' || k === 'ArrowDown' || k === 'PageDown' || (k === ' ' && !e.shiftKey && !e.target.closest('button,a'))) { e.preventDefault(); show(pres.i + 1); }
      else if (k === 'ArrowLeft' || k === 'ArrowUp' || k === 'PageUp' || (k === ' ' && e.shiftKey && !e.target.closest('button,a'))) { e.preventDefault(); show(pres.i - 1); }
      else if (k === 'Home') { e.preventDefault(); show(0); }
      else if (k === 'End') { e.preventDefault(); show(pres.slides.length - 1); }
    });
    // clic en el fondo de la diapositiva: avanzar (borde izquierdo: retroceder)
    document.addEventListener('click', (e) => {
      if (!pres.on) return;
      const s = e.target.closest('.slide.active'); if (!s) return;
      if (e.target !== s && !e.target.closest('.slide-head')) return;
      if (e.target.closest('a,button,input,select')) return;
      show(pres.i + (e.clientX < innerWidth * 0.18 ? -1 : 1));
    });
    // deslizar en pantallas táctiles
    let tx = null, ty = 0;
    document.addEventListener('touchstart', (e) => { if (pres.on && !e.target.closest('.carousel,input,.table-wrap,.chart-box')) { tx = e.touches[0].clientX; ty = e.touches[0].clientY; } else tx = null; }, { passive: true });
    document.addEventListener('touchend', (e) => {
      if (tx == null) return;
      const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
      if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) show(pres.i + (dx < 0 ? 1 : -1));
      tx = null;
    }, { passive: true });
    document.addEventListener('fullscreenchange', () => $('#presFull').setAttribute('aria-pressed', !!document.fullscreenElement));
  }

  /* ---------- tema claro/oscuro ---------- */
  function setupTheme() {
    try { const t = localStorage.getItem('theme'); if (t === 'dark' || t === 'light') root.dataset.theme = t; } catch (_) { /* sin almacenamiento */ }
    $('#themeBtn').addEventListener('click', () => {
      const next = isDark() ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (_) { /* sin almacenamiento */ }
      requestAnimationFrame(rebuildAllCharts);
    });
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => requestAnimationFrame(rebuildAllCharts));
  }

  /* ---------- arranque ---------- */
  function init() {
    // cada paso va aislado: si uno falla, el resto del sitio sigue funcionando
    const steps = [renderNav, renderHero, renderHeads, renderPerfil, renderDiag, renderModelo, themeChart, renderFinanzas, renderComparacion, renderDashboard, renderPropuesta, renderCierre, setupTheme, setupPresentation, setupScroll];
    let ok = true;
    steps.forEach((fn) => { try { fn(); } catch (e) { ok = false; console.error(`Falló ${fn.name}:`, e); } });
    if (!ok) root.classList.add('no-reveal');
    window.__ready = true;
  }
  init();
})();
