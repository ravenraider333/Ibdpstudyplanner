const EXAM_DATE = new Date("2026-05-01T09:00:00");
const CLOUD_BASE = "https://jsonblob.com/api/jsonBlob";

const t = (name, hlOnly = false) => ({ name, hlOnly });

const syllabusCatalog = {
  Maths: {
    groups: {
      Algebra: [t("Sequences & Series"), t("Exponents & Logs"), t("Binomial Theorem"), t("Proofs")],
      Functions: [t("Properties of Functions"), t("Quadratics"), t("Rational Functions"), t("Exponent-Log Functions"), t("Transformations")],
      Geometry: [t("Geometry & Shapes"), t("Trigonometric Functions")],
      Statistics: [t("Statistics"), t("Bivariate Statistics"), t("Probability"), t("Distributions")],
      Calculus: [t("Differential Calculus"), t("Integral Calculus")],
      Mechanics: [t("Kinematics")],
    },
  },
  English: {
    groups: {
      Core: [t("Paper 1"), t("ADH Notes"), t("PH Notes")],
    },
  },
  Biology: {
    groups: {
      A: [t("A1.1 Water"), t("A1.2 Nucleic acids"), t("A2.1 Origins of cells", true), t("A2.2 Cell structure"), t("A2.3 Viruses", true), t("A3.1 Diversity of organisms"), t("A3.2 Classification and cladistics", true), t("A4.1 Evolution and speciation"), t("A4.2 Conservation of biodiversity")],
      B: [t("B1.1 Carbohydrates and lipids"), t("B1.2 Proteins"), t("B2.1 Membranes and membrane transport"), t("B2.2 Organelles and compartmentalization"), t("B2.3 Cell specialization"), t("B3.1 Gas exchange"), t("B3.2 Transport"), t("B3.3 Muscle and motility", true), t("B4.1 Adaptation to environment"), t("B4.2 Ecological niches")],
      C: [t("C1.1 Enzymes and metabolism"), t("C1.2 Cell respiration"), t("C1.3 Photosynthesis"), t("C2.1 Chemical signalling", true), t("C2.2 Neural signalling"), t("C3.1 Integration of body systems"), t("C3.2 Defence against disease"), t("C4.1 Populations and communities"), t("C4.2 Transfers of energy and matter")],
      D: [t("D1.1 DNA replication"), t("D1.2 Protein synthesis"), t("D1.3 Mutation and gene editing"), t("D2.1 Cell and nuclear division"), t("D2.2 Gene expression", true), t("D2.3 Water potential"), t("D3.1 Reproduction"), t("D3.2 Inheritance"), t("D3.3 Homeostasis"), t("D4.1 Natural selection"), t("D4.2 Stability and change"), t("D4.3 Climate change")],
    },
  },
  German: {
    groups: {
      Themes: [t("1. Identities (Identitäten)"), t("2. Experiences (Erfahrungen)"), t("3. Human Ingenuity (Erfindungsgeist)"), t("4. Social Organization (Soziale Organisation)"), t("5. Sharing the Planet (Den Planeten teilen)")],
    },
  },
  Psychology: {
    groups: {
      Topics: [t("Biological SAQ's"), t("Cognitive SAQ's"), t("Sociocultural SAQ's"), t("Cognitive ERQ's"), t("Human Relationship ERQ's"), t("Etiology ERQ's"), t("Research Methods"), t("Sampling Techniques"), t("Alternative Research Methods"), t("Ethical Considerations"), t("Discussions (Paper 3)")],
    },
  },
  Economics: {
    groups: {
      RWE: [t("RWE - Micro"), t("RWE - Macro"), t("RWE - Global")],
      Unit2: [t("2.1 Demand"), t("2.2 Supply"), t("2.3 Equilibrium"), t("2.4 Critique of Maximizing Behaviour", true), t("2.5 Demand Elasticity"), t("2.6 Supply Elasticity"), t("2.7 Role of Government"), t("2.8 Externalities & Common Pool Resources"), t("2.9 Public Goods"), t("2.10 Asymmetric Information", true), t("2.11 Market Power", true), t("2.12 The Market's Inability to Achieve Equity", true)],
      Unit3: [t("3.1 Measuring Economic Activity"), t("3.2 Aggregate Demand & Aggregate Supply"), t("3.3 Macroeconomic Objectives"), t("3.4 Inequality and Poverty"), t("3.5 Monetary Policy"), t("3.6 Fiscal Policy"), t("3.7 Supply-Side Policy")],
      Unit4: [t("4.1 Benefits of International Trade"), t("4.2 Types of Trade Protection"), t("4.3 Arguments For and Against Trade Control/Protection"), t("4.4 Economic Integration"), t("4.5 Exchange Rates"), t("4.6 Balance of Payments"), t("4.7 Sustainable Development"), t("4.8 Measuring Development"), t("4.9 Barriers to Economic Growth and/or Economic Development"), t("4.10 Economic Growth and/or Economic Development Strategies")],
    },
  },
  Physics: {
    groups: {
      A: [t("A.1 Kinematics - Sirius notes + RV questions"), t("A.2 Forces & momentum - Sirius notes + RV"), t("A.3 Work, energy & power - notes + RV"), t("A.4 Rigid body mechanics", true), t("A.5 Relativity", true)],
      B: [t("B.1 Thermal energy transfers - notes + RV"), t("B.2 Greenhouse effect - Sirius notes + questions"), t("B.3 Gas laws - calculations & theory"), t("B.4 Thermodynamics (HL) - first law", true), t("B.5 Current & circuits - circuit problems")],
      C: [t("C.1 Simple Harmonic Motion", true), t("C.2 Wave model - wave properties"), t("C.3 Wave phenomena", true), t("C.4 Standing waves & resonance"), t("C.5 Doppler effect", true)],
      D: [t("D.1 Gravitational fields", true), t("D.2 Electric & magnetic fields", true), t("D.3 Motion in electromagnetic fields"), t("D.4 Induction", true)],
      E: [t("E.1 Structure of the atom"), t("E.2 Quantum physics", true), t("E.3 Radioactive decay"), t("E.4 Fission"), t("E.5 Fusion & stars")],
    },
  },
  Chem: {
    groups: {
      Structure: [t("Structure 1.1 Particulate nature of matter – notes + dojo"), t("Structure 1.2 Nuclear atom – notes + dojo"), t("Structure 1.3 Electron configuration – notes + dojo"), t("Structure 1.4 The mole – calculations"), t("Structure 1.5 Ideal gases – problems"), t("Structure 2.1 Ionic model"), t("Structure 2.2 Covalent model"), t("Structure 2.3 Metallic model"), t("Structure 2.4 From models to materials"), t("Structure 3.1 Periodic table trends"), t("Structure 3.2 Functional groups")],
      Reactivity: [t("Reactivity 1.1 Measuring enthalpy changes"), t("Reactivity 1.2 Energy cycles – notes + dojo"), t("Reactivity 1.3 Energy from fuels"), t("Reactivity 1.4 Entropy & spontaneity", true), t("Reactivity 2.1 Amount of chemical change"), t("Reactivity 2.2 Rate of reaction"), t("Reactivity 2.3 Extent of reaction"), t("Reactivity 3.1 Proton transfer reactions"), t("Reactivity 3.2 Electron transfer reactions"), t("Reactivity 3.3 Electron sharing reactions"), t("Reactivity 3.4 Electron-pair sharing")],
    },
  },
  Geo: {
    groups: {
      Unit1: [t("Unit 1: Population and economic development patterns"), t("Unit 1: Changing populations and places"), t("Unit 1: Challenges and opportunities")],
      Unit2: [t("Unit 2: Causes of global climate change"), t("Unit 2: Consequence of global climate change"), t("Unit 2: Responding to global climate change")],
      Unit3: [t("Unit 3: Global trends in consumption"), t("Unit 3: Impacts of changing trends in resource consumption"), t("Unit 3: Resource stewardship")],
      OptionD: [t("Option D: Geophysical systems"), t("Option D: Geophysical hazard risks"), t("Option D: Hazard risk and vulnerability")],
      OptionF: [t("Option F: Future resilience and adaptation"), t("Option F: Measuring food and health"), t("Option F: Food systems and spread of disease"), t("Option F: Stakeholders in food and health"), t("Option F: Future health and food security and sustainability")],
      OptionG: [t("Option G: The variety of urban environments"), t("Option G: Changing urban systems"), t("Option G: Urban environmental and social stresses"), t("Option G: Building sustainable urban systems for the future")],
    },
  },
};

const SUBJECTS = Object.keys(syllabusCatalog);
const $ = (s) => document.querySelector(s);
const defaultProfile = () => ({ selectedSubjects: {}, completed: {}, today: [], onboarded: false });

const state = { code: "", profile: defaultProfile(), timer: 25 * 60, timerRef: null };

function setStatus(msg) { const s = $("#status"); if (s) s.textContent = msg; }
function key(code) { return `ibdp:${code}`; }
function cloudUrl(code) { return `${CLOUD_BASE}/ibdpstudyplanner-${code}`; }
function sanitize(code) { return code.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 40); }

function localLoad(code) { try { return JSON.parse(localStorage.getItem(key(code)) || "null"); } catch { return null; } }
function localSave(code, payload) { try { localStorage.setItem(key(code), JSON.stringify(payload)); } catch {} }

async function cloudLoad(code) {
  try {
    const r = await fetch(cloudUrl(code));
    if (!r.ok) return null;
    return await r.json();
  } catch { return null; }
}

async function cloudSave(code, payload) {
  try {
    const r = await fetch(cloudUrl(code), { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    return r.ok;
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

function tasks() {
  const out = [];
  Object.entries(state.profile.selectedSubjects).forEach(([subject, level]) => {
    const groups = syllabusCatalog[subject]?.groups || {};
    Object.entries(groups).forEach(([unit, items]) => {
      items.forEach((item) => {
        if (level === "SL" && item.hlOnly) return;
        const id = `${subject}|${level}|${unit}|${item.name}`;
        out.push({ id, subject, level, unit, topic: item.name, done: Boolean(state.profile.completed[id]) });
      });
    });
  });
  return out;
}

function progress(label, done, total) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return `<div class="progress"><div class="meta"><span>${label}</span><strong>${done}/${total}</strong></div><div class="track"><div class="fill" style="width:${pct}%"></div></div></div>`;
}

function saveProfile() {
  if (!state.code) return;
  localSave(state.code, state.profile);
  cloudSave(state.code, state.profile).then((ok) => {
    setStatus(ok ? "Saved to cloud." : "Cloud unavailable: saved locally on this device.");
  });
}

function renderSubjectPicker() {
  const root = $("#subject-picker");
  root.innerHTML = "";
  const group = document.createElement("div");
  group.className = "picker-grid";

  SUBJECTS.forEach((subject) => {
    const card = document.createElement("label");
    card.className = "picker-card";
    const checked = state.profile.selectedSubjects[subject] ? "checked" : "";
    const level = state.profile.selectedSubjects[subject] || "SL";
    card.innerHTML = `
      <input type="checkbox" data-subject="${subject}" ${checked} />
      <strong>${subject}</strong>
      <select data-level="${subject}">
        <option value="SL" ${level === "SL" ? "selected" : ""}>SL</option>
        <option value="HL" ${level === "HL" ? "selected" : ""}>HL</option>
      </select>
    `;
    group.appendChild(card);
  });
  root.appendChild(group);
}

function collectPickedSubjects() {
  const selected = {};
  document.querySelectorAll("input[data-subject]").forEach((el) => {
    if (!el.checked) return;
    const subject = el.dataset.subject;
    const level = document.querySelector(`select[data-level="${CSS.escape(subject)}"]`)?.value || "SL";
    selected[subject] = level;
  });
  return selected;
}

function renderProgress() {
  const all = tasks();
  const done = all.filter((x) => x.done).length;
  $("#overall-progress").innerHTML = progress("Total", done, all.length);

  const bySubject = {};
  all.forEach((t) => {
    bySubject[t.subject] ??= { done: 0, total: 0 };
    bySubject[t.subject].total += 1;
    if (t.done) bySubject[t.subject].done += 1;
  });

  $("#subject-progress").innerHTML = Object.entries(bySubject)
    .map(([sub, p]) => progress(`${sub} (${state.profile.selectedSubjects[sub]})`, p.done, p.total))
    .join("");
}

function toggleTask(id, checked) {
  if (checked) state.profile.completed[id] = true;
  else delete state.profile.completed[id];
  saveProfile();
  renderDashboard();
}

function renderDaily() {
  const form = $("#daily-form");
  const list = $("#today-list");
  const active = tasks().filter((t) => !t.done);
  const map = Object.fromEntries(tasks().map((t) => [t.id, t]));

  form.innerHTML = "";
  for (let i = 0; i < 3; i += 1) {
    const select = document.createElement("select");
    select.innerHTML = `<option value="">Pick focus #${i + 1}</option>${active
      .map((t) => `<option value="${t.id}">${t.subject} • ${t.topic}</option>`)
      .join("")}`;
    select.value = state.profile.today[i] || "";
    select.addEventListener("change", () => {
      const next = [...state.profile.today];
      next[i] = select.value;
      state.profile.today = [...new Set(next.filter(Boolean))].slice(0, 3);
      saveProfile();
      renderDashboard();
    });
    form.appendChild(select);
  }

  list.innerHTML = "";
  state.profile.today.forEach((id) => {
    const task = map[id];
    if (!task) return;
    const li = document.createElement("li");
    li.className = `task ${task.done ? "done" : ""}`;
    li.innerHTML = `<div><div class="name">${task.topic}</div><small class="muted">${task.subject} · ${task.unit}</small></div>`;
    const c = document.createElement("input");
    c.type = "checkbox";
    c.checked = task.done;
    c.addEventListener("change", () => toggleTask(task.id, c.checked));
    li.appendChild(c);
    list.appendChild(li);
  });
}

function renderBadges() {
  const root = $("#unit-badges");
  const byUnit = {};
  tasks().forEach((t) => {
    const k = `${t.subject} · ${t.unit}`;
    byUnit[k] ??= { done: 0, total: 0 };
    byUnit[k].total += 1;
    if (t.done) byUnit[k].done += 1;
  });

  root.innerHTML = Object.entries(byUnit)
    .map(([k, s]) => `<div class="badge ${s.done === s.total ? "complete" : ""}"><strong>${k}</strong><div class="muted">${s.done}/${s.total} complete</div></div>`)
    .join("");
}

function renderReservoir() {
  const root = $("#reservoir");
  const bySub = {};
  tasks().forEach((t) => {
    bySub[t.subject] ??= {};
    bySub[t.subject][t.unit] ??= [];
    bySub[t.subject][t.unit].push(t);
  });
  root.innerHTML = "";

  Object.entries(bySub).forEach(([subject, units]) => {
    const block = document.createElement("section");
    block.className = "stack";
    block.innerHTML = `<h4>${subject}</h4>`;
    Object.entries(units).forEach(([unit, entries]) => {
      const u = document.createElement("div");
      u.className = "muted";
      u.textContent = unit;
      block.appendChild(u);

      const ul = document.createElement("ul");
      ul.className = "list";
      entries.forEach((task) => {
        const li = document.createElement("li");
        li.className = `task ${task.done ? "done" : ""}`;
        li.innerHTML = `<div class="name">${task.topic}</div>`;
        const c = document.createElement("input");
        c.type = "checkbox";
        c.checked = task.done;
        c.addEventListener("change", () => toggleTask(task.id, c.checked));
        li.appendChild(c);
        ul.appendChild(li);
      });
      block.appendChild(ul);
    });
    root.appendChild(block);
  });
}

function renderDashboard() {
  renderProgress();
  renderDaily();
  renderBadges();
  renderReservoir();
}

function showView(view) {
  $("#auth-view").classList.add("hidden");
  $("#onboarding-view").classList.add("hidden");
  $("#dashboard-view").classList.add("hidden");
  $(view).classList.remove("hidden");
}

function countdownTick() {
  const diff = Math.max(0, EXAM_DATE.getTime() - Date.now());
  $("#cd-days").textContent = String(Math.floor(diff / (1000 * 60 * 60 * 24)));
  $("#cd-hours").textContent = String(Math.floor((diff / (1000 * 60 * 60)) % 24));
  $("#cd-mins").textContent = String(Math.floor((diff / (1000 * 60)) % 60));
  $("#cd-secs").textContent = String(Math.floor((diff / 1000) % 60));
}

function timerDraw() {
  const mins = String(Math.floor(state.timer / 60)).padStart(2, "0");
  const secs = String(state.timer % 60).padStart(2, "0");
  $("#timer-display").textContent = `${mins}:${secs}`;
}

async function login(codeRaw) {
  const code = sanitize(codeRaw);
  if (!code) return;
  state.code = code;
  $("#profile-code").textContent = code;

  const cloud = await cloudLoad(code);
  const local = localLoad(code);
  state.profile = normalize(cloud || local || defaultProfile());

  if (cloud) setStatus("Cloud profile loaded.");
  else if (local) setStatus("Local profile loaded (cloud unavailable).");
  else setStatus("New profile created.");

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
      setStatus("Subjects are already locked for this profile.");
      showView("#dashboard-view");
      renderDashboard();
      return;
    }

    const picked = collectPickedSubjects();
    if (Object.keys(picked).length === 0) {
      setStatus("Pick at least one subject before continuing.");
      return;
    }

    state.profile.selectedSubjects = picked;
    state.profile.onboarded = true;
    saveProfile();
    showView("#dashboard-view");
    renderDashboard();
  });

  $("#profile-btn").addEventListener("click", () => {
    const d = $("#profile-modal");
    if (d?.showModal) d.showModal();
  });
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
      timerDraw();
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
    timerDraw();
  });
}

function init() {
  bind();
  showView("#auth-view");
  $("#countdown-date").textContent = EXAM_DATE.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
  countdownTick();
  timerDraw();
  setInterval(countdownTick, 1000);
}

document.addEventListener("DOMContentLoaded", init);
