// Appointment form handling
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

document.addEventListener('DOMContentLoaded', function() {
    const appointmentForm = document.getElementById('appointmentForm');
    const appointmentDateInput = document.getElementById('appointmentDate');

    // Set minimum date to today (prevents selecting past dates)
    if (appointmentDateInput) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const todayString = `${year}-${month}-${day}`;
        appointmentDateInput.setAttribute('min', todayString);
    }

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const phoneNumber = document.getElementById('phoneNumber').value.trim();
            const email = document.getElementById('email').value.trim();
            const appointmentDate = appointmentDateInput.value;

            if (!firstName || !lastName || !phoneNumber || !email || !appointmentDate) {
                alert('Please fill out all fields.');
                return;
            }

            try {
                await db.collection('appointments').add({
                    firstName,
                    lastName,
                    phoneNumber,
                    email,
                    appointmentDate,
                    status: 'pending',
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                });
                alert('Your appointment request has been submitted!')
                appointmentForm.reset();

            }
            catch (error) {
                console.log("Error saving appointment", error);
                alert("There was an error submitting your request. Please try again later.")
            }
        });
    }
});
