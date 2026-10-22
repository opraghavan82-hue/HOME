import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
  collection, doc, setDoc, addDoc, updateDoc, deleteDoc, query, where,
  onSnapshot, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const IDLE = 10 * 60 * 1000;
let session = null, fails = 0, lockUntil = 0, mode = "in", idleTimer = null;
let unsubscribeTasks = null;

function startSession(user) {
  session = {
    uid: user.uid,
    name: user.displayName || user.email?.split("@")[0] || "User",
    email: user.email,
    exp: Date.now() + IDLE
  };
  resetIdle();
}

function resetIdle() {
  if (!session) return;
  session.exp = Date.now() + IDLE;
}

async function signUp(name, email, password) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(credential.user, { displayName: name });
  await setDoc(doc(db, "users", credential.user.uid), {
    uid: credential.user.uid,
    name,
    email: credential.user.email,
    createdAt: serverTimestamp()
  }, { merge: true });
  startSession({ ...credential.user, displayName: name });
}

async function signIn(email, password) {
  if (Date.now() < lockUntil) throw new Error(`Too many tries. Wait ${Math.ceil((lockUntil - Date.now()) / 1000)}s.`);
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const user = credential.user;
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: user.displayName || user.email.split("@")[0],
      email: user.email,
      lastLoginAt: serverTimestamp()
    }, { merge: true });
    fails = 0;
    startSession(user);
  } catch (error) {
    if (["auth/invalid-credential", "auth/wrong-password", "auth/user-not-found"].includes(error.code)) {
      if (++fails >= 5) { lockUntil = Date.now() + 30000; fails = 0; }
      throw new Error("Email or password is wrong.");
    }
    throw error;
  }
}

async function signOut(note) {
  if (unsubscribeTasks) { unsubscribeTasks(); unsubscribeTasks = null; }
  session = null;
  tasks = [];
  await firebaseSignOut(auth);
  showView();
  if (note) setMsg("#authMsg", note, "err");
}

["click", "keydown"].forEach((ev) => document.addEventListener(ev, resetIdle));
setInterval(() => {
  if (session && Date.now() > session.exp) signOut("You were signed out after 10 idle minutes.");
  const sess = $("#sess");
  if (session && sess) {
    const seconds = Math.max(0, Math.round((session.exp - Date.now()) / 1000));
    sess.textContent = `Session ends in ${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")} if idle`;
  }
}, 1000);

function setMsg(sel, text, cls = "") { const m = $(sel); m.textContent = text; m.className = "msg " + cls; }
function setMode(m) {
  mode = m;
  $("#tabIn").classList.toggle("on", m === "in"); $("#tabUp").classList.toggle("on", m === "up");
  $("#tabIn").setAttribute("aria-pressed", m === "in"); $("#tabUp").setAttribute("aria-pressed", m === "up");
  $("#nameF").hidden = m === "in";
  $("#go").textContent = m === "in" ? "Sign in" : "Create account";
  $("#pw").autocomplete = m === "in" ? "current-password" : "new-password";
  setMsg("#authMsg", "");
}
$("#tabIn").addEventListener("click", () => setMode("in"));
$("#tabUp").addEventListener("click", () => setMode("up"));
$("#authForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = $("#name").value.trim(), email = $("#email").value.trim().toLowerCase(), pw = $("#pw").value;
  if (mode === "up" && !name) return setMsg("#authMsg", "Enter your name.", "err");
  if (!/^\\S+@\\S+\\.\\S+$/.test(email)) return setMsg("#authMsg", "Enter a valid email address.", "err");
  if (pw.length < 8) return setMsg("#authMsg", "Password needs at least 8 characters.", "err");
  const button = $("#go");
  button.disabled = true;
  try {
    if (mode === "up") await signUp(name, email, pw);
    else await signIn(email, pw);
    $("#pw").value = "";
    setMsg("#authMsg", "");
    showView();
  } catch (err) {
    setMsg("#authMsg", err.message || "Authentication failed.", "err");
  } finally {
    button.disabled = false;
  }
});
$("#signOut").addEventListener("click", () => signOut());

/* ---------- Tasks (document-style store, one list per user) ---------- */
let tasks = [], filter = "all", editing = null, searchText = "";
const tasksCollection = () => collection(db, "tasks");
async function saveTask(task) {
  const payload = {
    ownerId: session.uid,
    title: task.title,
    pri: task.pri,
    due: task.due || "",
    done: !!task.done,
    updatedAt: serverTimestamp()
  };
  if (task.id) await setDoc(doc(db, "tasks", task.id), payload, { merge: true });
  else await addDoc(tasksCollection(), { ...payload, createdAt: serverTimestamp() });
}
async function removeTask(id) {
  await deleteDoc(doc(db, "tasks", id));
}
function listenToTasks() {
  if (unsubscribeTasks) unsubscribeTasks();
  const q = query(tasksCollection(), where("ownerId", "==", session.uid));
  unsubscribeTasks = onSnapshot(q, (snapshot) => {
    tasks = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    tasks.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
    render();
    if (snapshot.metadata.hasPendingWrites === false) {
      const msg = $("#appMsg");
      if (msg && msg.textContent.includes("Updating your task list")) setMsg("#appMsg", "Task added to Firestore.", "ok");
    }
  }, (error) => setMsg("#appMsg", "Could not load tasks: " + error.message, "err"));
}
const today = () => new Date().toISOString().slice(0, 10);
const fmt = (d) => new Date(d + "T00:00").toLocaleDateString(undefined, { day: "numeric", month: "short" });

function render() {
  const t0 = today();
  const shown = tasks.filter((t) => (filter === "all" || (filter === "done" ? t.done : !t.done)) && t.title.toLowerCase().includes(searchText));
  const done = tasks.filter((t) => t.done).length;
  const late = tasks.filter((t) => !t.done && t.due && t.due < t0).length;
  $("#stats").innerHTML = [["Total", tasks.length], ["Active", tasks.length - done], ["Done", done], ["Overdue", late]]
    .map(([l, n]) => `<div class="stat"><b>${n}</b><span class="tag">${l}</span></div>`).join("");
  $("#list").innerHTML = shown.length ? shown.map((t) => `
    <li class="task ${t.done ? "done" : ""}" data-id="${t.id}">
      <input type="checkbox" data-act="toggle" aria-label="Mark done: ${esc(t.title)}" ${t.done ? "checked" : ""}>
      <div class="body">
        ${editing === t.id ? `<input data-act="editbox" value="${esc(t.title)}" maxlength="120" aria-label="Edit task title">` : `<div class="t">${esc(t.title)}</div>`}
        <div class="meta"><span class="p-${t.pri}">${t.pri}</span>${t.due ? `<span class="${!t.done && t.due < t0 ? "late" : ""}">Due ${fmt(t.due)}${!t.done && t.due < t0 ? " (late)" : ""}</span>` : ""}</div>
      </div>
      <div class="acts">
        <button class="ghost icon" data-act="${editing === t.id ? "save" : "edit"}">${editing === t.id ? "Save" : "Edit"}</button>
        <button class="ghost icon" data-act="del" aria-label="Delete task">Delete</button>
      </div>
    </li>`).join("") : `<li class="empty">${tasks.length ? "No tasks match this filter." : "No tasks yet. Add your first one above."}</li>`;
  const box = $("[data-act=editbox]"); if (box) { box.focus(); box.setSelectionRange(box.value.length, box.value.length); }
}
$("#addForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = $("#title").value.trim();
  if (!title) return setMsg("#appMsg", "Type a task title first.", "err");
  try {
    await saveTask({ title, pri: $("#pri").value, due: $("#due").value, done: false });
    $("#title").value = ""; $("#due").value = "";
    setMsg("#appMsg", "Task added to Firestore. Updating your task list…", "ok");
  } catch (error) {
    setMsg("#appMsg", "Could not add task: " + error.message, "err");
  }
});
async function commitEdit(li) {
  const input = li.querySelector("[data-act=editbox]");
  const v = input.value.trim();
  const t = tasks.find((x) => x.id === li.dataset.id);
  if (v && t) {
    try {
      await saveTask({ ...t, title: v });
      editing = null;
    } catch (error) {
      setMsg("#appMsg", "Could not update task: " + error.message, "err");
    }
  } else editing = null;
  render();
}
$("#list").addEventListener("click", async (e) => {
  const li = e.target.closest("li.task"), act = e.target.dataset.act;
  if (!li || !act) return;
  const t = tasks.find((x) => x.id === li.dataset.id);
  if (!t) return;
  try {
    if (act === "toggle") await saveTask({ ...t, done: e.target.checked });
    if (act === "del") await removeTask(t.id);
    if (act === "edit") { editing = t.id; render(); }
    if (act === "save") await commitEdit(li);
  } catch (error) {
    setMsg("#appMsg", "Firestore error: " + error.message, "err");
  }
});
$("#list").addEventListener("keydown", (e) => {
  if (e.target.dataset.act !== "editbox") return;
  if (e.key === "Enter") commitEdit(e.target.closest("li"));
  if (e.key === "Escape") { editing = null; render(); }
});
$("#bar").addEventListener("click", (e) => {
  const f = e.target.dataset.f;
  if (!f) return;
  filter = f;
  document.querySelectorAll("[data-f]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.f === f));
  render();
});
$("#search").addEventListener("input", (e) => { searchText = e.target.value.trim().toLowerCase(); render(); });
$("#clear").addEventListener("click", async () => {
  try {
    await Promise.all(tasks.filter((t) => t.done).map((t) => removeTask(t.id)));
    setMsg("#appMsg", "Completed tasks cleared.", "ok");
  } catch (error) {
    setMsg("#appMsg", "Could not clear completed tasks: " + error.message, "err");
  }
});

/* ---------- View + theme ---------- */
function showView() {
  const on = !!session;
  $("#authView").hidden = on;
  $("#appView").hidden = !on;
  $("#sess").hidden = !on;
  $("#signOut").hidden = !on;
  if (on) {
    $("#hello").textContent = `Hi ${session.name.split(" ")[0]}, here’s your list`;
    filter = "all"; searchText = ""; editing = null; $("#search").value = "";
    listenToTasks();
  } else {
    if (unsubscribeTasks) { unsubscribeTasks(); unsubscribeTasks = null; }
    tasks = [];
    render();
  }
}

$("#theme").addEventListener("click", () => {
  const r = document.documentElement;
  const dark = r.dataset.theme ? r.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  r.dataset.theme = dark ? "light" : "dark";
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    startSession(user);
    showView();
  } else {
    session = null;
    showView();
  }
});
