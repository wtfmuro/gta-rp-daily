/* global __TAURI__ */
'use strict';

// ─── Task Definitions ─────────────────────────────────────────────────────────
const TASKS = [
  // ── Лёгкие ──
  { id: 'lottery',      name: 'Купить лотерейный билет',                               bp: 1,  cat: 'easy', max: 0  },
  { id: 'site',         name: 'Посетить любой сайт в браузере',                        bp: 1,  cat: 'easy', max: 0  },
  { id: 'match',        name: 'Поставить лайк любой анкете в Match',                   bp: 1,  cat: 'easy', max: 0  },
  { id: 'brawl',        name: 'Зайти в любой канал в Brawl',                           bp: 1,  cat: 'easy', max: 0  },
  { id: 'cinema',       name: 'Добавить 5 видео в кинотеатре',                         bp: 1,  cat: 'easy', max: 5  },
  { id: 'studio',       name: 'Арендовать киностудию',                                 bp: 2,  cat: 'easy', max: 0  },
  { id: 'football',     name: 'Забить 2 гола в футболе',                               bp: 1,  cat: 'easy', max: 2  },
  { id: 'autoservice',  name: 'Починить деталь в автосервисе',                         bp: 1,  cat: 'easy', max: 0  },
  { id: 'shooting',     name: 'Успешная тренировка в тире',                            bp: 1,  cat: 'easy', max: 0  },
  { id: 'ping_pong',    name: 'Поиграть 1 минуту в настольный теннис',                 bp: 1,  cat: 'easy', max: 0  },
  { id: 'farm',         name: '10 действий на ферме',                                  bp: 1,  cat: 'easy', max: 10 },
  { id: 'casino_zero',  name: 'Нули в казино',                                         bp: 2,  cat: 'easy', max: 0  },
  { id: 'wheel',        name: 'Ставка межсерверное колесо',                            bp: 3,  cat: 'easy', max: 0  },
  { id: 'basketball',   name: 'Забросить 2 мяча в баскетболе',                         bp: 1,  cat: 'easy', max: 2  },
  { id: 'tennis',       name: 'Поиграть 1 минуту в большой теннис',                    bp: 1,  cat: 'easy', max: 0  },
  { id: 'darts',        name: 'Победить в дартс',                                      bp: 1,  cat: 'easy', max: 0  },
  { id: 'volleyball',   name: 'Забить 10 голов в волейболе',                           bp: 1,  cat: 'easy', max: 10 },
  { id: 'leasing',      name: 'Сделать платёж по лизингу',                             bp: 1,  cat: 'easy', max: 0  },
  // ── Средние ──
  { id: 'construction', name: '25 действий на стройке',                                bp: 2,  cat: 'med',  max: 25 },
  { id: 'port',         name: '25 действий в порту',                                   bp: 2,  cat: 'med',  max: 25 },
  { id: 'mine',         name: '25 действий в шахте',                                   bp: 2,  cat: 'med',  max: 25 },
  { id: 'bus',          name: '2 круга на любом маршруте автобусника',                  bp: 2,  cat: 'med',  max: 2  },
  { id: 'club_quest',   name: 'Выполнить 2 квеста любых клубов',                       bp: 4,  cat: 'med',  max: 2  },
  { id: 'metro',        name: 'Проехать 1 станцию на метро',                           bp: 2,  cat: 'med',  max: 0  },
  { id: 'fishing',      name: 'Поймать 20 рыб',                                        bp: 4,  cat: 'med',  max: 20 },
  { id: 'pet_ball',     name: 'Кинуть мяч питомцу 15 раз',                             bp: 2,  cat: 'med',  max: 15 },
  { id: 'pet_cmd',      name: '15 выполненных питомцем команд',                        bp: 2,  cat: 'med',  max: 15 },
  { id: 'gym',          name: '20 подходов в тренажерном зале',                        bp: 1,  cat: 'med',  max: 20 },
  { id: 'treasure',     name: 'Выкопать 1 сокровище',                                  bp: 1,  cat: 'med',  max: 0  },
  { id: 'hunting',      name: '5 раз снять 100% шкуру с животных',                     bp: 2,  cat: 'med',  max: 5  },
  { id: 'trucker',      name: 'Выполнить 3 заказа дальнобойщиком',                     bp: 2,  cat: 'med',  max: 3  },
  // ── Совместные ──
  { id: 'mafia',        name: 'Сыграть в мафию в казино',                              bp: 3,  cat: 'coop', max: 0  },
  { id: 'karting',      name: 'Выиграть гонку в картинге',                             bp: 1,  cat: 'coop', max: 0  },
  { id: 'race',         name: 'Проехать 1 уличную гонку (через тлф. ставка от 1000$)', bp: 1,  cat: 'coop', max: 0  },
  { id: 'training',     name: 'Выиграть 5 игр в тренировочном комплексе (от 100$)',    bp: 1,  cat: 'coop', max: 5  },
  { id: 'arena',        name: 'Выиграть 3 любых игры на арене (от 100$)',               bp: 1,  cat: 'coop', max: 3  },
  { id: 'dance',        name: '3 победы в Данс Баттлах',                               bp: 2,  cat: 'coop', max: 3  },
  { id: 'armwrestling', name: 'Победить в армрестлинге',                               bp: 1,  cat: 'coop', max: 0  },
  { id: 'car_repair',   name: 'Починка авто другому игроку',                           bp: 2,  cat: 'coop', max: 0  },
  // ── Не хочется ──
  { id: 'post',         name: '10 посылок на почте',                                   bp: 1,  cat: 'hard', max: 10 },
  { id: 'case_dp',      name: 'Прокрутить за DP серебряный или золотой кейс',          bp: 10, cat: 'hard', max: 0  },
  { id: 'biz_order',    name: 'Заказ материалов для бизнеса вручную (вкл/выкл)',        bp: 1,  cat: 'hard', max: 0  },
  { id: 'fireman',      name: 'Потушить 25 огоньков пожарным',                         bp: 1,  cat: 'hard', max: 25 },
  { id: 'surgeon',      name: 'Два раза оплатить смену внешности у хирурга в EMS',     bp: 2,  cat: 'hard', max: 2  },
  { id: 'airdrop',      name: 'Принять участие в двух аирдропах',                      bp: 4,  cat: 'hard', max: 2  },
  // ── Фракционные ──
  { id: 'graffiti',     name: '7 закрашенных граффити',                                bp: 1,  cat: 'frac', max: 7  },
  { id: 'contraband',   name: 'Сдать 5 контрабанды',                                   bp: 2,  cat: 'frac', max: 5  },
  { id: 'captwars',     name: 'Участие в каптах/бизварах',                             bp: 1,  cat: 'frac', max: 0  },
  { id: 'hammer',       name: 'Сдать Хаммер с ВЗХ',                                   bp: 3,  cat: 'frac', max: 0  },
  { id: 'medcard',      name: '5 выданных медкарт в EMS',                              bp: 2,  cat: 'frac', max: 5  },
  { id: 'ems_calls',    name: 'Закрыть 15 вызовов в EMS',                              bp: 2,  cat: 'frac', max: 15 },
  { id: 'wn_ads',       name: 'Отредактировать 40 объявлений в WN',                    bp: 2,  cat: 'frac', max: 40 },
  { id: 'locks',        name: 'Взломать 15 замков на ограбах домов или автоугонах',    bp: 2,  cat: 'frac', max: 15 },
  { id: 'codes',        name: 'Закрыть 5 кодов в силовых структурах',                  bp: 2,  cat: 'frac', max: 5  },
  { id: 'lspd_cars',    name: 'Поставить на учет 2 автомобиля (для LSPD)',              bp: 1,  cat: 'frac', max: 2  },
  { id: 'arrest',       name: 'Произвести 1 арест в КПЗ',                              bp: 1,  cat: 'frac', max: 0  },
  { id: 'bail',         name: 'Выкупить двух человек из КПЗ',                          bp: 2,  cat: 'frac', max: 2  },
  { id: 'greenhouse',   name: 'Посадить траву в теплице',                              bp: 4,  cat: 'frac', max: 0  },
  { id: 'lab',          name: 'Запустить переработку обезболивающих в лаборатории',    bp: 4,  cat: 'frac', max: 0  },
];

const CATS = {
  easy: 'Лёгкие',
  med:  'Средние',
  coop: 'Совместные',
  hard: 'Не хочется',
  frac: 'Фракционные',
};

// ─── State ────────────────────────────────────────────────────────────────────
let state = {
  ts:        {},
  vip:       false,
  x2:        false,
  order:     TASKS.map(t => t.id),
  collapsed: {},
};
let saveTimer = null;

window.addEventListener('DOMContentLoaded', async () => {
  await loadState();
  render();
  updateHeader();
});

// ─── Persistence ──────────────────────────────────────────────────────────────
async function loadState() {
  try {
    const raw = await window.__TAURI__.core.invoke('load_state');
    if (raw && raw !== 'null') {
      const s = JSON.parse(raw);
      if (s.ts)                state.ts        = s.ts;
      if (s.vip !== undefined) state.vip       = s.vip;
      if (s.x2  !== undefined) state.x2        = s.x2;
      if (s.order)             state.order     = s.order;
      if (s.collapsed)         state.collapsed = s.collapsed;
    }
  } catch (_) {}
  for (const t of TASKS) {
    if (!state.ts[t.id]) state.ts[t.id] = { done: false, count: 0 };
  }
  const knownIds = TASKS.map(t => t.id);
  const missing  = knownIds.filter(id => !state.order.includes(id));
  state.order = [...state.order.filter(id => knownIds.includes(id)), ...missing];
}

function scheduleSave() {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    try { await window.__TAURI__.core.invoke('save_state', { state: JSON.stringify(state) }); }
    catch (e) { console.error('Save failed:', e); }
  }, 350);
}

// ─── BP & Multipliers ─────────────────────────────────────────────────────────
function isTaskDone(task) {
  const ts = state.ts[task.id];
  return ts.done || (task.max > 0 && ts.count >= task.max);
}
function getMultiplier() {
  let m = 1;
  if (state.vip) m *= 2;
  if (state.x2)  m *= 2;
  return m;
}
function calcBP()    { return TASKS.filter(t => isTaskDone(t)).reduce((s,t) => s+t.bp, 0) * getMultiplier(); }
function calcMaxBP() { return TASKS.reduce((s,t) => s+t.bp, 0) * getMultiplier(); }

function updateHeader() {
  document.getElementById('bp-value').textContent = calcBP();
  document.getElementById('bp-max').textContent   = calcMaxBP();
  const done = TASKS.filter(t => isTaskDone(t)).length;
  document.getElementById('progress-fill').style.width = TASKS.length ? (done/TASKS.length*100)+'%' : '0%';
  document.getElementById('vip-btn').classList.toggle('active', state.vip);
  document.getElementById('x2-btn').classList.toggle('active', state.x2);
}

function updateBadges() {
  const m = getMultiplier();
  for (const t of TASKS) {
    const el = document.getElementById(`badge-${t.id}`);
    if (el) el.textContent = `+${t.bp * m}`;
  }
}

function toggleVIP() { state.vip = !state.vip; updateHeader(); updateBadges(); scheduleSave(); }
function toggleX2()  { state.x2  = !state.x2;  updateHeader(); updateBadges(); scheduleSave(); }

// ─── Task actions ─────────────────────────────────────────────────────────────
function toggleTask(id) {
  const task = TASKS.find(t => t.id === id);
  const ts   = state.ts[id];
  const done = isTaskDone(task);
  if (done) { ts.done = false; ts.count = 0; }
  else if (task.max > 0) ts.count = task.max;
  else ts.done = true;
  refreshCard(id);
  updateHeader();
  scheduleSave();
}

function changeCount(id, delta) {
  const task = TASKS.find(t => t.id === id);
  const ts   = state.ts[id];
  ts.count   = Math.max(0, Math.min(task.max, ts.count + delta));
  refreshCard(id);
  updateHeader();
  scheduleSave();
}

// ─── Render ───────────────────────────────────────────────────────────────────
function orderedByCategory(cat) {
  return state.order.map(id => TASKS.find(t => t.id === id)).filter(t => t && t.cat === cat);
}

function render() {
  const list = document.getElementById('task-list');
  list.innerHTML = '';
  for (const [cat, label] of Object.entries(CATS)) {
    const tasks = orderedByCategory(cat);
    if (!tasks.length) continue;
    list.appendChild(makeCatBlock(cat, label, tasks));
  }
}

function makeCatBlock(cat, label, tasks) {
  const block = document.createElement('div');
  block.className = `cat-block cat-${cat}`;
  block.id        = `block-${cat}`;
  if (state.collapsed[cat]) block.classList.add('collapsed');

  // Header
  const hdr = document.createElement('div');
  hdr.className = 'cat-block-header';
  hdr.addEventListener('click', () => toggleCat(cat));

  const doneCnt = tasks.filter(t => isTaskDone(t)).length;
  const earnedBP = tasks.filter(t => isTaskDone(t)).reduce((s,t) => s + t.bp * getMultiplier(), 0);

  hdr.innerHTML = `
    <div class="cat-left">
      <span class="cat-title">${label}</span>
      <span class="cat-bp">${doneCnt}/${tasks.length}</span>
    </div>
    <div class="cat-right">
      <span class="cat-bp">${earnedBP} BP</span>
      <span class="cat-chevron">▾</span>
    </div>
  `;
  block.appendChild(hdr);

  // Tasks area
  const area = document.createElement('div');
  area.className = 'cat-tasks';
  area.id        = `tasks-${cat}`;
  for (const task of tasks) area.appendChild(makeCard(task));
  block.appendChild(area);

  return block;
}

function toggleCat(cat) {
  state.collapsed[cat] = !state.collapsed[cat];
  const block = document.getElementById(`block-${cat}`);
  if (block) block.classList.toggle('collapsed', !!state.collapsed[cat]);
  scheduleSave();
}

function makeCard(task) {
  const ts   = state.ts[task.id];
  const done = isTaskDone(task);

  const card = document.createElement('div');
  card.className = `task-card${done ? ' done' : ''}`;
  card.id        = `card-${task.id}`;
  card.addEventListener('click', () => toggleTask(task.id));

  const row = document.createElement('div');
  row.className = 'task-row';

  const cb = document.createElement('div');
  cb.className = 'task-cb';
  row.appendChild(cb);

  const name = document.createElement('span');
  name.className   = 'task-name';
  name.textContent = task.name;
  row.appendChild(name);

  const right = document.createElement('div');
  right.className = 'task-right';

  if (task.max > 0) {
    const ctr   = document.createElement('div');
    ctr.className = 'counter';
    const minus = document.createElement('button');
    minus.className = 'ctr-btn'; minus.textContent = '−';
    minus.addEventListener('click', e => { e.stopPropagation(); changeCount(task.id, -1); });
    const val = document.createElement('span');
    val.className = `ctr-val${done ? ' done' : ''}`; val.id = `ctr-${task.id}`;
    val.textContent = `${ts.count}/${task.max}`;
    const plus = document.createElement('button');
    plus.className = 'ctr-btn'; plus.textContent = '+';
    plus.addEventListener('click', e => { e.stopPropagation(); changeCount(task.id, 1); });
    ctr.append(minus, val, plus);
    right.appendChild(ctr);
  }

  const badge = document.createElement('span');
  badge.className = 'bp-badge'; badge.id = `badge-${task.id}`;
  badge.textContent = `+${task.bp * getMultiplier()}`;
  right.appendChild(badge);

  row.appendChild(right);
  card.appendChild(row);
  return card;
}

function refreshCard(id) {
  const task = TASKS.find(t => t.id === id);
  const ts   = state.ts[id];
  const done = isTaskDone(task);
  const card = document.getElementById(`card-${id}`);
  if (!card) return;
  card.className = `task-card${done ? ' done' : ''}`;
  if (task.max > 0) {
    const el = document.getElementById(`ctr-${id}`);
    if (el) { el.textContent = `${ts.count}/${task.max}`; el.className = `ctr-val${done ? ' done' : ''}`; }
  }
}

// ─── Settings ─────────────────────────────────────────────────────────────────
function openSettings() { renderSettings(); document.getElementById('settings-overlay').classList.add('visible'); }
function closeSettings() {
  document.getElementById('settings-overlay').classList.remove('visible');
  render(); scheduleSave();
}

let pdrag = { active: false, id: null, el: null, ghost: null, offsetY: 0, items: [] };

function renderSettings() {
  const list = document.getElementById('settings-list');
  list.innerHTML = '';
  for (const [cat, label] of Object.entries(CATS)) {
    const lbl = document.createElement('div');
    lbl.className = `settings-cat scat-${cat}`;
    lbl.textContent = label;
    list.appendChild(lbl);
    for (const task of orderedByCategory(cat)) {
      const item = document.createElement('div');
      item.className = 'settings-item';
      item.dataset.id = task.id; item.dataset.cat = task.cat;
      item.innerHTML = `<span class="drag-handle">⠿</span><span class="settings-name">${task.name}</span><span class="settings-bp">+${task.bp}</span>`;
      item.querySelector('.drag-handle').addEventListener('pointerdown', e => startDrag(e, task.id, item));
      list.appendChild(item);
    }
  }
}

function startDrag(e, id, el) {
  e.preventDefault();
  const rect = el.getBoundingClientRect();
  pdrag = { active: true, id, el, ghost: null, offsetY: e.clientY - rect.top, items: [] };
  const ghost = el.cloneNode(true);
  ghost.style.cssText = `position:fixed;left:${rect.left}px;top:${rect.top}px;width:${rect.width}px;opacity:.85;pointer-events:none;z-index:1000;border:1px solid var(--accent);background:var(--accent-dim);border-radius:8px;`;
  document.body.appendChild(ghost);
  pdrag.ghost = ghost; el.style.opacity = '.3';
  const cat = TASKS.find(t => t.id === id).cat;
  document.getElementById('settings-list').querySelectorAll('.settings-item').forEach(item => {
    const t = TASKS.find(t => t.id === item.dataset.id);
    if (!t || t.cat !== cat) return;
    const r = item.getBoundingClientRect();
    pdrag.items.push({ id: item.dataset.id, el: item, top: r.top, height: r.height });
  });
  document.addEventListener('pointermove', onDragMove);
  document.addEventListener('pointerup',   onDragEnd);
}

function onDragMove(e) {
  if (!pdrag.active) return;
  pdrag.ghost.style.top = (e.clientY - pdrag.offsetY) + 'px';
  pdrag.items.forEach(it => it.el.classList.toggle('drag-over', it.id !== pdrag.id && e.clientY >= it.top && e.clientY <= it.top + it.height));
}

function onDragEnd(e) {
  if (!pdrag.active) return;
  document.removeEventListener('pointermove', onDragMove);
  document.removeEventListener('pointerup',   onDragEnd);
  let targetId = null;
  pdrag.items.forEach(it => { if (it.id !== pdrag.id && e.clientY >= it.top && e.clientY <= it.top + it.height) targetId = it.id; });
  if (targetId) {
    const si = state.order.indexOf(pdrag.id), di = state.order.indexOf(targetId);
    if (si !== -1 && di !== -1) { state.order.splice(si,1); state.order.splice(di,0,pdrag.id); }
  }
  pdrag.ghost.remove(); pdrag.el.style.opacity = '';
  pdrag.items.forEach(it => it.el.classList.remove('drag-over'));
  pdrag = { active: false, id: null, el: null, ghost: null, offsetY: 0, items: [] };
  renderSettings();
}

// ─── Reset ────────────────────────────────────────────────────────────────────
function confirmReset() { document.getElementById('reset-modal').classList.add('visible'); }
function cancelReset()  { document.getElementById('reset-modal').classList.remove('visible'); }
function doReset() {
  for (const t of TASKS) state.ts[t.id] = { done: false, count: 0 };
  document.getElementById('reset-modal').classList.remove('visible');
  render(); updateHeader(); scheduleSave();
}
