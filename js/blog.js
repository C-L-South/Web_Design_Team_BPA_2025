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

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const cards = Array.from(document.querySelectorAll(".blog-card"));

  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "login.html";
    }
  });

  if (!searchInput || cards.length === 0) return;

  const index = cards.map((card) => {
    const title = (card.querySelector(".blog-title")?.textContent || "").toLowerCase();
    const desc = (card.querySelector(".blog-description")?.textContent || "").toLowerCase();
    const date = (card.querySelector(".blog-date")?.textContent || "").toLowerCase();
    return { card, haystack: `${title} ${desc} ${date}` };
  });

  function applySearch(query) {
    const q = query.trim().toLowerCase();

    index.forEach(({ card, haystack }) => {
      const match = !q || haystack.includes(q);
      card.style.display = match ? "" : "none";
    });
  }

  searchInput.addEventListener("input", () => {
    applySearch(searchInput.value);
  });

  // Prevent form submit from reloading page
  const form = document.getElementById("searchForm");
  if (form) {
    form.addEventListener("submit", (e) => e.preventDefault());
  }

  applySearch(searchInput.value || "");
});
