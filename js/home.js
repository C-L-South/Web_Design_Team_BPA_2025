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

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("User is still logged in:", user.email);

  } else {
    console.log("No user logged in — redirecting");
    window.location.href = "login.html";
  }
});

document.getElementById("feedbackForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const feedback = document.getElementById("feedback").value.trim();

  if (!name || !email || !feedback) {
    alert("Please fill out all fields");
    return;
  }

  try {
    await db.collection("feedback").add({
      name,
      email,
      feedback,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    alert("Thank you for your feedback! We appreciate your input.");
    document.getElementById("feedbackForm").reset();
  } catch (error) {
    console.error("Error submitting feedback:", error);
    alert("Error submitting feedback. Please try again.");
  }
});
