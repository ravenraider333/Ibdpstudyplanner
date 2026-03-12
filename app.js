const syllabusCatalog = {
  Mathematics: {
    levels: {
      HL: {
        "Unit 1: Number & Algebra": ["Sequences and series", "Binomial theorem", "Complex numbers"],
        "Unit 2: Functions": ["Function transformations", "Exponential & logarithmic models"],
      },
      SL: {
        "Unit 1: Number & Algebra": ["Sequences and series", "Financial maths"],
        "Unit 2: Functions": ["Linear & quadratic functions", "Inverse functions"],
      },
    },
  },
  Biology: {
    levels: {
      HL: {
        "Unit A": ["A1.1 Water", "A1.2 Nucleic acids", "A1.3 Proteins"],
        "Unit B": ["B1.1 Membranes", "B1.2 Enzymes", "B2.1 Respiration"],
      },
      SL: {
        "Unit A": ["A1.1 Water", "A1.2 Nucleic acids"],
        "Unit B": ["B1.1 Membranes", "B1.2 Enzymes"],
      },
    },
  },
  Business: {
    levels: {
      HL: {
        "Unit 1": ["Types of business entities", "Stakeholders", "Growth & evolution"],
        "Unit 2": ["Finance sources", "Cash flow", "Profitability ratios"],
      },
      SL: {
        "Unit 1": ["Types of business entities", "Stakeholders"],
        "Unit 2": ["Finance sources", "Cash flow"],
      },
    },
  },
  Geography: {
    levels: {
      HL: {
        "Changing Populations": ["Population trends", "Migration", "Ageing societies"],
        "Global resource consumption": ["Energy security", "Water scarcity", "Food systems"],
      },
      SL: {
        "Changing Populations": ["Population trends", "Migration"],
        "Global resource consumption": ["Energy security", "Water scarcity"],
      },
    },
  },
};

const $ = (s) => document.querySelector(s);
const defaultProfile = () => ({ selectedCourses: {}, completed: {}, today: [] });

let timerInterval;
let timerRemaining = 25 * 60;

const state = {
  code: null,
  profile: defaultProfile(),
  storageAvailable: true,
};

function showStatus(message, isError = false) {
  const el = $("#status-message");
  if (!el) return;
  el.textContent = message;
  el.classList.toggle("error", Boolean(isError));
}

function detectStorage() {
  try {
    const testKey = "ibdp:__test__";
    localStorage.setItem(testKey, "ok");
    localStorage.removeItem(testKey);
    state.storageAvailable = true;
  } catch (error) {
    state.storageAvailable = false;
    showStatus("Local storage is blocked in this browser mode. Your changes will reset on refresh.", true);
  }
}

function safeGet(key) {
  if (!state.storageAvailable) return null;
  try {
    return localStorage.getItem(key);
  } catch (error) {
    state.storageAvailable = false;
    showStatus("Could not read saved data. Continuing in temporary mode.", true);
    return null;
  }
}

function safeSet(key, value) {
  if (!state.storageAvailable) return;
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    state.storageAvailable = false;
    showStatus("Could not save changes locally. Continuing in temporary mode.", true);
  }
}

function saveProfile() {
  if (!state.code) return;
  safeSet(`ibdp:${state.code}`, JSON.stringify(state.profile));
}

function loadProfile(code) {
  const raw = safeGet(`ibdp:${code}`);
  if (!raw) {
    state.profile = defaultProfile();
    saveProfile();
    return;
  }

  try {
    const parsed = JSON.parse(raw);
    state.profile = {
      selectedCourses: parsed.selectedCourses || {},
      completed: parsed.completed || {},
      today: Array.isArray(parsed.today) ? parsed.today : [],
    };
  } catch (error) {
    state.profile = defaultProfile();
    showStatus("Saved profile data was corrupted and has been reset.", true);
    saveProfile();
  }
}

function getFlatTasks() {
  const tasks = [];
  for (const [course, level] of Object.entries(state.profile.selectedCourses)) {
    const units = syllabusCatalog[course]?.levels[level];
    if (!units) continue;
    for (const [unit, topics] of Object.entries(units)) {
      for (const topic of topics) {
        const id = `${course}|${level}|${unit}|${topic}`;
        tasks.push({ id, course, level, unit, topic, done: Boolean(state.profile.completed[id]) });
      }
    }
  }
  return tasks;
}

function renderCoursePicker() {
  const container = $("#course-picker");
  if (!container) return;
  container.innerHTML = "";

  Object.keys(syllabusCatalog).forEach((course) => {
    const wrap = document.createElement("div");
    wrap.className = "task-item";

    const select = document.createElement("select");
    select.innerHTML = `<option value="">Not taking</option><option value="SL">SL</option><option value="HL">HL</option>`;
    select.value = state.profile.selectedCourses[course] || "";
    select.addEventListener("change", () => {
      if (select.value) state.profile.selectedCourses[course] = select.value;
      else delete state.profile.selectedCourses[course];
      state.profile.today = state.profile.today.filter((taskId) => getFlatTasks().some((t) => t.id === taskId));
      saveProfile();
      renderAll();
    });

    wrap.innerHTML = `<strong>${course}</strong>`;
    wrap.appendChild(select);
    container.appendChild(wrap);
  });
}

function renderDailyPicker() {
  const form = $("#daily-form");
  const list = $("#today-list");
  if (!form || !list) return;

  form.innerHTML = "";
  const tasks = getFlatTasks().filter((task) => !task.done);

  for (let i = 0; i < 3; i += 1) {
    const select = document.createElement("select");
    select.innerHTML = `<option value="">Pick focus #${i + 1}</option>${tasks
      .map((task) => `<option value="${task.id}">${task.course} • ${task.topic}</option>`)
      .join("")}`;
    select.value = state.profile.today[i] || "";
    select.addEventListener("change", () => {
      const next = [...state.profile.today];
      next[i] = select.value || "";
      state.profile.today = [...new Set(next.filter(Boolean))].slice(0, 3);
      saveProfile();
      renderAll();
    });
    form.appendChild(select);
  }

  list.innerHTML = "";
  const allTasks = getFlatTasks();
  const todayTasks = state.profile.today.map((id) => allTasks.find((t) => t.id === id)).filter(Boolean);

  todayTasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = `task-item ${task.done ? "done" : ""}`;
    item.innerHTML = `<div><strong class="task-title">${task.topic}</strong><div class="task-meta">${task.course} · ${task.unit}</div></div>`;
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => toggleTask(task.id, checkbox.checked));
    item.appendChild(checkbox);
    list.appendChild(item);
  });
}

function toggleTask(id, done) {
  if (done) state.profile.completed[id] = true;
  else delete state.profile.completed[id];
  saveProfile();
  renderAll();
}

function progressTemplate(label, done, total) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return `<div class="progress-row"><div class="progress-label"><span>${label}</span><strong>${done}/${total} (${pct}%)</strong></div><div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div></div>`;
}

function renderProgress() {
  const overall = $("#overall-progress");
  const byCourseEl = $("#course-progress");
  const byUnitEl = $("#unit-progress");
  if (!overall || !byCourseEl || !byUnitEl) return;

  const tasks = getFlatTasks();
  const doneCount = tasks.filter((t) => t.done).length;
  overall.innerHTML = progressTemplate("Total", doneCount, tasks.length);

  const byCourse = {};
  tasks.forEach((t) => {
    byCourse[t.course] ??= { done: 0, total: 0 };
    byCourse[t.course].total += 1;
    if (t.done) byCourse[t.course].done += 1;
  });
  byCourseEl.innerHTML = Object.entries(byCourse)
    .map(([name, val]) => progressTemplate(name, val.done, val.total))
    .join("");

  const byUnit = {};
  tasks.forEach((t) => {
    const key = `${t.course} · ${t.unit}`;
    byUnit[key] ??= { done: 0, total: 0 };
    byUnit[key].total += 1;
    if (t.done) byUnit[key].done += 1;
  });
  byUnitEl.innerHTML = Object.entries(byUnit)
    .map(([name, val]) => progressTemplate(name, val.done, val.total))
    .join("");
}

function renderSyllabusChecklist() {
  const root = $("#syllabus-checklist");
  if (!root) return;
  root.innerHTML = "";

  const grouped = {};
  getFlatTasks().forEach((task) => {
    grouped[task.course] ??= {};
    grouped[task.course][task.unit] ??= [];
    grouped[task.course][task.unit].push(task);
  });

  Object.entries(grouped).forEach(([course, units]) => {
    const courseBlock = document.createElement("div");
    courseBlock.className = "course-group";
    courseBlock.innerHTML = `<h3>${course}</h3>`;

    Object.entries(units).forEach(([unit, tasks]) => {
      const unitBlock = document.createElement("div");
      unitBlock.innerHTML = `<div class="unit-title">${unit}</div>`;
      const list = document.createElement("ul");
      list.className = "mini-checklist";

      tasks.forEach((task) => {
        const item = document.createElement("li");
        item.className = `task-item ${task.done ? "done" : ""}`;
        item.innerHTML = `<div><span class="task-title">${task.topic}</span><div class="task-meta">${task.level}</div></div>`;
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.done;
        checkbox.addEventListener("change", () => toggleTask(task.id, checkbox.checked));
        item.appendChild(checkbox);
        list.appendChild(item);
      });

      unitBlock.appendChild(list);
      courseBlock.appendChild(unitBlock);
    });

    root.appendChild(courseBlock);
  });
}

function updateTimerDisplay() {
  const el = $("#timer-display");
  if (!el) return;
  const mins = String(Math.floor(timerRemaining / 60)).padStart(2, "0");
  const secs = String(timerRemaining % 60).padStart(2, "0");
  el.textContent = `${mins}:${secs}`;
}

function setupTimer() {
  const startBtn = $("#start-timer");
  const resetBtn = $("#reset-timer");
  const timerInput = $("#timer-minutes");
  if (!startBtn || !resetBtn || !timerInput) return;

  startBtn.addEventListener("click", () => {
    const minutes = Number(timerInput.value || 25);
    if (!timerInterval) {
      if (timerRemaining <= 0 || timerRemaining === 25 * 60) {
        timerRemaining = minutes * 60;
      }
      timerInterval = setInterval(() => {
        timerRemaining -= 1;
        if (timerRemaining <= 0) {
          clearInterval(timerInterval);
          timerInterval = null;
          timerRemaining = 0;
        }
        updateTimerDisplay();
      }, 1000);
    }
    updateTimerDisplay();
  });

  resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
    timerRemaining = Number(timerInput.value || 25) * 60;
    updateTimerDisplay();
  });

  updateTimerDisplay();
}

function renderAll() {
  renderCoursePicker();
  renderDailyPicker();
  renderProgress();
  renderSyllabusChecklist();
}

function setupAuth() {
  const form = $("#auth-form");
  const authCard = $("#auth-card");
  const planner = $("#planner");
  const codeInput = $("#user-code");
  const profileCode = $("#profile-code");
  const profileDialog = $("#profile-dialog");

  if (!form || !authCard || !planner || !codeInput || !profileCode) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const code = codeInput.value.trim().toLowerCase();
    if (!code) return;
    state.code = code;
    loadProfile(code);
    authCard.classList.add("hidden");
    planner.classList.remove("hidden");
    profileCode.textContent = code;
    safeSet("ibdp:lastCode", code);
    showStatus(state.storageAvailable ? `Logged in as ${code}.` : `Using temporary session as ${code}.`);
    renderAll();
  });

  $("#logout")?.addEventListener("click", () => {
    state.code = null;
    state.profile = defaultProfile();
    planner.classList.add("hidden");
    authCard.classList.remove("hidden");
    codeInput.focus();
    showStatus("Logged out.");
  });

  $("#open-profile")?.addEventListener("click", () => {
    if (!state.code || !profileDialog) return;
    if (typeof profileDialog.showModal === "function") {
      profileDialog.showModal();
    } else {
      alert(`Profile code: ${state.code}`);
    }
  });

  $("#close-profile")?.addEventListener("click", () => {
    if (profileDialog && typeof profileDialog.close === "function") {
      profileDialog.close();
    }
  });

  const lastCode = safeGet("ibdp:lastCode");
  if (lastCode) codeInput.value = lastCode;
}

function init() {
  detectStorage();
  setupAuth();
  setupTimer();
}

document.addEventListener("DOMContentLoaded", init);

window.addEventListener("error", (event) => {
  showStatus(`Unexpected error: ${event.message}`, true);
});
