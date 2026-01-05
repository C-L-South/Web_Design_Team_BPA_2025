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
  const lineReaderToggle = document.getElementById("lineReaderToggle");
  const grayscaleToggle = document.getElementById("grayscaleToggle");
  const textSizeRadios = document.querySelectorAll("input[name='textSize']");
  const fontFamilyRadios = document.querySelectorAll("input[name='fontFamily']");

  function getCardByTitle(title) {
    const cards = Array.from(document.querySelectorAll(".settings-card"));
    return cards.find(card => {
      const h2 = card.querySelector("h2");
      return (h2?.textContent || "").trim().toLowerCase() === title.toLowerCase();
    }) || null;
  }

  function getCardInputs(card) {
    if (!card) return [];
    return Array.from(card.querySelectorAll("input"));
  }

  const usernameCard = getCardByTitle("Username");
  const passwordCard = getCardByTitle("Password");
  const displayNameCard = getCardByTitle("Display Name");
  const deleteCard = getCardByTitle("Delete Account");

  const [currentUsernameInput, newUsernameInput] = getCardInputs(usernameCard);
  const [newPasswordInput, confirmPasswordInput] = getCardInputs(passwordCard);
  const [currentDisplayInput, newDisplayInput] = getCardInputs(displayNameCard);
  const [deleteConfirmInput] = getCardInputs(deleteCard);

  const usernameSaveBtn = usernameCard?.querySelector("button") || null;
  const passwordSaveBtn = passwordCard?.querySelector("button") || null;
  const displayNameSaveBtn = displayNameCard?.querySelector("button") || null;
  const deleteBtn = deleteCard?.querySelector("button") || null;

  if (deleteConfirmInput) {
    deleteConfirmInput.value = "";
    deleteConfirmInput.setAttribute("autocomplete", "off");
    deleteConfirmInput.setAttribute("autocapitalize", "off");
    deleteConfirmInput.setAttribute("spellcheck", "false");
  }
  if (deleteCard) {
    const f = deleteCard.querySelector("form");
    if (f) f.setAttribute("autocomplete", "off");
  }

  auth.onAuthStateChanged(async (user) => {
    if (!user) {
      window.location.href = "login.html";
      return;
    }

    let userData = {};
    try {
      const snap = await db.collection("users").doc(user.uid).get();
      if (snap.exists) userData = snap.data();
    } catch (err) {
      console.error("Error loading user profile:", err);
    }

    const username = userData.email || "";
      console.log(username)
    const displayName = user.displayName || userData.displayName || user.email || "";

    if (currentUsernameInput) currentUsernameInput.value = username;
    if (currentDisplayInput) currentDisplayInput.value = displayName;
    if (deleteConfirmInput) deleteConfirmInput.value = "";

    let prefs = {
      lineReader: typeof userData.lineReader === "boolean" ? userData.lineReader : false,
      grayscale: typeof userData.grayscale === "boolean" ? userData.grayscale : false,
      textSize: userData.textSize || "normal",
      fontFamily: userData.fontFamily || "normal"
    };

    if (lineReaderToggle) lineReaderToggle.checked = !!prefs.lineReader;
    if (grayscaleToggle) grayscaleToggle.checked = !!prefs.grayscale;
    textSizeRadios.forEach(r => (r.checked = r.value === prefs.textSize));
    fontFamilyRadios.forEach(r => (r.checked = r.value === prefs.fontFamily));

    window.updateAccessibilityPrefs?.(prefs);

    usernameSaveBtn?.addEventListener("click", async () => {
      const newUsername = (newUsernameInput?.value || "").trim();
      if (!newUsername) return alert("Please enter a new username.");

      try {
        await db.collection("users").doc(user.uid).set({ username: newUsername }, { merge: true });
        if (currentUsernameInput) currentUsernameInput.value = newUsername;
        if (newUsernameInput) newUsernameInput.value = "";
        alert("Username updated.");
      } catch (err) {
        console.error("Error updating username:", err);
        alert("Error updating username. Please try again.");
      }
    });

    displayNameSaveBtn?.addEventListener("click", async () => {
      const newDisplayName = (newDisplayInput?.value || "").trim();
      if (!newDisplayName) return alert("Please enter a new display name.");

      try {
        await user.updateProfile({ displayName: newDisplayName });
        await db.collection("users").doc(user.uid).set({ displayName: newDisplayName }, { merge: true });
        if (currentDisplayInput) currentDisplayInput.value = newDisplayName;
        if (newDisplayInput) newDisplayInput.value = "";
        alert("Display name updated.");
      } catch (err) {
        console.error("Error updating display name:", err);
        alert("Error updating display name. You may need to log in again.");
      }
    });

    passwordSaveBtn?.addEventListener("click", async () => {
      const newPw = newPasswordInput?.value || "";

      if (!newPw) return alert("Please fill out the password field.");

      try {
        await user.updatePassword(newPw);
        if (newPasswordInput) newPasswordInput.value = "";
        alert("Password updated.");
      } catch (err) {
        console.error("Error updating password:", err);
        if (err.code === "auth/requires-recent-login") {
          alert("For security reasons, please log out and log in again, then change your password.");
        } else {
          alert("Error updating password. Please try again.");
        }
      }
    });

    deleteBtn?.addEventListener("click", async () => {
      const text = (deleteConfirmInput?.value || "").trim();
      if (text.toLowerCase() !== "delete") return alert('Please type "Delete" to confirm.');
      if (!confirm("Are you sure you want to permanently delete your account?")) return;

      try {
        try { await db.collection("users").doc(user.uid).delete(); } catch {}
        await user.delete();
        alert("Your account has been deleted.");
        window.location.href = "index.html";
      } catch (err) {
        console.error("Error deleting account:", err);
        if (err.code === "auth/requires-recent-login") {
          alert("For security reasons, please log out and log in again, then try deleting your account.");
        } else {
          alert("Error deleting account. Please try again.");
        }
      }
    });

    async function persistPrefs() {
      try {
        await db.collection("users").doc(user.uid).set(
          {
            lineReader: prefs.lineReader,
            grayscale: prefs.grayscale,
            textSize: prefs.textSize,
            fontFamily: prefs.fontFamily
          },
          { merge: true }
        );
      } catch (err) {
        console.error("Error saving accessibility prefs:", err);
      }
    }

    lineReaderToggle?.addEventListener("change", async () => {
      prefs.lineReader = lineReaderToggle.checked;
      window.updateAccessibilityPrefs?.({ lineReader: prefs.lineReader });
      await persistPrefs();
    });

    grayscaleToggle?.addEventListener("change", async () => {
      prefs.grayscale = grayscaleToggle.checked;
      window.updateAccessibilityPrefs?.({ grayscale: prefs.grayscale });
      await persistPrefs();
    });

    textSizeRadios.forEach(radio => {
      radio.addEventListener("change", async () => {
        if (!radio.checked) return;
        prefs.textSize = radio.value;
        window.updateAccessibilityPrefs?.({ textSize: prefs.textSize });
        await persistPrefs();
      });
    });

    fontFamilyRadios.forEach(radio => {
      radio.addEventListener("change", async () => {
        if (!radio.checked) return;
        prefs.fontFamily = radio.value;
        window.updateAccessibilityPrefs?.({ fontFamily: prefs.fontFamily });
        await persistPrefs();
      });
    });
  });
});
