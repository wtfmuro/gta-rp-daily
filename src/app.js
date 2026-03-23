/* global __TAURI__ */
'use strict';

// ═══════════════════════════════════════════════════════════════════════════════════
//  FARM BP — Existing task tracker
// ═══════════════════════════════════════════════════════════════════════════════════

// ─── Task Definitions ─────────────────────────────────────────────────────────
const TASKS = [
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
  { id: 'mafia',        name: 'Сыграть в мафию в казино',                              bp: 3,  cat: 'coop', max: 0  },
  { id: 'karting',      name: 'Выиграть гонку в картинге',                             bp: 1,  cat: 'coop', max: 0  },
  { id: 'race',         name: 'Проехать 1 уличную гонку (через тлф. ставка от 1000$)', bp: 1,  cat: 'coop', max: 0  },
  { id: 'training',     name: 'Выиграть 5 игр в тренировочном комплексе (от 100$)',    bp: 1,  cat: 'coop', max: 5  },
  { id: 'arena',        name: 'Выиграть 3 любых игры на арене (от 100$)',               bp: 1,  cat: 'coop', max: 3  },
  { id: 'dance',        name: '3 победы в Данс Баттлах',                               bp: 2,  cat: 'coop', max: 3  },
  { id: 'armwrestling', name: 'Победить в армрестлинге',                               bp: 1,  cat: 'coop', max: 0  },
  { id: 'car_repair',   name: 'Починка авто другому игроку',                           bp: 2,  cat: 'coop', max: 0  },
  { id: 'post',         name: '10 посылок на почте',                                   bp: 1,  cat: 'hard', max: 10 },
  { id: 'case_dp',      name: 'Прокрутить за DP серебряный или золотой кейс',          bp: 10, cat: 'hard', max: 0  },
  { id: 'biz_order',    name: 'Заказ материалов для бизнеса вручную (вкл/выкл)',        bp: 1,  cat: 'hard', max: 0  },
  { id: 'fireman',      name: 'Потушить 25 огоньков пожарным',                         bp: 1,  cat: 'hard', max: 25 },
  { id: 'surgeon',      name: 'Два раза оплатить смену внешности у хирурга в EMS',     bp: 2,  cat: 'hard', max: 2  },
  { id: 'airdrop',      name: 'Принять участие в двух аирдропах',                      bp: 4,  cat: 'hard', max: 2  },
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

// ═══════════════════════════════════════════════════════════════════════════════════
//  TIMERS — New timer feature
// ═══════════════════════════════════════════════════════════════════════════════════

const PRESET_TIMERS = [
  { id: 'pr_org',        name: 'Организация',           duration: 7200 },
  { id: 'pr_mail',       name: 'Почта',                 duration: 600  },
  { id: 'pr_carjacking', name: 'Автоугон',              duration: 5400 },
  { id: 'pr_pimp',       name: 'Сутенерка',             duration: 5400 },
  { id: 'pr_contraband', name: 'Контрабанда',           duration: 300  },
  { id: 'pr_bus',        name: 'Автобус',               duration: 5    },
  { id: 'pr_club',       name: 'Задание клуба',         duration: 7200 },
  { id: 'pr_range',      name: 'Тир',                   duration: 5400 },
  { id: 'pr_sewing',     name: 'Швейка (Деморган)',     duration: 87   },
  { id: 'pr_boxes',      name: 'Коробки (Деморган)',    duration: 67   },
  { id: 'pr_biker',      name: 'Байкерка',              duration: 7200 },
  { id: 'pr_redneck',    name: 'Реднеки',               duration: 7200 },
  { id: 'pr_carmit',     name: 'Кармит',                duration: 7200 },
  { id: 'pr_merryw',     name: 'Меривезер',             duration: 7200 },
  { id: 'pr_epsilon',    name: 'Эпсилон',               duration: 7200 },
  { id: 'pr_pettrain',   name: 'Дрессировки питомца',   duration: 930  },
];

// Timer state: { [id]: { remaining, endTime, intervalId, state: 'idle'|'running'|'paused'|'finished' } }
let timerStates = {};
let customTimers = [];
let timerOrderIds = [];
let timerEditId = null;

// ─── Init ─────────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', async () => {
  await loadState();
  await loadTimers();
  render();
  updateHeader();
  renderTimers();
  requestNotificationPermission();
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

// ─── Timer persistence ────────────────────────────────────────────────────────
async function loadTimers() {
  try {
    const data = await window.__TAURI__.core.invoke('read_custom_timers');
    customTimers = data.timers || [];
    timerOrderIds = data.ordered_ids || [];
  } catch (_) {
    customTimers = [];
    timerOrderIds = [];
  }
  // Build full order: presets first (in saved order if available), then custom
  const allIds = getAllTimerIds();
  const missing = allIds.filter(id => !timerOrderIds.includes(id));
  timerOrderIds = [...timerOrderIds.filter(id => allIds.includes(id)), ...missing];
}

async function saveTimers() {
  try {
    await window.__TAURI__.core.invoke('write_custom_timers', {
      timers: customTimers,
      orderedIds: timerOrderIds,
    });
  } catch (e) { console.error('Timer save failed:', e); }
}

function getAllTimerIds() {
  return [...PRESET_TIMERS.map(t => t.id), ...customTimers.map(t => t.id)];
}

function getTimerById(id) {
  return PRESET_TIMERS.find(t => t.id === id) || customTimers.find(t => t.id === id);
}

function isPresetTimer(id) {
  return PRESET_TIMERS.some(t => t.id === id);
}

// ─── Timer state machine ──────────────────────────────────────────────────────
function getTimerState(id) {
  if (!timerStates[id]) {
    const timer = getTimerById(id);
    timerStates[id] = {
      remaining: timer ? timer.duration : 0,
      endTime: null,
      intervalId: null,
      state: 'idle',
    };
  }
  return timerStates[id];
}

function startTimer(id) {
  const ts = getTimerState(id);
  if (ts.state === 'running') return;
  if (ts.remaining <= 0) {
    ts.remaining = getTimerById(id).duration;
  }
  ts.state = 'running';
  ts.endTime = Date.now() + ts.remaining * 1000;
  ts.intervalId = setInterval(() => tickTimer(id), 1000);
  refreshTimerCard(id);
}

function pauseTimer(id) {
  const ts = getTimerState(id);
  if (ts.state !== 'running') return;
  clearInterval(ts.intervalId);
  ts.intervalId = null;
  ts.remaining = Math.max(0, Math.ceil((ts.endTime - Date.now()) / 1000));
  ts.endTime = null;
  ts.state = 'paused';
  refreshTimerCard(id);
}

function resetTimer(id) {
  const ts = getTimerState(id);
  if (ts.intervalId) clearInterval(ts.intervalId);
  const timer = getTimerById(id);
  timerStates[id] = {
    remaining: timer ? timer.duration : 0,
    endTime: null,
    intervalId: null,
    state: 'idle',
  };
  refreshTimerCard(id);
}

function tickTimer(id) {
  const ts = getTimerState(id);
  if (ts.state !== 'running') return;
  ts.remaining = Math.max(0, Math.ceil((ts.endTime - Date.now()) / 1000));
  updateTimerDisplay(id);
  if (ts.remaining <= 0) {
    clearInterval(ts.intervalId);
    ts.intervalId = null;
    ts.state = 'finished';
    onTimerFinished(id);
  }
}

// ─── Sound ────────────────────────────────────────────────────────────────────
function playTimerSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;

    function beep(freq, start, dur) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.3, now + start);
      gain.gain.exponentialRampToValueAtTime(0.001, now + start + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + start);
      osc.stop(now + start + dur);
    }

    beep(880, 0, 0.15);
    beep(880, 0.2, 0.15);
    beep(1320, 0.4, 0.25);

    setTimeout(() => ctx.close(), 1500);
  } catch (_) {}
}

function onTimerFinished(id) {
  const timer = getTimerById(id);
  if (!timer) return;
  playTimerSound();
  // Try notification
  if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
    try { new Notification(timer.name, { body: 'Таймер завершён' }); } catch (_) {}
  }
  // Fallback: flash card border red
  const card = document.getElementById(`timer-card-${id}`);
  if (card) {
    card.classList.add('finished');
    setTimeout(() => card.classList.remove('finished'), 3000);
  }
  refreshTimerCard(id);
}

function toggleTimer(id) {
  const ts = getTimerState(id);
  if (ts.state === 'running') {
    pauseTimer(id);
  } else {
    startTimer(id);
  }
}

// ─── Visibility change handler ────────────────────────────────────────────────
document.addEventListener('visibilitychange', () => {
  if (document.hidden) return;
  for (const id of Object.keys(timerStates)) {
    const ts = timerStates[id];
    if (ts.state === 'running' && ts.endTime) {
      ts.remaining = Math.max(0, Math.ceil((ts.endTime - Date.now()) / 1000));
      if (ts.remaining <= 0) {
        clearInterval(ts.intervalId);
        ts.intervalId = null;
        ts.state = 'finished';
        onTimerFinished(id);
      }
      refreshTimerCard(id);
    }
  }
});

// ─── Format ───────────────────────────────────────────────────────────────────
function formatTime(secs) {
  if (secs <= 0) return '0:00';
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  return `${m}:${String(s).padStart(2, '0')}`;
}

function parseDuration(str) {
  str = str.trim();
  if (/^\d+$/.test(str)) return parseInt(str, 10);
  const parts = str.split(':').map(Number);
  if (parts.length === 3 && parts.every(n => !isNaN(n))) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2 && parts.every(n => !isNaN(n))) return parts[0] * 60 + parts[1];
  return null;
}

// ─── Render timers ────────────────────────────────────────────────────────────
function renderTimers() {
  const grid = document.getElementById('timer-grid');
  grid.innerHTML = '';
  for (const id of timerOrderIds) {
    const timer = getTimerById(id);
    if (!timer) continue;
    grid.appendChild(makeTimerCard(timer));
  }
}

function makeTimerCard(timer) {
  const ts = getTimerState(timer.id);
  const isPreset = isPresetTimer(timer.id);
  const isRunning = ts.state === 'running';
  const isFinished = ts.state === 'finished';

  const card = document.createElement('div');
  card.className = 'timer-card';
  card.id = `timer-card-${timer.id}`;
  if (isRunning) card.classList.add('active');
  if (isFinished) card.classList.add('finished');
  card.dataset.id = timer.id;

  // Header
  const header = document.createElement('div');
  header.className = 'timer-card-header';

  const handle = document.createElement('span');
  handle.className = 'timer-drag-handle';
  handle.textContent = '⠿';
  header.appendChild(handle);

  // Drag via pointer events on handle
  handle.addEventListener('pointerdown', e => startTimerDrag(e, timer.id, card));

  const name = document.createElement('span');
  name.className = 'timer-name';
  name.textContent = timer.name;
  header.appendChild(name);

  if (!isPreset) {
    const actions = document.createElement('div');
    actions.className = 'timer-actions';

    const editBtn = document.createElement('button');
    editBtn.className = 'timer-action-btn';
    editBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>';
    editBtn.title = 'Редактировать';
    editBtn.addEventListener('click', e => { e.stopPropagation(); openEditTimerModal(timer.id); });
    actions.appendChild(editBtn);

    const delBtn = document.createElement('button');
    delBtn.className = 'timer-action-btn delete';
    delBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>';
    delBtn.title = 'Удалить';
    delBtn.addEventListener('click', e => { e.stopPropagation(); deleteCustomTimer(timer.id); });
    actions.appendChild(delBtn);

    header.appendChild(actions);
  }

  card.appendChild(header);

  // Display
  const display = document.createElement('div');
  display.className = 'timer-display';
  display.id = `timer-display-${timer.id}`;
  display.textContent = formatTime(ts.remaining);
  card.appendChild(display);

  // Controls
  const controls = document.createElement('div');
  controls.className = 'timer-controls';

  const startBtn = document.createElement('button');
  startBtn.className = 'timer-btn-start' + (isRunning ? '' : ' paused');
  startBtn.id = `timer-start-${timer.id}`;
  startBtn.innerHTML = isRunning
    ? '<span>⏸</span> Пауза'
    : '<span>▶</span> Старт';
  startBtn.addEventListener('click', e => { e.stopPropagation(); toggleTimer(timer.id); });
  controls.appendChild(startBtn);

  const resetBtn = document.createElement('button');
  resetBtn.className = 'timer-btn-reset';
  resetBtn.innerHTML = '↺';
  resetBtn.title = 'Сбросить';
  resetBtn.addEventListener('click', e => { e.stopPropagation(); resetTimer(timer.id); });
  controls.appendChild(resetBtn);

  card.appendChild(controls);
  return card;
}

function refreshTimerCard(id) {
  const oldCard = document.getElementById(`timer-card-${id}`);
  if (!oldCard) return;
  const timer = getTimerById(id);
  if (!timer) return;
  const newCard = makeTimerCard(timer);
  oldCard.replaceWith(newCard);
}

function updateTimerDisplay(id) {
  const el = document.getElementById(`timer-display-${id}`);
  if (!el) return;
  const ts = getTimerState(id);
  el.textContent = formatTime(ts.remaining);
}

// ─── Timer CRUD ───────────────────────────────────────────────────────────────
function openTimerModal(editId) {
  timerEditId = editId || null;
  const titleEl = document.getElementById('timer-modal-title');
  const nameInput = document.getElementById('timer-name-input');
  const durInput = document.getElementById('timer-duration-input');
  const errEl = document.getElementById('timer-error');

  errEl.textContent = '';
  if (timerEditId) {
    const timer = customTimers.find(t => t.id === timerEditId);
    titleEl.textContent = 'Редактировать таймер';
    nameInput.value = timer ? timer.name : '';
    durInput.value = timer ? formatTime(timer.duration) : '';
  } else {
    titleEl.textContent = 'Добавить таймер';
    nameInput.value = '';
    durInput.value = '';
  }
  document.getElementById('timer-modal').classList.add('visible');
  nameInput.focus();
}

function openEditTimerModal(id) {
  const ts = getTimerState(id);
  if (ts.state === 'running') pauseTimer(id);
  openTimerModal(id);
}

function closeTimerModal() {
  document.getElementById('timer-modal').classList.remove('visible');
  timerEditId = null;
}

function saveTimerModal() {
  const nameInput = document.getElementById('timer-name-input');
  const durInput = document.getElementById('timer-duration-input');
  const errEl = document.getElementById('timer-error');

  const name = nameInput.value.trim();
  const duration = parseDuration(durInput.value);

  if (!name) { errEl.textContent = 'Введите название'; return; }
  if (duration === null || duration <= 0) { errEl.textContent = 'Неверный формат длительности'; return; }

  if (timerEditId) {
    const timer = customTimers.find(t => t.id === timerEditId);
    if (timer) {
      timer.name = name;
      timer.duration = duration;
      resetTimer(timer.id);
    }
  } else {
    const id = 'custom_' + Date.now();
    customTimers.push({ id, name, duration });
    timerOrderIds.push(id);
  }

  saveTimers();
  closeTimerModal();
  renderTimers();
}

function deleteCustomTimer(id) {
  const ts = getTimerState(id);
  if (ts.intervalId) clearInterval(ts.intervalId);
  delete timerStates[id];
  customTimers = customTimers.filter(t => t.id !== id);
  timerOrderIds = timerOrderIds.filter(i => i !== id);
  saveTimers();
  renderTimers();
}

// ─── Timer drag-and-drop (pointer events) ─────────────────────────────────────
let tdrg = { active: false, id: null, el: null, ghost: null, offsetY: 0, items: [] };

function startTimerDrag(e, id, el) {
  e.preventDefault();
  e.stopPropagation();
  const rect = el.getBoundingClientRect();
  tdrg = { active: true, id, el, ghost: null, offsetY: e.clientY - rect.top, items: [] };
  const ghost = el.cloneNode(true);
  ghost.style.cssText = `position:fixed;left:${rect.left}px;top:${rect.top}px;width:${rect.width}px;opacity:.85;pointer-events:none;z-index:1000;outline:2px solid #4CAF50;border-radius:8px;`;
  document.body.appendChild(ghost);
  tdrg.ghost = ghost;
  el.classList.add('dragging');

  document.querySelectorAll('.timer-card').forEach(card => {
    const cid = card.dataset.id;
    if (!cid || cid === id) return;
    const r = card.getBoundingClientRect();
    tdrg.items.push({ id: cid, el: card, top: r.top, height: r.height });
  });

  document.addEventListener('pointermove', onTimerDragMove);
  document.addEventListener('pointerup', onTimerDragEnd);
}

function onTimerDragMove(e) {
  if (!tdrg.active) return;
  tdrg.ghost.style.top = (e.clientY - tdrg.offsetY) + 'px';
  tdrg.items.forEach(it => {
    it.el.classList.toggle('drag-over-card',
      it.id !== tdrg.id && e.clientY >= it.top && e.clientY <= it.top + it.height
    );
  });
}

function onTimerDragEnd(e) {
  if (!tdrg.active) return;
  document.removeEventListener('pointermove', onTimerDragMove);
  document.removeEventListener('pointerup', onTimerDragEnd);

  let targetId = null;
  tdrg.items.forEach(it => {
    if (it.id !== tdrg.id && e.clientY >= it.top && e.clientY <= it.top + it.height) {
      targetId = it.id;
    }
  });

  if (targetId) {
    const si = timerOrderIds.indexOf(tdrg.id);
    const di = timerOrderIds.indexOf(targetId);
    if (si !== -1 && di !== -1) {
      timerOrderIds.splice(si, 1);
      timerOrderIds.splice(di, 0, tdrg.id);
      saveTimers();
    }
  }

  tdrg.ghost.remove();
  tdrg.el.classList.remove('dragging');
  tdrg.items.forEach(it => it.el.classList.remove('drag-over-card'));
  tdrg = { active: false, id: null, el: null, ghost: null, offsetY: 0, items: [] };
  renderTimers();
}

// ─── Notifications ────────────────────────────────────────────────────────────
function requestNotificationPermission() {
  if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

// ═══════════════════════════════════════════════════════════════════════════════════
//  NAVIGATION — Dock bar
// ═══════════════════════════════════════════════════════════════════════════════════

function switchView(view) {
  const farmView = document.getElementById('farm-bp-view');
  const timersView = document.getElementById('timers-view');
  const dockFarm = document.getElementById('dock-farm');
  const dockTimers = document.getElementById('dock-timers');

  if (view === 'farm') {
    farmView.classList.remove('hidden');
    timersView.classList.add('hidden');
    dockFarm.classList.add('active');
    dockTimers.classList.remove('active');
  } else {
    farmView.classList.add('hidden');
    timersView.classList.remove('hidden');
    dockFarm.classList.remove('active');
    dockTimers.classList.add('active');
  }
}

// ═══════════════════════════════════════════════════════════════════════════════════
//  FARM BP — Existing functions
// ═══════════════════════════════════════════════════════════════════════════════════

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

  hdr.innerHTML = `
    <div class="cat-left">
      <span class="cat-title">${label}</span>
      <span class="cat-bp">${doneCnt}/${tasks.length}</span>
    </div>
    <div class="cat-right">
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
