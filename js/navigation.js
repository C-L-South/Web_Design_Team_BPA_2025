// Load navigation from separate HTML file
document.addEventListener('DOMContentLoaded', function() {
    const navContainer = document.getElementById('nav-container');
    
    if (navContainer) {
        fetch('navigation.html')
            .then(response => response.text())
            .then(html => {
                navContainer.innerHTML = html;
                
                // Set up logout button functionality after navigation is loaded
                const logoutBtn = document.getElementById('logoutBtn');
                if (logoutBtn) {
                    logoutBtn.addEventListener('click', function() {
                        window.location.href = 'index.html';
                    });
                }
            })
            .catch(error => {
                console.error('Error loading navigation:', error);
            });
    }
});
