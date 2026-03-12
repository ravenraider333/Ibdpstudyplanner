const EXAM_DATE = new Date("2026-04-27T09:00:00");
const BACKEND_URL = "https://jsonblob.com/api/jsonBlob";
const t = (name, hlOnly = false) => ({ name, hlOnly });

const syllabusCatalog = {
  Maths: {
    units: {
      Algebra: [t("Sequences & Series"), t("Exponents & Logs"), t("Binomial Theorem"), t("Proofs")],
      Functions: [t("Properties of Functions"), t("Quadratics"), t("Rational Functions"), t("Exponent-Log Functions"), t("Transformations")],
      Geometry: [t("Geometry & Shapes"), t("Trigonometric Functions")],
      Statistics: [t("Statistics"), t("Bivariate Statistics"), t("Probability"), t("Distributions")],
      Calculus: [t("Differential Calculus"), t("Integral Calculus")],
      Mechanics: [t("Kinematics")],
    },
  },
  Biology: {
    units: {
      A: [t("A1.1 Water"), t("A1.2 Nucleic acids"), t("A2.1 Origins of cells", true), t("A2.2 Cell structure"), t("A2.3 Viruses", true), t("A3.1 Diversity of organisms"), t("A3.2 Classification and cladistics", true), t("A4.1 Evolution and speciation"), t("A4.2 Conservation of biodiversity")],
      B: [t("B1.1 Carbohydrates and lipids"), t("B1.2 Proteins"), t("B2.1 Membranes and membrane transport"), t("B2.2 Organelles and compartmentalization"), t("B2.3 Cell specialization"), t("B3.1 Gas exchange"), t("B3.2 Transport"), t("B3.3 Muscle and motility", true), t("B4.1 Adaptation to environment"), t("B4.2 Ecological niches")],
      C: [t("C1.1 Enzymes and metabolism"), t("C1.2 Cell respiration"), t("C1.3 Photosynthesis"), t("C2.1 Chemical signalling", true), t("C2.2 Neural signalling"), t("C3.1 Integration of body systems"), t("C3.2 Defence against disease"), t("C4.1 Populations and communities"), t("C4.2 Transfers of energy and matter")],
      D: [t("D1.1 DNA replication"), t("D1.2 Protein synthesis"), t("D1.3 Mutation and gene editing"), t("D2.1 Cell and nuclear division"), t("D2.2 Gene expression", true), t("D2.3 Water potential"), t("D3.1 Reproduction"), t("D3.2 Inheritance"), t("D3.3 Homeostasis"), t("D4.1 Natural selection"), t("D4.2 Stability and change"), t("D4.3 Climate change")],
    },
  },
  German: { units: { Themes: [t("1. Identities"), t("2. Experiences"), t("3. Human Ingenuity"), t("4. Social Organization"), t("5. Sharing the Planet")] } },
  Psychology: { units: { Topics: [t("Biological SAQ's"), t("Cognitive SAQ's"), t("Sociocultural SAQ's"), t("Cognitive ERQ's"), t("Human Relationship ERQ's"), t("Etiology ERQ's"), t("Research Methods"), t("Sampling Techniques"), t("Alternative Research Methods"), t("Ethical Considerations"), t("Discussions (Paper 3)")] } },
  Economics: {
    units: {
      RWE: [t("RWE - Micro"), t("RWE - Macro"), t("RWE - Global")],
      Unit2: [t("2.1 Demand"), t("2.2 Supply"), t("2.3 Equilibrium"), t("2.4 Critique of Maximizing Behaviour", true), t("2.5 Demand Elasticity"), t("2.6 Supply Elasticity"), t("2.7 Role of Government")],
      Unit3: [t("3.1 Measuring Economic Activity"), t("3.2 Aggregate Demand & Aggregate Supply"), t("3.3 Macroeconomic Objectives"), t("3.4 Inequality and Poverty"), t("3.5 Monetary Policy"), t("3.6 Fiscal Policy")],
      Unit4: [t("4.1 Benefits of International Trade"), t("4.2 Types of Trade Protection"), t("4.3 Arguments For and Against Trade Control/Protection"), t("4.4 Economic Integration"), t("4.5 Exchange Rates"), t("4.6 Balance of Payments")],
    },
  },
  Physics: {
    units: {
      A: [t("A.1 Kinematics"), t("A.2 Forces & momentum"), t("A.3 Work, energy & power"), t("A.4 Rigid body mechanics", true), t("A.5 Relativity", true)],
      B: [t("B.1 Thermal energy transfers"), t("B.2 Greenhouse effect"), t("B.3 Gas laws"), t("B.4 Thermodynamics", true), t("B.5 Current & circuits")],
      C: [t("C.1 Simple Harmonic Motion", true), t("C.2 Wave model"), t("C.3 Wave phenomena", true), t("C.4 Standing waves & resonance")],
      D: [t("D.1 Gravitational fields", true), t("D.2 Electric & magnetic fields", true), t("D.3 Motion in electromagnetic fields"), t("D.4 Induction", true)],
      E: [t("E.1 Structure of the atom"), t("E.2 Quantum physics", true), t("E.3 Radioactive decay"), t("E.4 Fission"), t("E.5 Fusion & stars")],
    },
  },
  Chem: {
    units: {
      Structure: [t("Structure 1.1 Particulate nature of matter"), t("Structure 1.2 Nuclear atom"), t("Structure 1.3 Electron configuration"), t("Structure 1.4 The mole"), t("Structure 1.5 Ideal gases"), t("Structure 2.1 Ionic model"), t("Structure 2.2 Covalent model"), t("Structure 2.3 Metallic model")],
      Reactivity: [t("Reactivity 1.1 Measuring enthalpy changes"), t("Reactivity 1.2 Energy cycles"), t("Reactivity 1.3 Energy from fuels"), t("Reactivity 1.4 Entropy & spontaneity", true), t("Reactivity 2.1 Amount of chemical change"), t("Reactivity 2.2 Rate of reaction"), t("Reactivity 2.3 Extent of reaction")],
    },
  },
  Geo: {
    units: {
      Unit1: [t("Population and economic development patterns"), t("Changing populations and places"), t("Challenges and opportunities")],
      Unit2: [t("Causes of global climate change"), t("Consequence of global climate change"), t("Responding to global climate change")],
      Unit3: [t("Global trends in consumption"), t("Impacts of changing trends in resource consumption"), t("Resource stewardship")],
      OptionD: [t("Geophysical systems"), t("Geophysical hazard risks"), t("Hazard risk and vulnerability")],
      OptionF: [t("Future resilience and adaptation"), t("Measuring food and health"), t("Food systems and spread of disease")],
      OptionG: [t("Variety of urban environments"), t("Changing urban systems"), t("Urban environmental and social stresses"), t("Building sustainable urban systems")],
    },
  },
};

const SUBJECTS = Object.keys(syllabusCatalog);
const $ = (s) => document.querySelector(s);
const defaultProfile = () => ({ selectedSubjects: {}, completed: {}, today: [], onboarded: false });
const state = { code: "", profile: defaultProfile(), timer: 25 * 60, timerRef: null };

const setStatus = (m) => { const e = $("#status"); if (e) e.textContent = m; };
const sanitize = (c) => c.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 40);
const localKey = (code) => `ibdp:${code}`;
const cloudUrl = (code) => `${BACKEND_URL}/ibdpstudyplanner-${code}`;

const localLoad = (code) => { try { return JSON.parse(localStorage.getItem(localKey(code)) || "null"); } catch { return null; } };
const localSave = (code, p) => { try { localStorage.setItem(localKey(code), JSON.stringify(p)); } catch {} };

async function cloudLoad(code) {
  try {
    const res = await fetch(cloudUrl(code));
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

async function cloudSave(code, profile) {
  try {
    const res = await fetch(cloudUrl(code), { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(profile) });
    return res.ok;
  } catch { return false; }
}

function normalize(p) {
  return {
    selectedSubjects: p?.selectedSubjects || {},
    completed: p?.completed || {},
    today: Array.isArray(p?.today) ? p.today.slice(0, 3) : [],
    onboarded: Boolean(p?.onboarded),
  };
}

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

function progressRow(label, done, total) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return `<div class="progress"><div class="meta"><span>${label}</span><strong>${done}/${total}</strong></div><div class="track"><div class="fill" style="width:${pct}%"></div></div></div>`;
}

function persist() {
  if (!state.code) return;
  localSave(state.code, state.profile);
  cloudSave(state.code, state.profile).then((ok) => setStatus(ok ? "Cloud sync loaded." : "Cloud unavailable; saved on this device."));
}

function renderSubjectPicker() {
  const root = $("#subject-picker");
  root.innerHTML = "";
  SUBJECTS.forEach((subject) => {
    const item = document.createElement("label");
    item.className = "subject-item";
    item.innerHTML = `
      <input type="checkbox" data-subject="${subject}" ${state.profile.selectedSubjects[subject] ? "checked" : ""}>
      <span>${subject}</span>
      <select data-level="${subject}">
        <option value="SL" ${(state.profile.selectedSubjects[subject] || "SL") === "SL" ? "selected" : ""}>SL</option>
        <option value="HL" ${(state.profile.selectedSubjects[subject] || "SL") === "HL" ? "selected" : ""}>HL</option>
      </select>
    `;
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
  tasks.forEach((t) => {
    bySubject[t.subject] ??= { done: 0, total: 0 };
    bySubject[t.subject].total += 1;
    if (t.done) bySubject[t.subject].done += 1;
  });
  $("#subject-progress").innerHTML = Object.entries(bySubject).map(([s, v]) => progressRow(`${s} (${state.profile.selectedSubjects[s]})`, v.done, v.total)).join("");
}

function toggleTask(id, checked) {
  if (checked) state.profile.completed[id] = true;
  else delete state.profile.completed[id];
  persist();
  renderDashboard();
}

function renderDailyBuilder() {
  const form = $("#daily-form");
  form.innerHTML = "";
  const openTasks = getTasks().filter((t) => !t.done);

  for (let i = 0; i < 3; i += 1) {
    const select = document.createElement("select");
    select.innerHTML = `<option value="">Pick focus #${i + 1}</option>${openTasks.map((t) => `<option value="${t.id}">${t.subject} • ${t.topic}</option>`).join("")}`;
    select.value = state.profile.today[i] || "";
    select.addEventListener("change", () => {
      const next = [...state.profile.today];
      next[i] = select.value;
      state.profile.today = [...new Set(next.filter(Boolean))].slice(0, 3);
      persist();
      renderDashboard();
    });
    form.appendChild(select);
  }
}

function renderTodayLists() {
  const all = Object.fromEntries(getTasks().map((t) => [t.id, t]));
  const mk = (task) => {
    const li = document.createElement("li");
    li.className = `task ${task.done ? "done" : ""}`;
    li.innerHTML = `<div><div class="name">${task.topic}</div><small class="muted">${task.subject}</small></div>`;
    const box = document.createElement("input");
    box.type = "checkbox";
    box.checked = task.done;
    box.addEventListener("change", () => toggleTask(task.id, box.checked));
    li.appendChild(box);
    return li;
  };

  const list = $("#today-list");
  const summary = $("#today-summary");
  list.innerHTML = "";
  summary.innerHTML = "";

  state.profile.today.forEach((id) => {
    const task = all[id];
    if (!task) return;
    list.appendChild(mk(task));
    summary.appendChild(mk(task));
  });
}

function renderBadges() {
  const byUnit = {};
  getTasks().forEach((t) => {
    const key = `${t.subject}: ${t.unit}`;
    byUnit[key] ??= { done: 0, total: 0 };
    byUnit[key].total += 1;
    if (t.done) byUnit[key].done += 1;
  });
  $("#unit-badges").innerHTML = Object.entries(byUnit)
    .map(([k, s]) => `<div class="badge ${s.done === s.total ? "complete" : ""}"><strong>${k}</strong><div class="muted">${s.done}/${s.total} tasks complete</div></div>`)
    .join("");
}

function renderDashboard() {
  renderOverview();
  renderDailyBuilder();
  renderTodayLists();
  renderBadges();
}

function showView(view) {
  $("#auth-view").classList.add("hidden");
  $("#onboarding-view").classList.add("hidden");
  $("#dashboard-view").classList.add("hidden");
  $(view).classList.remove("hidden");
}

function tickCountdown() {
  const diff = Math.max(0, EXAM_DATE.getTime() - Date.now());
  $("#cd-days").textContent = String(Math.floor(diff / (1000 * 60 * 60 * 24)));
  $("#cd-hours").textContent = String(Math.floor((diff / (1000 * 60 * 60)) % 24));
  $("#cd-mins").textContent = String(Math.floor((diff / (1000 * 60)) % 60));
  $("#cd-secs").textContent = String(Math.floor((diff / 1000) % 60));
}

function drawTimer() {
  const m = String(Math.floor(state.timer / 60)).padStart(2, "0");
  const s = String(state.timer % 60).padStart(2, "0");
  $("#timer-display").textContent = `${m}:${s}`;
}

async function login(codeRaw) {
  const code = sanitize(codeRaw);
  if (!code) return;
  state.code = code;
  $("#profile-code").textContent = code;

  const cloud = await cloudLoad(code);
  const local = localLoad(code);
  state.profile = normalize(cloud || local || defaultProfile());

  if (cloud) setStatus("Cloud account loaded.");
  else if (local) setStatus("Local account loaded (cloud not reachable).");
  else setStatus("New account created.");

  localSave(code, state.profile);
  if (!state.profile.onboarded) {
    renderSubjectPicker();
    showView("#onboarding-view");
    return;
  }

  showView("#dashboard-view");
  renderDashboard();
}

function bind() {
  $("#auth-form").addEventListener("submit", (e) => {
    e.preventDefault();
    login($("#code-input").value);
  });

  $("#save-onboarding").addEventListener("click", () => {
    if (state.profile.onboarded) {
      setStatus("Subjects are locked for this account.");
      showView("#dashboard-view");
      renderDashboard();
      return;
    }

    const picked = collectSubjects();
    if (Object.keys(picked).length === 0) {
      setStatus("Pick at least one subject.");
      return;
    }

    state.profile.selectedSubjects = picked;
    state.profile.onboarded = true;
    persist();
    showView("#dashboard-view");
    renderDashboard();
  });

  $("#profile-btn").addEventListener("click", () => $("#profile-modal").showModal?.());
  $("#close-profile").addEventListener("click", () => $("#profile-modal").close());
  $("#logout-btn").addEventListener("click", () => {
    state.code = "";
    state.profile = defaultProfile();
    showView("#auth-view");
    setStatus("Logged out.");
  });

  $("#timer-start").addEventListener("click", () => {
    if (state.timerRef) return;
    if (state.timer <= 0 || state.timer === 25 * 60) state.timer = Number($("#timer-mins").value || 25) * 60;
    state.timerRef = setInterval(() => {
      state.timer = Math.max(0, state.timer - 1);
      drawTimer();
      if (state.timer === 0) {
        clearInterval(state.timerRef);
        state.timerRef = null;
      }
    }, 1000);
  });

  $("#timer-reset").addEventListener("click", () => {
    if (state.timerRef) clearInterval(state.timerRef);
    state.timerRef = null;
    state.timer = Number($("#timer-mins").value || 25) * 60;
    drawTimer();
  });
}

function init() {
  bind();
  showView("#auth-view");
  $("#countdown-date").textContent = EXAM_DATE.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
  tickCountdown();
  drawTimer();
  setInterval(tickCountdown, 1000);
}

document.addEventListener("DOMContentLoaded", init);
