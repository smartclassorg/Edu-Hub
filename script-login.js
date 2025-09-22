// Tab switching logic
const studentBtn = document.getElementById("studentBtn")
const professorBtn = document.getElementById("professorBtn")
studentBtn.onclick = () => {
  studentBtn.classList.add("active")
  professorBtn.classList.remove("active")
}
professorBtn.onclick = () => {
  professorBtn.classList.add("active")
  studentBtn.classList.remove("active")
}

// Password eye toggle logic
const password = document.getElementById("password")
const togglePassword = document.getElementById("togglePassword")
togglePassword.onclick = function () {
  const type = password.type === "password" ? "text" : "password"
  password.type = type
  this.querySelector("i").className = type === "password" ? "fas fa-eye" : "fas fa-eye-slash"
}
togglePassword.onkeydown = function (e) {
  if (e.key === " " || e.key === "Enter") this.onclick()
}

// Handle form submission and navigate to the correct page.
document.querySelector(".login-form").onsubmit = (e) => {
  // Prevent the form from submitting in the default way
  e.preventDefault()

  // ADDED THIS LOGIC
  // Check which button is active to decide where to go
  if (studentBtn.classList.contains("active")) {
    // If student tab is active, go to student home
    window.location.href = "studenthome.html"
  } else {
    // Otherwise, go to professor home
    window.location.href = "profhome.html"
  }
}
