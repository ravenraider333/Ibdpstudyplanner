const EXAM_DATE = new Date("2026-04-27T09:00:00");
const BUILD_VERSION = "2026-03-15.1";
const t = (name, hlOnly = false) => ({ name, hlOnly });

const syllabusCatalog = {
  Maths: { units: { Algebra: [t("Sequences & Series"), t("Exponents & Logs"), t("Binomial Theorem"), t("Proofs")], Functions: [t("Properties of Functions"), t("Quadratics"), t("Rational Functions"), t("Exponent-Log Functions"), t("Transformations")], Geometry: [t("Geometry & Shapes"), t("Trigonometric Functions")], Statistics: [t("Statistics"), t("Bivariate Statistics"), t("Probability"), t("Distributions")], Calculus: [t("Differential Calculus"), t("Integral Calculus"), t("Kinematics")] } },
  Biology: { units: { A: [t("A1.1 Water"), t("A1.2 Nucleic acids"), t("A2.1 Origins of cells", true), t("A2.2 Cell structure"), t("A2.3 Viruses", true), t("A3.1 Diversity of organisms"), t("A3.2 Classification and cladistics", true), t("A4.1 Evolution and speciation"), t("A4.2 Conservation of biodiversity")], B: [t("B1.1 Carbohydrates and lipids"), t("B1.2 Proteins"), t("B2.1 Membranes and membrane transport"), t("B2.2 Organelles and compartmentalization"), t("B2.3 Cell specialization"), t("B3.1 Gas exchange"), t("B3.2 Transport"), t("B3.3 Muscle and motility", true), t("B4.1 Adaptation to environment"), t("B4.2 Ecological niches")], C: [t("C1.1 Enzymes and metabolism"), t("C1.2 Cell respiration"), t("C1.3 Photosynthesis"), t("C2.1 Chemical signalling", true), t("C2.2 Neural signalling"), t("C3.1 Integration of body systems"), t("C3.2 Defence against disease"), t("C4.1 Populations and communities"), t("C4.2 Transfers of energy and matter")], D: [t("D1.1 DNA replication"), t("D1.2 Protein synthesis"), t("D1.3 Mutation and gene editing"), t("D2.1 Cell and nuclear division"), t("D2.2 Gene expression", true), t("D2.3 Water potential"), t("D3.1 Reproduction"), t("D3.2 Inheritance"), t("D3.3 Homeostasis"), t("D4.1 Natural selection"), t("D4.2 Stability and change"), t("D4.3 Climate change")] } },
  German: { units: { Themes: [t("1. Identities"), t("2. Experiences"), t("3. Human Ingenuity"), t("4. Social Organization"), t("5. Sharing the Planet")] } },
  Psychology: { units: { Topics: [t("Biological SAQ's"), t("Cognitive SAQ's"), t("Sociocultural SAQ's"), t("Cognitive ERQ's"), t("Human Relationship ERQ's"), t("Etiology ERQ's"), t("Research Methods"), t("Sampling Techniques"), t("Alternative Research Methods"), t("Ethical Considerations"), t("Discussions (Paper 3)")] } },
  Economics: {
    units: {
      RWE: [t("RWE - Micro"), t("RWE - Macro"), t("RWE - Global")],
      Unit2: [t("2.1 Demand"), t("2.2 Supply"), t("2.3 Equilibrium"), t("2.4 Critique of Maximizing Behaviour", true), t("2.5 Demand Elasticity"), t("2.6 Supply Elasticity"), t("2.7 Role of Government"), t("2.8 Externalities & Common Pool Resources"), t("2.9 Public Goods"), t("2.10 Asymmetric Information", true), t("2.11 Market Power", true), t("2.12 The Market's Inability to Achieve Equity", true)],
      Unit3: [t("3.1 Measuring Economic Activity"), t("3.2 Aggregate Demand & Aggregate Supply"), t("3.3 Macroeconomic Objectives"), t("3.4 Inequality and Poverty"), t("3.5 Monetary Policy"), t("3.6 Fiscal Policy"), t("3.7 Supply-Side Policy")],
      Unit4: [t("4.1 Benefits of International Trade"), t("4.2 Types of Trade Protection"), t("4.3 Arguments For and Against Trade Control/Protection"), t("4.4 Economic Integration"), t("4.5 Exchange Rates"), t("4.6 Balance of Payments"), t("4.7 Sustainable Development"), t("4.8 Measuring Development"), t("4.9 Barriers to Economic Growth and/or Economic Development"), t("4.10 Economic Growth and/or Economic Development Strategies")],
    },
  },
  Physics: { units: { A: [t("A.1 Kinematics"), t("A.2 Forces & momentum"), t("A.3 Work, energy & power"), t("A.4 Rigid body mechanics", true), t("A.5 Relativity", true)], B: [t("B.1 Thermal energy transfers"), t("B.2 Greenhouse effect"), t("B.3 Gas laws"), t("B.4 Thermodynamics", true), t("B.5 Current & circuits")], C: [t("C.1 Simple Harmonic Motion", true), t("C.2 Wave model"), t("C.3 Wave phenomena", true), t("C.4 Standing waves & resonance")], D: [t("D.1 Gravitational fields", true), t("D.2 Electric & magnetic fields", true), t("D.3 Motion in electromagnetic fields"), t("D.4 Induction", true)], E: [t("E.1 Structure of the atom"), t("E.2 Quantum physics", true), t("E.3 Radioactive decay"), t("E.4 Fission"), t("E.5 Fusion & stars")] } },
  Chem: {
    units: {
      Structure: [
        t("Structure 1.1 Particulate nature of matter – notes + Dojo"),
        t("Structure 1.2 Nuclear atom – notes + Dojo"),
        t("Structure 1.3 Electron configuration – notes + Dojo"),
        t("Structure 1.4 The mole – calculations"),
        t("Structure 1.5 Ideal gases – problems"),
        t("Structure 2.1 Ionic model"),
        t("Structure 2.2 Covalent model"),
        t("Structure 2.3 Metallic model"),
        t("Structure 2.4 From models to materials"),
        t("Structure 3.1 Periodic table trends"),
        t("Structure 3.2 Functional groups"),
      ],
      Reactivity: [
        t("Reactivity 1.1 Measuring enthalpy changes"),
        t("Reactivity 1.2 Energy cycles – notes + Dojo"),
        t("Reactivity 1.3 Energy from fuels"),
        t("Reactivity 1.4 Entropy & spontaneity", true),
        t("Reactivity 2.1 Amount of chemical change"),
        t("Reactivity 2.2 Rate of reaction"),
        t("Reactivity 2.3 Extent of reaction"),
        t("Reactivity 3.1 Proton transfer reactions"),
        t("Reactivity 3.2 Electron transfer reactions"),
        t("Reactivity 3.3 Electron sharing reactions"),
        t("Reactivity 3.4 Electron-pair sharing"),
      ],
    },
  },
  Geo: { units: { Unit1: [t("Population and economic development patterns"), t("Changing populations and places"), t("Challenges and opportunities")], Unit2: [t("Causes of global climate change"), t("Consequence of global climate change"), t("Responding to global climate change")], Unit3: [t("Global trends in consumption"), t("Impacts of changing trends in resource consumption"), t("Resource stewardship")], OptionD: [t("Geophysical systems"), t("Geophysical hazard risks"), t("Hazard risk and vulnerability")], OptionF: [t("Future resilience and adaptation"), t("Measuring food and health"), t("Food systems and spread of disease")], OptionG: [t("Variety of urban environments"), t("Changing urban systems"), t("Urban environmental and social stresses"), t("Building sustainable urban systems")] } },
};

const SUBJECTS = Object.keys(syllabusCatalog);
const $ = (s) => document.querySelector(s);
const dayStamp = () => new Date().toISOString().slice(0, 10);
const defaultProfile = () => ({ selectedSubjects: {}, completed: {}, today: [], onboarded: false, updatedAt: 0, dayStamp: dayStamp() });
const state = { code: "", profile: defaultProfile(), timer: 25 * 60, timerRef: null, timerState: "stopped", activeSubject: null, pendingChanges: false };

const setStatus = (m) => { const e = $("#status"); if (e) e.textContent = m; };
function setSyncState(mode, text) {
  const el = $("#sync-state");
  if (!el) return;
  el.className = `sync-state ${mode}`;
  el.textContent = text;
}
function setHeaderAuthActionsEnabled(enabled) {
  const profileBtn = $("#profile-btn");
  const logoutBtn = $("#logout-btn");
  if (!profileBtn || !logoutBtn) return;
  profileBtn.disabled = !enabled;
  logoutBtn.disabled = !enabled;
  profileBtn.setAttribute("aria-hidden", enabled ? "false" : "true");
  logoutBtn.setAttribute("aria-hidden", enabled ? "false" : "true");
}
const sanitize = (c) => c.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 40);
const LOCAL_SCHEMA_VERSION = "v2";
const localKey = (code) => `ibdp:${LOCAL_SCHEMA_VERSION}:${code}`;
const normalizeBackendBaseUrl = (raw) => {
  const val = String(raw || "").trim();
  if (!val) return "";
  return val.replace(/\/+$/, "");
};
const resolveBackendBaseUrl = () => {
  const fromWindow = normalizeBackendBaseUrl(window.IBDP_BACKEND_BASE_URL);
  if (fromWindow) return fromWindow;
  const fromMeta = normalizeBackendBaseUrl(document.querySelector('meta[name="ibdp-backend-base-url"]')?.content);
  return fromMeta;
};
const BACKEND_BASE_URL = resolveBackendBaseUrl();
const apiUrl = (code) => {
  const path = `/api/profile/${encodeURIComponent(code)}`;
  return BACKEND_BASE_URL ? `${BACKEND_BASE_URL}${path}` : path;
};
const localSave = (code, profile) => { try { localStorage.setItem(localKey(code), JSON.stringify(profile)); } catch {} };
const DRAFT_SCHEMA_VERSION = "v1";
const draftKey = (code) => `ibdp:draft:${DRAFT_SCHEMA_VERSION}:${code}`;
const savePendingDraft = (code, profile) => {
  try {
    localStorage.setItem(draftKey(code), JSON.stringify({ profile, savedAt: Date.now() }));
  } catch {}
};
const loadPendingDraft = (code) => {
  try {
    const raw = localStorage.getItem(draftKey(code));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !parsed.profile) return null;
    return { profile: normalize(parsed.profile), savedAt: Number(parsed.savedAt || 0) };
  } catch {
    return null;
  }
};
const clearPendingDraft = (code) => { try { localStorage.removeItem(draftKey(code)); } catch {} };

const BACKEND_SOURCES = [
  {
    name: "primary",
    readUrl: (code) => apiUrl(code),
    writeUrl: (code) => apiUrl(code),
    wrapWrite: true,
  },
];

function extractProfile(payload) {
  if (!payload || typeof payload !== "object") return null;
  if (payload.profile && typeof payload.profile === "object") return normalize(payload.profile);
  if (payload.data && typeof payload.data === "object") {
    if (payload.data.profile && typeof payload.data.profile === "object") return normalize(payload.data.profile);
    if (payload.data.selectedSubjects || payload.data.completed || payload.data.onboarded !== undefined) return normalize(payload.data);
  }
  if (payload.record && typeof payload.record === "object") return normalize(payload.record);
  if (payload.selectedSubjects || payload.completed || payload.onboarded !== undefined) return normalize(payload);
  return null;
}

async function remoteLoad(code) {
  const foundProfiles = [];
  let anyReachable = false;

  for (const source of BACKEND_SOURCES) {
    try {
      const res = await fetch(source.readUrl(code));
      if (!res.ok) continue;
      anyReachable = true;
      const data = await res.json();
      const profile = extractProfile(data);
      if (profile) foundProfiles.push({ source: source.name, profile });
    } catch {}
  }

  if (foundProfiles.length > 0) {
    foundProfiles.sort((a, b) => (Number(b.profile.updatedAt || 0) - Number(a.profile.updatedAt || 0)));
    const best = foundProfiles[0];
    return { ok: true, found: true, profile: best.profile, source: best.source, sources: foundProfiles.map((x) => x.source) };
  }

  return { ok: anyReachable, found: false, profile: null, source: anyReachable ? "reachable-empty" : "none", sources: [] };
}

async function remoteSave(code, profile) {
  const okSources = [];

  for (const source of BACKEND_SOURCES) {
    try {
      const body = source.wrapWrite ? JSON.stringify({ profile }) : JSON.stringify(profile);
      const res = await fetch(source.writeUrl(code), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body,
      });
      if (res.ok) okSources.push(source.name);
    } catch {}
  }

  return { ok: okSources.length > 0, source: okSources[0] || "none", sources: okSources };
}

function normalize(p) { return { selectedSubjects: p?.selectedSubjects || {}, completed: p?.completed || {}, today: Array.isArray(p?.today) ? p.today.slice(0, 3) : [], onboarded: Boolean(p?.onboarded), updatedAt: Number(p?.updatedAt || 0), dayStamp: p?.dayStamp || dayStamp() }; }

function renderPendingBanner() {
  const banner = $("#pending-banner");
  if (!banner) return;
  if (!state.code || !state.pendingChanges) {
    banner.classList.add("hidden");
    return;
  }
  $("#pending-code").textContent = state.code;
  const draft = loadPendingDraft(state.code);
  const when = draft?.savedAt ? new Date(draft.savedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "just now";
  $("#pending-time").textContent = when;
  banner.classList.remove("hidden");
}

function markPending() {
  state.pendingChanges = true;
  if (state.code) savePendingDraft(state.code, state.profile);
  setSyncState("unsynced", "Unsynced / offline");
  renderPendingBanner();
}

function clearPending() {
  if (state.code) clearPendingDraft(state.code);
  state.pendingChanges = false;
  renderPendingBanner();
}

async function persist() {
  if (!state.code) return false;
  state.profile.updatedAt = Date.now();
  const result = await remoteSave(state.code, state.profile);
  if (result.ok) {
    localSave(state.code, state.profile); // cache only (non-authoritative)
    clearPending();
    setStatus("Saved to shared backend.");
    setSyncState("synced", "Synced");
  } else {
    markPending();
    setStatus("Save failed: backend unavailable. Changes are pending and not shared yet.");
  }
  return result.ok;
}
function ensureDailyReset() { const today = dayStamp(); if (state.profile.dayStamp !== today) { state.profile.dayStamp = today; state.profile.today = []; persist(); setStatus("New day detected: daily task selector reset."); } }

function getTasks() {
  const out = [];
  Object.entries(state.profile.selectedSubjects).forEach(([subject, level]) => {
    Object.entries(syllabusCatalog[subject]?.units || {}).forEach(([unit, topics]) => {
      topics.forEach((topicObj) => {
        if (level === "SL" && topicObj.hlOnly) return;
        const id = `${subject}|${level}|${unit}|${topicObj.name}`;
        out.push({ id, subject, level, unit, topic: topicObj.name, done: Boolean(state.profile.completed[id]) });
      });
    });
  });
  return out;
}

function sanitizeTodaySelection(tasks) {
  const valid = new Set(tasks.map((t) => t.id));
  const unique = [];
  state.profile.today.forEach((id) => {
    if (valid.has(id) && !unique.includes(id)) unique.push(id);
  });
  state.profile.today = unique.slice(0, 3);
}

function progressRow(label, done, total) { const pct = total ? Math.round((done / total) * 100) : 0; return `<div class="progress"><div class="meta"><span>${label}</span><strong>${done}/${total} · ${pct}%</strong></div><div class="track"><div class="fill" style="width:${pct}%"></div></div></div>`; }

function renderSubjectPicker() {
  const root = $("#subject-picker");
  root.innerHTML = "";
  SUBJECTS.forEach((subject) => {
    const item = document.createElement("label");
    item.className = "subject-item";
    item.innerHTML = `<input type="checkbox" data-subject="${subject}" ${state.profile.selectedSubjects[subject] ? "checked" : ""}><span>${subject}</span><select data-level="${subject}"><option value="SL" ${(state.profile.selectedSubjects[subject] || "SL") === "SL" ? "selected" : ""}>SL</option><option value="HL" ${(state.profile.selectedSubjects[subject] || "SL") === "HL" ? "selected" : ""}>HL</option></select>`;
    root.appendChild(item);
  });
}

function collectSubjects() {
  const selected = {};
  document.querySelectorAll("input[data-subject]").forEach((i) => {
    if (!i.checked) return;
    const subject = i.dataset.subject;
    const level = document.querySelector(`select[data-level="${CSS.escape(subject)}"]`)?.value || "SL";
    selected[subject] = level;
  });
  return selected;
}

function renderOverview() {
  const tasks = getTasks();
  const done = tasks.filter((t) => t.done).length;
  $("#overall-progress").innerHTML = progressRow("Overall", done, tasks.length);
  const bySubject = {};
  const byUnit = {};
  tasks.forEach((t) => {
    bySubject[t.subject] ??= { done: 0, total: 0 };
    bySubject[t.subject].total += 1;
    if (t.done) bySubject[t.subject].done += 1;
    const unitKey = `${t.subject}: ${t.unit}`;
    byUnit[unitKey] ??= { done: 0, total: 0 };
    byUnit[unitKey].total += 1;
    if (t.done) byUnit[unitKey].done += 1;
  });
  $("#subject-progress").innerHTML = Object.entries(bySubject).map(([s, v]) => progressRow(`${s} (${state.profile.selectedSubjects[s]})`, v.done, v.total)).join("");
  const unitProgress = $("#unit-progress");
  if (unitProgress) {
    unitProgress.innerHTML = Object.entries(byUnit).map(([k, v]) => progressRow(k, v.done, v.total)).join("");
  }
}

function removeTodayTask(id) { state.profile.today = state.profile.today.filter((x) => x !== id); persist(); renderDashboard(); }
function addTodayTask(id) { if (state.profile.today.includes(id)) return; state.profile.today = [...state.profile.today, id].slice(0, 3); persist(); renderDashboard(); }

function taskCard(task) {
  const li = document.createElement("li");
  const statusText = task.done ? "Complete" : "Working on it";
  li.className = `task ${task.done ? "done" : ""}`;
  li.innerHTML = `<div class="handle">⋮⋮</div><div><div class="task-head"><span class="pill">${task.subject}</span><span class="pill ${task.done ? "ok" : "warn"}">${statusText}</span></div><div class="name">${task.topic}</div><small class="muted">${task.unit}</small></div><div class="task-right"></div>`;
  const right = li.querySelector(".task-right");
  const box = document.createElement("input");
  box.type = "checkbox";
  box.checked = task.done;
  box.addEventListener("change", () => { if (box.checked) state.profile.completed[task.id] = true; else delete state.profile.completed[task.id]; persist(); renderDashboard(); });
  right.appendChild(box);
  const del = document.createElement("button");
  del.className = "mini-btn";
  del.type = "button";
  del.textContent = "Delete";
  del.addEventListener("click", () => removeTodayTask(task.id));
  right.appendChild(del);
  return li;
}

function renderSelectorPanel() {
  const tasks = getTasks();
  const nav = $("#subject-nav");
  const browser = $("#topic-browser");
  nav.innerHTML = "";
  browser.innerHTML = "";

  const subjects = Object.keys(state.profile.selectedSubjects);
  if (!state.activeSubject || !subjects.includes(state.activeSubject)) state.activeSubject = subjects[0] || null;

  subjects.forEach((subject) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `subject-tab ${subject === state.activeSubject ? "active" : ""}`;
    btn.textContent = `IB ${subject}`;
    btn.addEventListener("click", () => { state.activeSubject = subject; renderSelectorPanel(); });
    nav.appendChild(btn);
  });

  if (!state.activeSubject) return;
  const subjectTasks = tasks.filter((t) => t.subject === state.activeSubject);
  const grouped = subjectTasks.reduce((acc, task) => {
    acc[task.unit] ??= [];
    acc[task.unit].push(task);
    return acc;
  }, {});

  Object.entries(grouped).forEach(([unit, unitTasks], idx) => {
    const section = document.createElement("section");
    section.className = "topic-unit-section";

    const header = document.createElement("div");
    header.className = "unit-header";
    header.innerHTML = `<span class="unit-kicker">Topic ${idx + 1}</span><strong>${unit}</strong>`;
    section.appendChild(header);

    const grid = document.createElement("div");
    grid.className = "topic-card-grid";

    unitTasks.forEach((task) => {
      const card = document.createElement("article");
      card.className = `topic-card ${task.done ? "completed" : ""}`;
      card.innerHTML = `<h4 class="topic-card-title">${task.topic}</h4><p class="topic-card-meta">${task.subject} • ${task.unit}</p><div class="topic-actions"></div>`;
      const actions = card.querySelector(".topic-actions");

      const markWrap = document.createElement("label");
      markWrap.className = "mark-wrap";
      const mark = document.createElement("input");
      mark.type = "checkbox";
      mark.checked = task.done;
      mark.addEventListener("change", () => { if (mark.checked) state.profile.completed[task.id] = true; else delete state.profile.completed[task.id]; persist(); renderDashboard(); });
      markWrap.appendChild(mark);
      const markText = document.createElement("span");
      markText.textContent = task.done ? "Complete" : "Mark done";
      markWrap.appendChild(markText);
      actions.appendChild(markWrap);

      const add = document.createElement("button");
      add.type = "button";
      add.className = "small";
      add.textContent = state.profile.today.includes(task.id) ? "Added" : "Add to Today";
      add.disabled = state.profile.today.includes(task.id) || state.profile.today.length >= 3;
      add.addEventListener("click", () => addTodayTask(task.id));
      actions.appendChild(add);

      grid.appendChild(card);
    });

    section.appendChild(grid);
    browser.appendChild(section);
  });
}

function renderTodayLists() {
  const all = Object.fromEntries(getTasks().map((t) => [t.id, t]));
  const summary = $("#today-summary");
  summary.innerHTML = "";
  state.profile.today.forEach((id) => {
    const task = all[id];
    if (!task) return;
    summary.appendChild(taskCard(task));
  });
  const counter = $("#today-count");
  if (counter) counter.textContent = `${state.profile.today.length}/3 selected`;
}

function renderMasterChecklist() {
  const root = $("#master-checklist");
  if (!root) return;
  const tasks = getTasks();
  const grouped = {};
  tasks.forEach((task) => {
    grouped[task.subject] ??= {};
    grouped[task.subject][task.unit] ??= [];
    grouped[task.subject][task.unit].push(task);
  });

  root.innerHTML = "";
  Object.entries(grouped).forEach(([subject, units]) => {
    const subjectWrap = document.createElement("details");
    subjectWrap.className = "master-subject";
    subjectWrap.open = subject === state.activeSubject;
    const subjectTasks = Object.values(units).flat();
    const subjectDone = subjectTasks.filter((t) => t.done).length;
    subjectWrap.innerHTML = `<summary>${subject} <span class="muted">${subjectDone}/${subjectTasks.length}</span></summary>`;

    Object.entries(units).forEach(([unit, unitTasks]) => {
      const unitWrap = document.createElement("details");
      unitWrap.className = "master-unit";
      const unitDone = unitTasks.filter((t) => t.done).length;
      unitWrap.innerHTML = `<summary>${unit} <span class="muted">${unitDone}/${unitTasks.length}</span></summary>`;

      const list = document.createElement("ul");
      list.className = "master-list";
      unitTasks.forEach((task) => {
        const li = document.createElement("li");
        li.className = `master-item ${task.done ? "done" : ""}`;
        li.innerHTML = `<label><input type="checkbox" ${task.done ? "checked" : ""}> <span>${task.topic}</span></label>`;
        li.querySelector("input").addEventListener("change", (e) => {
          if (e.target.checked) state.profile.completed[task.id] = true;
          else delete state.profile.completed[task.id];
          persist();
          renderDashboard();
        });
        list.appendChild(li);
      });

      unitWrap.appendChild(list);
      subjectWrap.appendChild(unitWrap);
    });

    root.appendChild(subjectWrap);
  });
}

function renderBadges() {
  const byUnit = {};
  getTasks().forEach((t) => { const key = `${t.subject}: ${t.unit}`; byUnit[key] ??= { done: 0, total: 0 }; byUnit[key].total += 1; if (t.done) byUnit[key].done += 1; });
  $("#unit-badges").innerHTML = Object.entries(byUnit).map(([k, s]) => `<div class="badge ${s.done === s.total ? "complete" : ""}"><strong>${k}</strong><div class="muted">${s.done}/${s.total} tasks complete</div></div>`).join("");
}

function renderDashboard() { ensureDailyReset(); const tasks = getTasks(); sanitizeTodaySelection(tasks); renderOverview(); renderSelectorPanel(); renderTodayLists(); renderMasterChecklist(); renderBadges(); }
function showView(view) { $("#auth-view").classList.add("hidden"); $("#onboarding-view").classList.add("hidden"); $("#dashboard-view").classList.add("hidden"); $(view).classList.remove("hidden"); }
function tickCountdown() { const diff = Math.max(0, EXAM_DATE.getTime() - Date.now()); $("#cd-days").textContent = String(Math.floor(diff / (1000 * 60 * 60 * 24))); $("#cd-hours").textContent = String(Math.floor((diff / (1000 * 60 * 60)) % 24)); $("#cd-mins").textContent = String(Math.floor((diff / (1000 * 60)) % 60)); $("#cd-secs").textContent = String(Math.floor((diff / 1000) % 60)); }
function drawTimer() { const m = String(Math.floor(state.timer / 60)).padStart(2, "0"); const s = String(state.timer % 60).padStart(2, "0"); const el = $("#timer-display"); el.textContent = `${m}:${s}`; el.classList.remove("timer-running", "timer-stopped", "timer-paused"); el.classList.add(`timer-${state.timerState}`); }
function readCustomMinutes() { const parsed = Number($("#timer-custom").value.trim()); return Number.isFinite(parsed) && parsed >= 1 && parsed <= 180 ? parsed : null; }
function applyMinutes(mins) { state.timer = mins * 60; state.timerState = "stopped"; drawTimer(); }

async function login(codeRaw) {
  const code = sanitize(codeRaw);
  if (!code) return;

  const remote = await remoteLoad(code);
  if (!remote.ok) {
    setStatus("Backend unavailable. Cannot log in right now.");
    setSyncState("unsynced", "Offline");
    return;
  }

  if (!remote.found) {
    setStatus("No account found for this code. Use Create account.");
    setSyncState("unsynced", "No account");
    return;
  }

  state.code = code;
  $("#profile-code").textContent = code;
  state.profile = remote.profile;
  localSave(code, state.profile); // cache only (non-authoritative)

  const pendingDraft = loadPendingDraft(code);
  state.pendingChanges = Boolean(pendingDraft);
  if (pendingDraft) {
    setStatus("Logged in. Local unsynced draft exists on this device; review/apply it manually.");
    setSyncState("unsynced", "Draft pending");
  } else {
    setStatus("Logged into existing shared account.");
    setSyncState("synced", "Synced");
  }

  setHeaderAuthActionsEnabled(true);
  if (!state.profile.onboarded) { renderPendingBanner(); renderSubjectPicker(); showView("#onboarding-view"); return; }
  showView("#dashboard-view");
  renderDashboard();
}

async function createAccount(codeRaw) {
  const code = sanitize(codeRaw);
  if (!code) return;

  const remote = await remoteLoad(code);
  if (!remote.ok) {
    setStatus("Backend unavailable. Cannot create account right now.");
    setSyncState("unsynced", "Offline");
    return;
  }

  if (remote.found) {
    setStatus("An account with this code already exists. Use Log in.");
    setSyncState("unsynced", "Account exists");
    return;
  }

  state.code = code;
  $("#profile-code").textContent = code;
  state.profile = defaultProfile();
  state.profile.updatedAt = Date.now();

  const created = await remoteSave(code, state.profile);
  if (!created.ok) {
    state.code = "";
    setStatus("Create failed: backend unavailable.");
    setSyncState("unsynced", "Create failed");
    return;
  }

  localSave(code, state.profile); // cache only (non-authoritative)
  clearPending();
  setHeaderAuthActionsEnabled(true);
  setStatus("Account created on shared backend.");
  setSyncState("synced", "Synced");
  renderPendingBanner();
  renderSubjectPicker();
  showView("#onboarding-view");
}

function bind() {
  $("#auth-form").addEventListener("submit", (e) => e.preventDefault());
  $("#login-btn").addEventListener("click", () => login($("#code-input").value));
  $("#create-btn").addEventListener("click", () => createAccount($("#code-input").value));
  $("#save-onboarding").addEventListener("click", () => {
    if (state.profile.onboarded) { setStatus("Subjects are locked for this account."); showView("#dashboard-view"); renderDashboard(); return; }
    const picked = collectSubjects();
    if (Object.keys(picked).length === 0) { setStatus("Pick at least one subject."); return; }
    state.profile.selectedSubjects = picked;
    state.profile.onboarded = true;
    state.profile.dayStamp = dayStamp();
    state.activeSubject = Object.keys(picked)[0] || null;
    persist();
    showView("#dashboard-view");
    renderDashboard();
  });

  $("#profile-btn").addEventListener("click", () => $("#profile-modal").showModal?.());
  $("#close-profile").addEventListener("click", () => $("#profile-modal").close());
  $("#logout-btn").addEventListener("click", () => { if (state.timerRef) clearInterval(state.timerRef); state.timerRef = null; state.timerState = "stopped"; state.code = ""; state.profile = defaultProfile(); state.activeSubject = null; state.pendingChanges = false; showView("#auth-view"); drawTimer(); renderPendingBanner(); setHeaderAuthActionsEnabled(false); setStatus("Logged out."); setSyncState("unsynced", "Not connected"); });
  $("#retry-sync").addEventListener("click", () => { if (!state.code) return; persist(); });
  $("#apply-draft").addEventListener("click", () => {
    if (!state.code) return;
    const draft = loadPendingDraft(state.code);
    if (!draft) { setStatus("No local pending draft found."); state.pendingChanges = false; renderPendingBanner(); return; }
    state.profile = draft.profile;
    markPending();
    setStatus("Loaded local pending draft (still not synced). Click Sync now to upload.");
    renderDashboard();
  });
  $("#discard-draft").addEventListener("click", () => {
    if (!state.code) return;
    clearPending();
    setStatus("Local pending draft discarded. You are viewing backend data.");
    setSyncState("synced", "Synced");
  });
  window.addEventListener("beforeunload", (event) => {
    if (!state.pendingChanges) return;
    event.preventDefault();
    event.returnValue = "You have unsynced changes that are only stored on this device.";
  });

  document.querySelectorAll(".timer-preset").forEach((btn) => btn.addEventListener("click", () => { document.querySelectorAll(".timer-preset").forEach((b) => b.classList.remove("active")); btn.classList.add("active"); applyMinutes(Number(btn.dataset.mins)); }));
  $("#timer-custom").addEventListener("input", () => { document.querySelectorAll(".timer-preset").forEach((b) => b.classList.remove("active")); const mins = readCustomMinutes(); if (mins && !state.timerRef) applyMinutes(mins); });

  $("#timer-start").addEventListener("click", () => {
    if (state.timerRef) return;
    const custom = readCustomMinutes();
    if (custom && state.timerState === "stopped") state.timer = custom * 60;
    if (state.timer <= 0 || state.timerState === "stopped") {
      if (!custom) {
        const preset = document.querySelector(".timer-preset.active")?.dataset.mins;
        state.timer = (preset ? Number(preset) : 25) * 60;
      }
    }
    state.timerState = "running";
    drawTimer();
    state.timerRef = setInterval(() => {
      state.timer = Math.max(0, state.timer - 1);
      drawTimer();
      if (state.timer === 0) { clearInterval(state.timerRef); state.timerRef = null; state.timerState = "stopped"; drawTimer(); }
    }, 1000);
  });
  $("#timer-pause").addEventListener("click", () => { if (!state.timerRef) return; clearInterval(state.timerRef); state.timerRef = null; state.timerState = "paused"; drawTimer(); });
  $("#timer-reset").addEventListener("click", () => { if (state.timerRef) clearInterval(state.timerRef); state.timerRef = null; const custom = readCustomMinutes(); const preset = document.querySelector(".timer-preset.active")?.dataset.mins; state.timer = (custom || (preset ? Number(preset) : 25)) * 60; state.timerState = "stopped"; drawTimer(); });
}

function init() {
  bind();
  showView("#auth-view");
  setSyncState("unsynced", "Not connected");
  setHeaderAuthActionsEnabled(false);
  renderPendingBanner();
  const buildEl = $("#build-version");
  if (buildEl) buildEl.textContent = `Build ${BUILD_VERSION}`;
  $("#countdown-date").textContent = EXAM_DATE.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
  tickCountdown();
  drawTimer();
  setInterval(tickCountdown, 1000);
}

document.addEventListener("DOMContentLoaded", init);
