// Appointment form handling
document.addEventListener('DOMContentLoaded', function() {
    const appointmentForm = document.getElementById('appointmentForm');
    const appointmentDate = document.getElementById('appointmentDate');

    // Set minimum date to today (prevents selecting past dates)
    if (appointmentDate) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const todayString = `${year}-${month}-${day}`;
        appointmentDate.setAttribute('min', todayString);
    }

    // Handle form submission (placeholder - no functionality yet)
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Form submission functionality will be added later
            console.log('Form submitted (functionality to be implemented)');
        });
    }
});
