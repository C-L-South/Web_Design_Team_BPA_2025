const firebaseConfig = {
  apiKey: "AIzaSyDncN-lZWQLBa3fkMI3QkAE7CqcA6IK3ss",
  authDomain: "bpa-webdesign-team.firebaseapp.com",
  databaseURL: "https://bpa-webdesign-team-default-rtdb.firebaseio.com",
  projectId: "bpa-webdesign-team",
  storageBucket: "bpa-webdesign-team.firebasestorage.app",
  messagingSenderId: "12413897311",
  appId: "1:12413897311:web:b6a1b9363d3e6f2a0b69ea",
  measurementId: "G-2D29B9KZCR"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

document.addEventListener("DOMContentLoaded", () => {
  const postsTableBody = document.getElementById("postsTableBody");
  const searchInput = document.getElementById("searchInput");

  const tabAllPosts = document.getElementById("tabAllPosts");
  const tabMyPosts = document.getElementById("tabMyPosts");

  const newPostButtonTop = document.getElementById("newPostButtonTop");

  let allPosts = [];
  let myPosts = [];
  let activeTab = "all"; // "all" | "mine"

  function setActiveTab(tab) {
    activeTab = tab;

    if (tabAllPosts) tabAllPosts.classList.toggle("tab-active", tab === "all");
    if (tabMyPosts) tabMyPosts.classList.toggle("tab-active", tab === "mine");

    renderCurrent();
  }

  function getCurrentDocs() {
    return activeTab === "mine" ? myPosts : allPosts;
  }

  function renderPosts(docs) {
    postsTableBody.innerHTML = "";

    if (!docs.length) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 3;
      td.textContent = "No posts yet.";
      tr.appendChild(td);
      postsTableBody.appendChild(tr);
      return;
    }

    docs.forEach((doc) => {
      const data = doc.data();

      const tr = document.createElement("tr");

      const titleTd = document.createElement("td");
      const link = document.createElement("a");
      link.href = `post.html?id=${doc.id}`;
      link.textContent = data.title || "(Untitled post)";
      titleTd.appendChild(link);

      const upvotesTd = document.createElement("td");
      upvotesTd.textContent = `${data.upvotes || 0}`;

      const createdByTd = document.createElement("td");
      createdByTd.textContent = data.createdBy ? `By ${data.createdBy}` : "By Anonymous";

      tr.appendChild(titleTd);
      tr.appendChild(upvotesTd);
      tr.appendChild(createdByTd);

      postsTableBody.appendChild(tr);
    });
  }

  function renderCurrent() {
    const q = (searchInput?.value || "").trim().toLowerCase();
    const docs = getCurrentDocs();

    if (!q) {
      renderPosts(docs);
      return;
    }

    const filtered = docs.filter((doc) => {
      const d = doc.data();
      const title = (d.title || "").toLowerCase();
      const author = (d.createdBy || "").toLowerCase();
      return title.includes(q) || author.includes(q);
    });

    renderPosts(filtered);
  }

  async function loadPosts() {
    const snapshot = await db.collection("posts").orderBy("createdAt", "desc").get();
    allPosts = snapshot.docs;
  }

  async function loadMyPosts(user) {
    const snapshot = await db
      .collection("posts")
      .where("createdById", "==", user.uid)
      .orderBy("createdAt", "desc")
      .get();

    myPosts = snapshot.docs;
  }

  async function createPost(user) {
    const title = prompt("Post title:");
    if (!title) return;

    const body = prompt("Post content:");
    if (!body) return;

    const userName = user.displayName || user.email || "Anonymous";

    await db.collection("posts").add({
      title,
      body,
      createdBy: userName,
      createdById: user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      repliesCount: 0,
      upvotes: 0
    });

    await loadPosts();
    await loadMyPosts(user);
    renderCurrent();
    alert("Post created!");
  }

  if (searchInput) {
    searchInput.addEventListener("input", renderCurrent);
  }

  if (tabAllPosts) tabAllPosts.addEventListener("click", () => setActiveTab("all"));
  if (tabMyPosts) tabMyPosts.addEventListener("click", () => setActiveTab("mine"));

  auth.onAuthStateChanged(async (user) => {
    if (!user) {
      window.location.href = "login.html";
      return;
    }

    try {
      await loadPosts();
      await loadMyPosts(user);
      setActiveTab("all");

      if (newPostButtonTop) {
        newPostButtonTop.addEventListener("click", () => createPost(user));
      }
    } catch (err) {
      console.error("Error loading posts:", err);
      postsTableBody.innerHTML = '<tr><td colspan="3">Error loading posts</td></tr>';
    }
  });
});
