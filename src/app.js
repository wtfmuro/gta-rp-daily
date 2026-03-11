/* global __TAURI__ */
'use strict';

// ─── Task Definitions ─────────────────────────────────────────────────────────
const TASKS = [
  // ── Соло быстрые ──
  { id: 'site',         name: 'Посетить сайт',          hint: 'Посетить любой сайт в браузере',                                          bp: 1,  cat: 'fast', max: 0  },
  { id: 'brawl',        name: 'Зайти в Brawl',          hint: 'Зайти в любой канал в Brawl',                                             bp: 1,  cat: 'fast', max: 0  },
  { id: 'lottery',      name: 'Лотерея',                hint: 'Купить лотерейный билет. Доступно с 10:00 до 23:50',                      bp: 1,  cat: 'fast', max: 0  },
  { id: 'match',        name: 'Лайк в Match',           hint: 'Поставить лайк любой анкете в Match',                                     bp: 1,  cat: 'fast', max: 0  },
  { id: 'case_dp',      name: 'Кейс за DP',             hint: 'Прокрутить за DP серебряный или золотой кейс',                            bp: 10, cat: 'fast', max: 0  },
  { id: 'studio',       name: 'Киностудия',             hint: 'Снять киностудию',                                                        bp: 2,  cat: 'fast', max: 0  },
  { id: 'shooting',     name: 'Тир',                    hint: 'Успешно пройти тренировку в тире',                                        bp: 1,  cat: 'fast', max: 0  },
  { id: 'cinema',       name: 'Кинотеатр',              hint: 'Добавить видео в очередь в кинотеатре',                                   bp: 1,  cat: 'fast', max: 5  },
  { id: 'basketball',   name: 'Баскетбол',              hint: 'Забросить мяч в кольцо в баскетболе',                                     bp: 1,  cat: 'fast', max: 2  },
  { id: 'football',     name: 'Футбол',                 hint: 'Забить гол в футболе',                                                    bp: 1,  cat: 'fast', max: 2  },
  { id: 'volleyball',   name: 'Волейбол',               hint: 'Забить очко в волейболе',                                                 bp: 1,  cat: 'fast', max: 10 },
  { id: 'ping_pong',    name: 'Настольный теннис',      hint: 'Играть в настольный теннис минуту',                                       bp: 1,  cat: 'fast', max: 0  },
  { id: 'tennis',       name: 'Большой теннис',         hint: 'Играть в большой теннис минуту',                                          bp: 1,  cat: 'fast', max: 0  },
  { id: 'wheel',        name: 'Колесо удачи',           hint: 'Сделать ставку 100 фишек в межсерверном колесе удачи в казино',           bp: 3,  cat: 'fast', max: 0  },
  { id: 'autoservice',  name: 'Автосервис (своё)',       hint: 'Починить деталь на своём автомобиле',                                     bp: 1,  cat: 'fast', max: 0  },
  { id: 'darts',        name: 'Дартс',                  hint: 'Победить в дартс',                                                        bp: 1,  cat: 'fast', max: 0  },
  { id: 'metro',        name: 'Метро',                  hint: 'Проехать одну станцию на метро',                                          bp: 2,  cat: 'fast', max: 0  },
  { id: 'bus',          name: 'Автобус',                hint: 'Проехать рейс водителем автобуса',                                        bp: 2,  cat: 'fast', max: 2  },
  { id: 'construction', name: 'Стройка',                hint: 'Совершить действие на стройке',                                           bp: 2,  cat: 'fast', max: 25 },
  { id: 'port',         name: 'Порт',                   hint: 'Совершить действие в порту',                                              bp: 2,  cat: 'fast', max: 25 },
  { id: 'mine',         name: 'Шахта',                  hint: 'Совершить действие на шахте',                                             bp: 2,  cat: 'fast', max: 25 },
  { id: 'farm',         name: 'Ферма',                  hint: 'Совершить действие на ферме',                                             bp: 1,  cat: 'fast', max: 10 },
  { id: 'fishing',      name: 'Рыбалка',                hint: 'Поймать рыбу',                                                            bp: 4,  cat: 'fast', max: 20 },
  // ── Соло долгие ──
  { id: 'trucker',      name: 'Дальнобой',              hint: 'Привезти груз в порт или в бизнес (не в клубы)',                          bp: 2,  cat: 'long', max: 3  },
  { id: 'treasure',     name: 'Сокровище',              hint: 'Найти сокровище (не хлам/семена)',                                        bp: 1,  cat: 'long', max: 0  },
  { id: 'hunting',      name: 'Охота',                  hint: 'Разделать шкуру (100% прочности)',                                        bp: 2,  cat: 'long', max: 5  },
  { id: 'gym',          name: 'Тренажёрка',             hint: 'Сделать подход в любой тренажёрке',                                       bp: 1,  cat: 'long', max: 20 },
  { id: 'club_quest',   name: 'Квесты клубов',          hint: 'Выполнить квест любого клуба',                                            bp: 4,  cat: 'long', max: 2  },
  { id: 'fireman',      name: 'Пожарный',               hint: 'Потушить огонёк',                                                         bp: 1,  cat: 'long', max: 25 },
  { id: 'casino_zero',  name: 'Нули в казино',          hint: 'Выиграть в рулетку на 0 или 00',                                          bp: 2,  cat: 'long', max: 0  },
  // ── Парные ──
  { id: 'race',         name: 'Гонка',                  hint: 'Поучаствовать в гонке со ставкой >1000$',                                 bp: 1,  cat: 'pair', max: 0  },
  { id: 'karting',      name: 'Картинг',                hint: 'Выиграть гонку в картинге. Вход 500$',                                    bp: 1,  cat: 'pair', max: 0  },
  { id: 'arena',        name: 'Арена',                  hint: 'Победить в любом режиме со ставкой >100$',                                bp: 1,  cat: 'pair', max: 3  },
  { id: 'armwrestling', name: 'Армрестлинг',            hint: 'Выиграть в армрестлинге',                                                 bp: 1,  cat: 'pair', max: 0  },
  { id: 'training',     name: 'Тренировочный комплекс', hint: 'Победить со ставкой >100$',                                               bp: 1,  cat: 'pair', max: 5  },
];

const CATS = {
  fast: 'Соло — быстрые',
  long: 'Соло — долгие',
  pair: 'Парные',
};

// ─── State ────────────────────────────────────────────────────────────────────
let state = {
  ts:    {},                         // { [id]: { done: bool, count: int } }
  vip:   false,
  x2:    false,
  order: TASKS.map(t => t.id),
};

let openHint   = null;   // currently expanded hint id
let saveTimer  = null;   // debounce save

// ─── Boot ─────────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', async () => {
  await loadState();
  render();
  updateHeader();
});

// ─── Persistence ─────────────────────────────────────────────────────────────
async function loadState() {
  try {
    const raw = await window.__TAURI__.core.invoke('load_state');
    if (raw && raw !== 'null') {
      const saved = JSON.parse(raw);
      if (saved.ts)               state.ts    = saved.ts;
      if (saved.vip !== undefined) state.vip   = saved.vip;
      if (saved.x2  !== undefined) state.x2    = saved.x2;
      if (saved.order)             state.order = saved.order;
    }
  } catch (_) { /* first run */ }

  // Ensure every task has an entry
  for (const t of TASKS) {
    if (!state.ts[t.id]) state.ts[t.id] = { done: false, count: 0 };
  }

  // Sync order with any newly added tasks
  const knownIds = TASKS.map(t => t.id);
  const missing  = knownIds.filter(id => !state.order.includes(id));
  state.order = [...state.order.filter(id => knownIds.includes(id)), ...missing];
}

function scheduleSave() {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    try {
      await window.__TAURI__.core.invoke('save_state', { state: JSON.stringify(state) });
    } catch (e) { console.error('Save failed:', e); }
  }, 350);
}

// ─── BP & Progress ────────────────────────────────────────────────────────────
function isTaskDone(task) {
  const ts = state.ts[task.id];
  return ts.done || (task.max > 0 && ts.count >= task.max);
}

function calcBP() {
  let base = 0;
  for (const t of TASKS) if (isTaskDone(t)) base += t.bp;
  let mult = 1;
  if (state.vip) mult *= 2;
  if (state.x2)  mult *= 2;
  return base * mult;
}

function calcMaxBP() {
  const base = TASKS.reduce((s, t) => s + t.bp, 0);
  let mult = 1;
  if (state.vip) mult *= 2;
  if (state.x2)  mult *= 2;
  return base * mult;
}

// ─── Header update ────────────────────────────────────────────────────────────
function updateHeader() {
  document.getElementById('bp-value').textContent = calcBP();
  document.getElementById('bp-max').textContent   = calcMaxBP();

  const done = TASKS.filter(t => isTaskDone(t)).length;
  const pct  = TASKS.length ? (done / TASKS.length) * 100 : 0;
  document.getElementById('progress-fill').style.width = pct + '%';

  document.getElementById('vip-btn').classList.toggle('active', state.vip);
  document.getElementById('x2-btn').classList.toggle('active', state.x2);
}

// ─── Multiplier toggles ───────────────────────────────────────────────────────
function getMultiplier() {
  let m = 1;
  if (state.vip) m *= 2;
  if (state.x2)  m *= 2;
  return m;
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

  if (done) {
    // Снимаем галочку — сбрасываем всё
    ts.done  = false;
    ts.count = 0;
  } else {
    if (task.max > 0) {
      // Счётчик — ставим галочку вручную, заполняем до макса
      ts.count = task.max;
    } else {
      ts.done = true;
    }
  }

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

function toggleHint(id) {
  const prev = openHint;
  openHint = (openHint === id) ? null : id;
  if (prev && prev !== openHint) refreshHint(prev);
  refreshHint(id);
}

// ─── Render ───────────────────────────────────────────────────────────────────
function orderedByCategory(cat) {
  return state.order
    .map(id => TASKS.find(t => t.id === id))
    .filter(t => t && t.cat === cat);
}

function render() {
  const list = document.getElementById('task-list');
  list.innerHTML = '';

  for (const [cat, label] of Object.entries(CATS)) {
    const tasks = orderedByCategory(cat);
    if (!tasks.length) continue;

    const hdr = document.createElement('div');
    hdr.className = 'cat-header';
    hdr.innerHTML = `<span class="cat-title">${label}</span><div class="cat-line"></div>`;
    list.appendChild(hdr);

    for (const task of tasks) list.appendChild(makeCard(task));
  }
}

function makeCard(task) {
  const ts   = state.ts[task.id];
  const done = isTaskDone(task);

  const card = document.createElement('div');
  card.className = `task-card${done ? ' done' : ''}`;
  card.id        = `card-${task.id}`;

  // ── Row ──
  const row = document.createElement('div');
  row.className = 'task-row';

  // Checkbox — works for all tasks
  const cb = document.createElement('div');
  cb.className = 'task-cb';
  cb.addEventListener('click', e => { e.stopPropagation(); toggleTask(task.id); });
  row.appendChild(cb);

  // Name
  const name = document.createElement('span');
  name.className   = 'task-name';
  name.textContent = task.name;
  row.appendChild(name);

  // Right side
  const right = document.createElement('div');
  right.className = 'task-right';

  if (task.max > 0) {
    const ctr = document.createElement('div');
    ctr.className = 'counter';

    const minus = document.createElement('button');
    minus.className   = 'ctr-btn';
    minus.textContent = '−';
    minus.addEventListener('click', e => { e.stopPropagation(); changeCount(task.id, -1); });

    const val = document.createElement('span');
    val.className   = `ctr-val${done ? ' done' : ''}`;
    val.id          = `ctr-${task.id}`;
    val.textContent = `${ts.count}/${task.max}`;

    const plus = document.createElement('button');
    plus.className   = 'ctr-btn';
    plus.textContent = '+';
    plus.addEventListener('click', e => { e.stopPropagation(); changeCount(task.id, 1); });

    ctr.append(minus, val, plus);
    right.appendChild(ctr);
  }

  const badge = document.createElement('span');
  badge.className   = 'bp-badge';
  badge.id          = `badge-${task.id}`;
  badge.textContent = `+${task.bp * getMultiplier()}`;
  right.appendChild(badge);

  row.appendChild(right);
  card.appendChild(row);

  // ── Hint ──
  const hint = document.createElement('div');
  hint.className = `task-hint${openHint === task.id ? ' open' : ''}`;
  hint.id        = `hint-${task.id}`;
  hint.innerHTML = `<div class="hint-text">${task.hint}</div>`;
  card.appendChild(hint);

  // Clicking anywhere on the card (except counter buttons) toggles hint
  card.addEventListener('click', () => toggleHint(task.id));

  return card;
}

// Partial DOM updates — avoids full re-render on every tick
function refreshCard(id) {
  const task = TASKS.find(t => t.id === id);
  const ts   = state.ts[id];
  const done = isTaskDone(task);

  const card = document.getElementById(`card-${id}`);
  if (!card) return;

  card.className = `task-card${done ? ' done' : ''}`;

  if (task.max > 0) {
    const el = document.getElementById(`ctr-${id}`);
    if (el) {
      el.textContent = `${ts.count}/${task.max}`;
      el.className   = `ctr-val${done ? ' done' : ''}`;
    }
  }
}

function refreshHint(id) {
  const el = document.getElementById(`hint-${id}`);
  if (el) el.className = `task-hint${openHint === id ? ' open' : ''}`;
}

// ─── Settings ─────────────────────────────────────────────────────────────────
function openSettings() {
  renderSettings();
  document.getElementById('settings-overlay').classList.add('visible');
}

function closeSettings() {
  document.getElementById('settings-overlay').classList.remove('visible');
  render();
  scheduleSave();
}

// Pointer-based drag state
let pdrag = {
  active: false,
  id: null,
  el: null,
  ghost: null,
  startY: 0,
  offsetY: 0,
  items: [],   // [{id, el, top, height}]
};

function renderSettings() {
  const list = document.getElementById('settings-list');
  list.innerHTML = '';

  for (const [cat, label] of Object.entries(CATS)) {
    const catLabel = document.createElement('div');
    catLabel.className   = 'settings-cat';
    catLabel.textContent = label;
    list.appendChild(catLabel);

    for (const task of orderedByCategory(cat)) {
      const item = document.createElement('div');
      item.className    = 'settings-item';
      item.dataset.id   = task.id;
      item.dataset.cat  = task.cat;
      item.innerHTML = `
        <span class="drag-handle">⠿</span>
        <span class="settings-name">${task.name}</span>
        <span class="settings-bp">+${task.bp}</span>
      `;

      const handle = item.querySelector('.drag-handle');
      handle.addEventListener('pointerdown', e => startDrag(e, task.id, item));

      list.appendChild(item);
    }
  }
}

function startDrag(e, id, el) {
  e.preventDefault();
  const rect = el.getBoundingClientRect();

  pdrag.active  = true;
  pdrag.id      = id;
  pdrag.el      = el;
  pdrag.startY  = e.clientY;
  pdrag.offsetY = e.clientY - rect.top;

  // Ghost
  const ghost = el.cloneNode(true);
  ghost.style.cssText = `
    position: fixed;
    left: ${rect.left}px;
    top: ${rect.top}px;
    width: ${rect.width}px;
    opacity: 0.85;
    pointer-events: none;
    z-index: 1000;
    border: 1px solid var(--accent);
    background: var(--accent-dim);
    border-radius: 8px;
    transition: none;
  `;
  document.body.appendChild(ghost);
  pdrag.ghost = ghost;

  el.style.opacity = '0.3';

  // Snapshot positions of all draggable items in same category
  const task   = TASKS.find(t => t.id === id);
  const list   = document.getElementById('settings-list');
  pdrag.items  = [];
  list.querySelectorAll('.settings-item').forEach(item => {
    const t = TASKS.find(t => t.id === item.dataset.id);
    if (!t || t.cat !== task.cat) return;
    const r = item.getBoundingClientRect();
    pdrag.items.push({ id: item.dataset.id, el: item, top: r.top, height: r.height });
  });

  document.addEventListener('pointermove', onDragMove);
  document.addEventListener('pointerup',   onDragEnd);
}

function onDragMove(e) {
  if (!pdrag.active) return;
  const y = e.clientY - pdrag.offsetY;
  pdrag.ghost.style.top = y + 'px';

  // Highlight target
  const midY = e.clientY;
  pdrag.items.forEach(it => {
    if (it.id === pdrag.id) return;
    const isOver = midY >= it.top && midY <= it.top + it.height;
    it.el.classList.toggle('drag-over', isOver);
  });
}

function onDragEnd(e) {
  if (!pdrag.active) return;
  document.removeEventListener('pointermove', onDragMove);
  document.removeEventListener('pointerup',   onDragEnd);

  // Find drop target
  const midY   = e.clientY;
  let targetId = null;
  pdrag.items.forEach(it => {
    if (it.id === pdrag.id) return;
    if (midY >= it.top && midY <= it.top + it.height) targetId = it.id;
  });

  // Reorder
  if (targetId) {
    const srcIdx = state.order.indexOf(pdrag.id);
    const dstIdx = state.order.indexOf(targetId);
    if (srcIdx !== -1 && dstIdx !== -1) {
      state.order.splice(srcIdx, 1);
      state.order.splice(dstIdx, 0, pdrag.id);
    }
  }

  // Cleanup
  pdrag.ghost.remove();
  pdrag.el.style.opacity = '';
  pdrag.items.forEach(it => it.el.classList.remove('drag-over'));
  pdrag = { active: false, id: null, el: null, ghost: null, startY: 0, offsetY: 0, items: [] };

  renderSettings();
}

// ─── Reset ────────────────────────────────────────────────────────────────────
function confirmReset() { document.getElementById('reset-modal').classList.add('visible'); }
function cancelReset()  { document.getElementById('reset-modal').classList.remove('visible'); }

function doReset() {
  for (const t of TASKS) state.ts[t.id] = { done: false, count: 0 };
  openHint = null;
  document.getElementById('reset-modal').classList.remove('visible');
  render();
  updateHeader();
  scheduleSave();
}
