// Tab switching logic
const studentBtn = document.getElementById('studentBtn');
const professorBtn = document.getElementById('professorBtn');
studentBtn.onclick = function () {
    studentBtn.classList.add('active');
    professorBtn.classList.remove('active');
};
professorBtn.onclick = function () {
    professorBtn.classList.add('active');
    studentBtn.classList.remove('active');
};

// Password eye toggle logic
const password = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
togglePassword.onclick = function () {
    const type = password.type === 'password' ? 'text' : 'password';
    password.type = type;
    this.querySelector('i').className = type === 'password'
        ? 'fas fa-eye'
        : 'fas fa-eye-slash';
};
togglePassword.onkeydown = function(e) {
    if (e.key === " " || e.key === "Enter") this.onclick();
};

// Prevent form submit for demo
document.querySelector('.login-form').onsubmit = function(e) {
    e.preventDefault();
    alert('Login submitted! (demo)');
};
