// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const navLinks = document.getElementById("navLinks")

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active")
  const icon = mobileMenuBtn.querySelector("i")
  if (navLinks.classList.contains("active")) {
    icon.classList.remove("fa-bars")
    icon.classList.add("fa-times")
  } else {
    icon.classList.remove("fa-times")
    icon.classList.add("fa-bars")
  }
})

// Close mobile menu when clicking on a link
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    navLinks.classList.remove("active")
    const icon = mobileMenuBtn.querySelector("i")
    icon.classList.remove("fa-times")
    icon.classList.add("fa-bars")
  }
})

// Handle navigation card clicks
function handleNavigation(section) {
  // Add click animation
  event.currentTarget.style.transform = "scale(0.95)"
  setTimeout(() => {
    event.currentTarget.style.transform = ""
  }, 150)

  // Log navigation (in a real app, this would navigate to the respective page)
  console.log(`Navigating to ${section} section`)

  // Show alert for demonstration
  const sectionNames = {
    timetable: "Timetable",
    attendance: "Attendance",
    smartboard: "Smart Board Sessions",
  }

  alert(`Navigating to ${sectionNames[section]} page...`)
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
