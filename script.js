const password = document.getElementById("password");
const fill = document.getElementById("strengthFill");
const label = document.getElementById("strengthLabel");
const scoreText = document.getElementById("score");
const feedback = document.getElementById("feedback");
const toggle = document.getElementById("toggle");
const themeToggle = document.getElementById("themeToggle");
const generateBtn = document.getElementById("generate");

password.addEventListener("input", evaluate);
toggle.addEventListener("click", togglePassword);
themeToggle.addEventListener("click", toggleTheme);
generateBtn.addEventListener("click", generatePassword);



function generatePassword() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let pass = "";
  
    for (let i = 0; i < 14; i++) {
      pass += chars[Math.floor(Math.random() * chars.length)];
    }
  
    password.value = pass;
  
    // 🔥 IMPORTANT: reset to hidden mode consistently
    password.type = "password";
    toggle.textContent = "👁";
  
    evaluate();
  }

function evaluate() {
  const val = password.value;

  const rules = [
    { test: val.length >= 8, text: "At least 8 characters" },
    { test: /[A-Z]/.test(val), text: "Uppercase letter" },
    { test: /[a-z]/.test(val), text: "Lowercase letter" },
    { test: /[0-9]/.test(val), text: "Number" },
    { test: /[^A-Za-z0-9]/.test(val), text: "Special character" }
  ];

  let score = rules.filter(r => r.test).length;

  updateUI(score, rules, val);
}

function updateUI(score, rules, val) {
  const percent = (score / 5) * 100;
  fill.style.width = percent + "%";
  fill.className = "strength-fill";

  scoreText.textContent = score + "/5";

  if (!val) {
    label.textContent = "Enter password";
  } else if (score <= 2) {
    fill.classList.add("weak");
    label.textContent = "Weak";
  } else if (score <= 4) {
    fill.classList.add("medium");
    label.textContent = "Medium";
  } else {
    fill.classList.add("strong");
    label.textContent = "Strong";
  }

  // Checklist UI
  feedback.innerHTML = `
    <strong>Password must contain:</strong>
    <ul>
      ${rules.map(rule => `
        <li style="color:${rule.test ? '#22c55e' : '#94a3b8'}">
          ${rule.test ? '✔' : '✖'} ${rule.text}
        </li>
      `).join("")}
    </ul>
  `;
}

function togglePassword() {
  password.type =
    password.type === "password" ? "text" : "password";
}
function toggleTheme() {
    document.body.classList.toggle("light");
  
    if (document.body.classList.contains("light")) {
      themeToggle.textContent = "☀️";
    } else {
      themeToggle.textContent = "🌙";
    }
  }