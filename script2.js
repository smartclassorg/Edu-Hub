// Toggle dark mode
function enableDarkModeToggle() {
    const darkModeToggle = document.getElementById("darkModeToggle");
    if (darkModeToggle) {
        darkModeToggle.addEventListener("change", function () {
            document.body.classList.toggle("dark-mode", this.checked);
        });
    }
}

// Create animated background particles
function createParticles() {
    const bgAnimation = document.getElementById('bgAnimation');
    // Ensure bgAnimation exists before proceeding
    if (!bgAnimation) return;

    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        
        bgAnimation.appendChild(particle);
    }
}

// Update current time and highlight current class
function updateCurrentTime() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;

    // Define class times (in minutes from midnight)
    const classTimes = [
        { start: 9 * 60, end: 10 * 60 + 30 }, // 09:00-10:30
        { start: 11 * 60, end: 12 * 60 + 30 }, // 11:00-12:30
        { start: 14 * 60, end: 15 * 60 + 30 }, // 14:00-15:30
        { start: 16 * 60, end: 17 * 60 + 30 }  // 16:00-17:30
    ];

    // Remove all current class highlights
    document.querySelectorAll('.class-slot.current').forEach(slot => {
        slot.classList.remove('current');
    });

    // Find and highlight current class
    classTimes.forEach((classTime, index) => {
        if (currentTime >= classTime.start && currentTime <= classTime.end) {
            const rows = document.querySelectorAll('.timetable tbody tr');
            if (rows[index]) {
                const todayColumn = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
                if (todayColumn >= 1 && todayColumn <= 5) { // Monday to Friday
                    const cell = rows[index].children[todayColumn];
                    if (cell) {
                        const classSlot = cell.querySelector('.class-slot');
                        if (classSlot) {
                            classSlot.classList.add('current');
                        }
                    }
                }
            }
        }
    });
}

// Add click effects to cards
function addClickEffects() {
    document.querySelectorAll('.class-card, .stat-card').forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Note: The createParticles function will only run if an element with id="bgAnimation" exists.
    // If you have removed it, this function will do nothing.
    createParticles(); 
    
    updateCurrentTime();
    addClickEffects();
    enableDarkModeToggle(); // Added dark mode functionality
    
    // Update time every minute
    setInterval(updateCurrentTime, 60000);
});

// Add smooth scrolling for better UX
document.documentElement.style.scrollBehavior = 'smooth';