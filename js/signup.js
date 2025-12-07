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
const auth = firebase.auth();
const db = firebase.firestore();

const form = document.getElementById("signupForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    //get values
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert('Please provide both email and password.');
      return;
    }

    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed up:", user.uid, user.email);
        return db.collection("users").doc(user.uid).set({
          uid: user.uid,
          email: user.email,
          displayName: user.email,
          grayscale: false,
          lineReader: false,
          textSize: "normal",
          fontFamily: "normal",
        });
      })
      .then(() => {
        alert("Account created!");
        window.location.href = "home.html";
      })
      .catch((error) => {
        console.error(error.code, error.message);
        alert(error.message);
      }); 
});
