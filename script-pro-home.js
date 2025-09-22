function handleNavigation(section) {
  // Add click animation
  event.currentTarget.style.transform = "scale(0.95)"
  setTimeout(() => {
    event.currentTarget.style.transform = ""
  }, 150)

  // Log navigation
  console.log(`Navigating to ${section} section`)

  if (section === 'timetable') {
    // Redirect to the timetable page
    window.location.href = 'tt.html';
  }else if (section === 'attendance') {
    // Redirect to the attendance page
    window.location.href = 'attendancepage-prof.html';
  }/*else if (section === 'smartboard') {
    // Redirect to the attendance page
    window.location.href = 'insert-file-name.html';
  }*/ else {
    // Show alert for other sections for demonstration
    const sectionNames = {
      smartboard: "Smart Board Sessions",
    }
    alert(`Navigating to ${sectionNames[section]} page...`)
  }
}


// Toggle dark mode - More robust version
function initializeDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;
  
  if (!darkModeToggle) {
    console.error('Dark mode toggle not found');
    return;
  }
  
  // Set initial state from localStorage
  const savedMode = localStorage.getItem('darkMode');
  if (savedMode === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.checked = true;
  }
  
  // Add event listener
  darkModeToggle.addEventListener('change', function() {
    if (this.checked) {
      body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'disabled');
    }
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeDarkMode);
} else {
  initializeDarkMode();
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add scroll effect to navigation cards
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = `${Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.1}s`
      entry.target.classList.add("fade-in-up")
    }
  })
}, observerOptions)

// Observe all cards and feature items
document.querySelectorAll(".nav-card, .feature-item").forEach((card) => {
  observer.observe(card)
})

// Add hover sound effect (optional)
document.querySelectorAll(".nav-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    // Add subtle hover effect
    card.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
  })
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease-in-out"
  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 100)
})
