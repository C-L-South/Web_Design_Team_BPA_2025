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
const db   = firebase.firestore();

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".settings-card");
  if (cards.length < 4) {
    console.error("Expected 4 settings cards; found", cards.length);
    return;
  }

  // 0: Username
  const usernameForm = cards[0].querySelector("form");
  const [currentUsernameInput, newUsernameInput] =
    usernameForm.querySelectorAll("input");
  const usernameSaveBtn = usernameForm.querySelector("button");

  // 1: Password
  const passwordForm = cards[1].querySelector("form");
  const [newPasswordInput, confirmPasswordInput] =
    passwordForm.querySelectorAll("input");
  const passwordSaveBtn = passwordForm.querySelector("button");

  // 2: Delete Account
  const deleteForm = cards[2].querySelector("form");
  const [deleteConfirmInput] = deleteForm.querySelectorAll("input");
  const deleteBtn = deleteForm.querySelector("button");

  // 3: Display Name
  const displayNameForm = cards[3].querySelector("form");
  const [currentDisplayInput, newDisplayInput] =
    displayNameForm.querySelectorAll("input");
  const displayNameSaveBtn = displayNameForm.querySelector("button");

  // Wait for login
  auth.onAuthStateChanged(async (user) => {
    if (!user) {
      window.location.href = "login.html";
      return;
    }

    console.log("Settings page: logged in as", user.uid);

    //Load current profile from Firestore
    let userData = {};
    try {
      const snap = await db.collection("users").doc(user.uid).get();
      if (snap.exists) userData = snap.data();
    } catch (err) {
      console.error("Error loading user profile:", err);
    }

    const username    = userData.username || "";
    const displayName = user.displayName || userData.displayName || "";

    currentUsernameInput.value = username;
    currentDisplayInput.value  = displayName;

    // Save the username
    usernameSaveBtn.addEventListener("click", async () => {
      const newUsername = newUsernameInput.value.trim();
      if (!newUsername) {
        alert("Please enter a new username.");
        return;
      }

      try {
        await db.collection("users").doc(user.uid).set(
          { username: newUsername },
          { merge: true }
        );

        currentUsernameInput.value = newUsername;
        newUsernameInput.value = "";
        alert("Username updated.");
      } catch (err) {
        console.error("Error updating username:", err);
        alert("Error updating username. Please try again.");
      }
    });

    // Save the display name
    displayNameSaveBtn.addEventListener("click", async () => {
      const newDisplayName = newDisplayInput.value.trim();
      if (!newDisplayName) {
        alert("Please enter a new display name.");
        return;
      }

      try {
        // Update Firebase Auth profile
        await user.updateProfile({ displayName: newDisplayName });

        // Also store in Firestore
        await db.collection("users").doc(user.uid).set(
          { displayName: newDisplayName },
          { merge: true }
        );

        currentDisplayInput.value = newDisplayName;
        newDisplayInput.value = "";
        alert("Display name updated.");
      } catch (err) {
        console.error("Error updating display name:", err);
        alert("Error updating display name. You may need to log in again.");
      }
    });

    // Save the password
    passwordSaveBtn.addEventListener("click", async () => {
      const newPw      = newPasswordInput.value;
      const confirmPw  = confirmPasswordInput.value;

      if (!newPw || !confirmPw) {
        alert("Please fill out both password fields.");
        return;
      }
      if (newPw !== confirmPw) {
        alert("Passwords do not match.");
        return;
      }
      if (newPw.length < 8 || !/\d/.test(newPw) || !/[^\w\s]/.test(newPw)) {
        alert(
          "Password must be at least 8 characters and include a number and a symbol."
        );
        return;
      }

      try {
        await user.updatePassword(newPw);
        newPasswordInput.value = "";
        confirmPasswordInput.value = "";
        alert("Password updated.");
      } catch (err) {
        console.error("Error updating password:", err);
        if (err.code === "auth/requires-recent-login") {
          alert(
            "For security reasons, please log out and log in again, then change your password."
          );
        } else {
          alert("Error updating password. Please try again.");
        }
      }
    });

    // Delete the account
    deleteBtn.addEventListener("click", async () => {
      const text = deleteConfirmInput.value.trim();
      if (text.toLowerCase() !== "delete") {
        alert('Please type "Delete" to confirm.');
        return;
      }

      if (!confirm("Are you sure you want to permanently delete your account?")) {
        return;
      }

      try {
        // Remove user profile doc (if exists)
        try {
          await db.collection("users").doc(user.uid).delete();
        } catch (innerErr) {
          console.warn("Error deleting user profile doc (ignored):", innerErr);
        }

        // Delete auth user
        await user.delete();

        alert("Your account has been deleted.");
        window.location.href = "index.html";
      } catch (err) {
        console.error("Error deleting account:", err);
        if (err.code === "auth/requires-recent-login") {
          alert(
            "For security reasons, please log out and log in again, then try deleting your account."
          );
        } else {
          alert("Error deleting account. Please try again.");
        }
      }
    });
  });
});
