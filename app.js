const EXAM_DATE = new Date("2026-05-01T09:00:00");
const CLOUD_BASE = "https://jsonblob.com/api/jsonBlob";

const subjectGroups = {
  "Theory/Core": ["Theory of Knowledge (TOK)"],
  "Group 1 - Language A": ["English A Lang & Lit", "English A Lit", "French A", "German A"],
  "Group 2 - Language B": ["English B", "French B", "German B", "Spanish B", "French ab initio", "German ab initio"],
  "Group 3 - Humanities": ["Business", "Economics", "Geography", "Psychology"],
  "Group 4 - Sciences": ["Biology", "Chemistry", "Physics"],
  "Group 5 - Mathematics": ["Mathematics AA", "Mathematics AI"],
};

const syllabusCatalog = {
  "Biology": {
    HL: {
      "Unit A": ["A1.1 Water", "A1.2 Nucleic acids", "A1.3 Proteins"],
      "Unit B": ["B1.1 Cells", "B2.1 Respiration", "B2.2 Photosynthesis"],
    },
    SL: {
      "Unit A": ["A1.1 Water", "A1.2 Nucleic acids"],
      "Unit B": ["B1.1 Cells", "B2.1 Respiration"],
    },
  },
  "Chemistry": {
    HL: {
      "Unit 1": ["Stoichiometric relationships", "Atomic structure", "Periodicity"],
      "Unit 2": ["Bonding", "Energetics", "Kinetics"],
    },
    SL: {
      "Unit 1": ["Stoichiometric relationships", "Atomic structure"],
      "Unit 2": ["Bonding", "Energetics"],
    },
  },
  "Physics": {
    HL: {
      "Unit 1": ["Kinematics", "Forces and momentum", "Work and energy"],
      "Unit 2": ["Thermal physics", "Waves", "Electricity and magnetism"],
    },
    SL: {
      "Unit 1": ["Kinematics", "Forces and momentum"],
      "Unit 2": ["Waves", "Electricity and magnetism"],
    },
  },
  "Economics": {
    HL: {
      "Microeconomics": ["Demand & supply", "Elasticity", "Market failure"],
      "Macroeconomics": ["GDP", "Inflation", "Fiscal policy"],
    },
    SL: {
      "Microeconomics": ["Demand & supply", "Elasticity"],
      "Macroeconomics": ["GDP", "Inflation"],
    },
  },
  "Psychology": {
    HL: {
      "Approaches": ["Biological approach", "Cognitive approach", "Sociocultural approach"],
      "Research": ["Methods", "Ethics", "Data interpretation"],
    },
    SL: {
      "Approaches": ["Biological approach", "Cognitive approach"],
      "Research": ["Methods", "Ethics"],
    },
  },
  "Business": {
    HL: {
      "Unit 1": ["Types of organizations", "Growth", "Stakeholders"],
      "Unit 2": ["Finance", "Accounts", "Cash flow"],
    },
    SL: {
      "Unit 1": ["Types of organizations", "Stakeholders"],
      "Unit 2": ["Finance", "Cash flow"],
    },
  },
  "Geography": {
    HL: {
      "Changing populations": ["Population change", "Migration", "Ageing"],
      "Global resources": ["Energy", "Water", "Food"],
    },
    SL: {
      "Changing populations": ["Population change", "Migration"],
      "Global resources": ["Energy", "Water"],
    },
  },
  "Mathematics AA": {
    HL: {
      "Number & Algebra": ["Sequences and series", "Complex numbers", "Binomial theorem"],
      Functions: ["Transformations", "Exponential/logarithmic functions", "Modelling"],
    },
    SL: {
      "Number & Algebra": ["Sequences and series", "Financial maths"],
      Functions: ["Linear/quadratic", "Inverse functions"],
    },
  },
  "Mathematics AI": {
    HL: {
      "Number & Algebra": ["Sequences and series", "Matrices", "Logic"],
      Statistics: ["Probability", "Distributions", "Correlation and regression"],
    },
    SL: {
      "Number & Algebra": ["Sequences and series", "Financial maths"],
      Statistics: ["Probability", "Correlation and regression"],
    },
  },
  "English A Lang & Lit": {
    HL: {
      "Paper 1": ["Textual analysis", "Authorial choices", "Audience and purpose"],
      "Paper 2": ["Comparative essay", "Theme and context", "Quotation integration"],
    },
    SL: {
      "Paper 1": ["Textual analysis", "Audience and purpose"],
      "Paper 2": ["Comparative essay", "Theme and context"],
    },
  },
  "French B": {
    HL: {
      "Theme 1": ["Identities", "Experiences", "Human ingenuity"],
      "Theme 2": ["Social organization", "Sharing the planet", "Text types"],
    },
    SL: {
      "Theme 1": ["Identities", "Experiences"],
      "Theme 2": ["Social organization", "Sharing the planet"],
    },
  },
  "German B": {
    HL: {
      "Theme 1": ["Identities", "Experiences", "Human ingenuity"],
      "Theme 2": ["Social organization", "Sharing the planet", "Text types"],
    },
    SL: {
      "Theme 1": ["Identities", "Experiences"],
      "Theme 2": ["Social organization", "Sharing the planet"],
    },
  },
};

const $ = (s) => document.querySelector(s);
const defaultProfile = () => ({
  selectedSubjects: {},
  completed: {},
  today: [],
});

const state = {
  code: "",
  profile: defaultProfile(),
  cloud: "local",
  timer: 25 * 60,
  timerRef: null,
};

function sanitizeCode(code) {
  return code.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 40);
}

function status(msg) {
  const el = $("#status");
  if (el) el.textContent = msg;
}

function profileKey(code) {
  return `ibdp:${code}`;
}

function cloudUrl(code) {
  return `${CLOUD_BASE}/ibdpstudyplanner-${sanitizeCode(code)}`;
}

async function cloudLoad(code) {
  try {
    const r = await fetch(cloudUrl(code), { method: "GET" });
    if (!r.ok) return null;
    const data = await r.json();
    if (!data || typeof data !== "object") return null;
    return data;
  } catch {
    return null;
  }
}

async function cloudSave(code, payload) {
  try {
    const r = await fetch(cloudUrl(code), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return r.ok;
  } catch {
    return false;
  }
}

function localLoad(code) {
  try {
    const raw = localStorage.getItem(profileKey(code));
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function localSave(code, payload) {
  try {
    localStorage.setItem(profileKey(code), JSON.stringify(payload));
  } catch {
    // ignore
  }
}

function normalizeProfile(data) {
  if (!data || typeof data !== "object") return defaultProfile();
  return {
    selectedSubjects: data.selectedSubjects || {},
    completed: data.completed || {},
    today: Array.isArray(data.today) ? data.today.slice(0, 3) : [],
  };
}

function allTasks() {
  const tasks = [];
  Object.entries(state.profile.selectedSubjects).forEach(([subject, level]) => {
    const subj = syllabusCatalog[subject];
    if (!subj || !subj[level]) return;
    Object.entries(subj[level]).forEach(([unit, topics]) => {
      topics.forEach((topic) => {
        const id = `${subject}|${level}|${unit}|${topic}`;
        tasks.push({
          id,
          subject,
          level,
          unit,
          topic,
          done: Boolean(state.profile.completed[id]),
        });
      });
    });
  });
  return tasks;
}

function progressHTML(label, done, total) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return `<div class="progress"><div class="meta"><span>${label}</span><strong>${done}/${total}</strong></div><div class="track"><div class="fill" style="width:${pct}%"></div></div></div>`;
}

function renderProgress() {
  const tasks = allTasks();
  const done = tasks.filter((t) => t.done).length;
  $("#overall-progress").innerHTML = progressHTML("Total", done, tasks.length);

  const bySubject = {};
  tasks.forEach((t) => {
    bySubject[t.subject] ??= { done: 0, total: 0 };
    bySubject[t.subject].total += 1;
    if (t.done) bySubject[t.subject].done += 1;
  });

  $("#subject-progress").innerHTML = Object.entries(bySubject)
    .map(([name, stat]) => progressHTML(`${name} (${state.profile.selectedSubjects[name]})`, stat.done, stat.total))
    .join("");
}

function saveProfile() {
  if (!state.code) return;
  localSave(state.code, state.profile);
  cloudSave(state.code, state.profile).then((ok) => {
    state.cloud = ok ? "cloud" : "local";
    status(ok ? "Cloud sync saved." : "Cloud sync unavailable, saved on this device only.");
  });
}

function toggleTask(id, value) {
  if (value) state.profile.completed[id] = true;
  else delete state.profile.completed[id];
  saveProfile();
  render();
}

function renderToday() {
  const picks = $("#daily-picks");
  const list = $("#today-list");
  const available = allTasks().filter((t) => !t.done);

  picks.innerHTML = "";
  for (let i = 0; i < 3; i += 1) {
    const select = document.createElement("select");
    select.innerHTML = `<option value="">Pick focus #${i + 1}</option>${available
      .map((t) => `<option value="${t.id}">${t.subject} • ${t.topic}</option>`)
      .join("")}`;
    select.value = state.profile.today[i] || "";
    select.addEventListener("change", () => {
      const next = [...state.profile.today];
      next[i] = select.value;
      state.profile.today = [...new Set(next.filter(Boolean))].slice(0, 3);
      saveProfile();
      render();
    });
    picks.appendChild(select);
  }

  const taskMap = Object.fromEntries(allTasks().map((t) => [t.id, t]));
  list.innerHTML = "";
  state.profile.today.forEach((id) => {
    const task = taskMap[id];
    if (!task) return;
    const item = document.createElement("li");
    item.className = `task ${task.done ? "done" : ""}`;
    item.innerHTML = `<div><div class="name">${task.topic}</div><small class="muted">${task.subject} · ${task.unit}</small></div>`;
    const box = document.createElement("input");
    box.type = "checkbox";
    box.checked = task.done;
    box.addEventListener("change", () => toggleTask(task.id, box.checked));
    item.appendChild(box);
    list.appendChild(item);
  });
}

function renderBadges() {
  const root = $("#unit-badges");
  const grouped = {};
  allTasks().forEach((t) => {
    const key = `${t.subject} · ${t.unit}`;
    grouped[key] ??= { done: 0, total: 0 };
    grouped[key].total += 1;
    if (t.done) grouped[key].done += 1;
  });
  root.innerHTML = Object.entries(grouped)
    .map(([key, g]) => `<div class="badge ${g.done === g.total ? "complete" : ""}"><strong>${key}</strong><div class="muted">${g.done}/${g.total} complete</div></div>`)
    .join("");
}

function renderReservoir() {
  const root = $("#reservoir");
  const grouped = {};
  allTasks().forEach((t) => {
    grouped[t.subject] ??= {};
    grouped[t.subject][t.unit] ??= [];
    grouped[t.subject][t.unit].push(t);
  });

  root.innerHTML = "";
  Object.entries(grouped).forEach(([subject, units]) => {
    const block = document.createElement("div");
    block.className = "stack";
    block.innerHTML = `<h4>${subject}</h4>`;

    Object.entries(units).forEach(([unit, tasks]) => {
      const sub = document.createElement("div");
      sub.className = "muted";
      sub.textContent = unit;
      block.appendChild(sub);

      const ul = document.createElement("ul");
      ul.className = "list";
      tasks.forEach((t) => {
        const li = document.createElement("li");
        li.className = `task ${t.done ? "done" : ""}`;
        li.innerHTML = `<div class="name">${t.topic}</div>`;
        const box = document.createElement("input");
        box.type = "checkbox";
        box.checked = t.done;
        box.addEventListener("change", () => toggleTask(t.id, box.checked));
        li.appendChild(box);
        ul.appendChild(li);
      });
      block.appendChild(ul);
    });

    root.appendChild(block);
  });
}

function renderSubjectSelector() {
  const root = $("#subject-groups");
  root.innerHTML = "";

  Object.entries(subjectGroups).forEach(([group, subjects]) => {
    const section = document.createElement("section");
    section.className = "subject-group";
    section.innerHTML = `<h4>${group}</h4>`;
    const row = document.createElement("div");
    row.className = "pill-row";

    subjects.forEach((name) => {
      const pill = document.createElement("label");
      pill.className = "pill";
      const checked = state.profile.selectedSubjects[name] ? "checked" : "";
      const level = state.profile.selectedSubjects[name] || "SL";
      pill.innerHTML = `
        <input type="checkbox" data-subject="${name}" ${checked} />
        <span>${name}</span>
        <select data-level="${name}">
          <option value="SL" ${level === "SL" ? "selected" : ""}>SL</option>
          <option value="HL" ${level === "HL" ? "selected" : ""}>HL</option>
        </select>
      `;
      row.appendChild(pill);
    });

    section.appendChild(row);
    root.appendChild(section);
  });
}

function applySubjectSelection() {
  const checks = [...document.querySelectorAll("input[data-subject]")];
  const next = {};
  checks.forEach((check) => {
    if (!check.checked) return;
    const name = check.dataset.subject;
    const levelEl = document.querySelector(`select[data-level="${CSS.escape(name)}"]`);
    const level = levelEl?.value || "SL";
    next[name] = level;
  });
  state.profile.selectedSubjects = next;
  state.profile.today = state.profile.today.filter((id) => allTasks().some((t) => t.id === id));
}

function openSubjectModal() {
  renderSubjectSelector();
  const modal = $("#subject-modal");
  if (modal?.showModal) modal.showModal();
}

function render() {
  renderProgress();
  renderToday();
  renderBadges();
  renderReservoir();
}

function tickCountdown() {
  const now = new Date();
  const diff = Math.max(0, EXAM_DATE.getTime() - now.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  $("#cd-days").textContent = String(days);
  $("#cd-hours").textContent = String(hours);
  $("#cd-mins").textContent = String(mins);
  $("#cd-secs").textContent = String(secs);
}

function updateTimer() {
  const mins = String(Math.floor(state.timer / 60)).padStart(2, "0");
  const secs = String(state.timer % 60).padStart(2, "0");
  $("#timer-display").textContent = `${mins}:${secs}`;
}

function setupTimer() {
  $("#timer-start").addEventListener("click", () => {
    if (state.timerRef) return;
    if (state.timer === 25 * 60 || state.timer <= 0) {
      state.timer = Number($("#timer-input").value || 25) * 60;
    }
    state.timerRef = setInterval(() => {
      state.timer = Math.max(0, state.timer - 1);
      updateTimer();
      if (state.timer === 0) {
        clearInterval(state.timerRef);
        state.timerRef = null;
      }
    }, 1000);
  });

  $("#timer-reset").addEventListener("click", () => {
    if (state.timerRef) clearInterval(state.timerRef);
    state.timerRef = null;
    state.timer = Number($("#timer-input").value || 25) * 60;
    updateTimer();
  });

  updateTimer();
}

async function login(codeRaw) {
  const code = sanitizeCode(codeRaw);
  if (!code) return;
  state.code = code;
  $("#profile-code").textContent = code;

  const cloud = await cloudLoad(code);
  const local = localLoad(code);
  if (cloud) {
    state.profile = normalizeProfile(cloud);
    state.cloud = "cloud";
    status("Cloud profile loaded.");
  } else if (local) {
    state.profile = normalizeProfile(local);
    state.cloud = "local";
    status("Loaded local profile. Cloud sync unavailable.");
  } else {
    state.profile = defaultProfile();
    state.cloud = "local";
    status("New profile created.");
  }

  localSave(code, state.profile);
  $("#auth").classList.add("hidden");
  $("#app").classList.remove("hidden");
  render();

  if (Object.keys(state.profile.selectedSubjects).length === 0) {
    openSubjectModal();
  }
}

function bind() {
  $("#auth-form").addEventListener("submit", (e) => {
    e.preventDefault();
    login($("#code-input").value);
  });

  $("#save-subjects").addEventListener("click", () => {
    applySubjectSelection();
    saveProfile();
    $("#subject-modal").close();
    render();
  });

  $("#profile-btn").addEventListener("click", () => {
    const modal = $("#profile-modal");
    if (modal?.showModal) modal.showModal();
  });

  $("#edit-subjects").addEventListener("click", () => {
    $("#profile-modal").close();
    openSubjectModal();
  });

  $("#close-profile").addEventListener("click", () => $("#profile-modal").close());

  $("#logout-btn").addEventListener("click", () => {
    state.code = "";
    state.profile = defaultProfile();
    $("#app").classList.add("hidden");
    $("#auth").classList.remove("hidden");
    status("Logged out.");
  });
}

function init() {
  bind();
  setupTimer();
  tickCountdown();
  setInterval(tickCountdown, 1000);
  $("#countdown-date").textContent = EXAM_DATE.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
}

document.addEventListener("DOMContentLoaded", init);
