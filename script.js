document.getElementById("evaluateButton").addEventListener("click", function () {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const feedbackDiv = document.getElementById("feedback");

    // Common passwords list
    const commonPasswords = ["password", "12345", "qwerty", "admin", "letmein"];

    // Validation and scoring
    let score = 0;
    let feedback = [];

    if (password.length >= 8) {
        score += 2;
    } else {
        feedback.push("Password should be at least 8 characters long.");
    }

    if (/[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        score += 4;
    } else {
        feedback.push("Password should include a mix of uppercase, lowercase, digits, and special characters.");
    }

    if (!commonPasswords.some((common) => password.toLowerCase().includes(common))) {
        score += 2;
    } else {
        feedback.push("Password should not contain common words or patterns.");
    }

    if (username && password !== username) {
        score += 2;
    } else if (username) {
        feedback.push("Password should not be the same as the username.");
    }

    if (!password) {
        feedback.push("Password cannot be empty.");
    }

    // Provide feedback
    feedbackDiv.innerHTML = `
        <p>Password Strength: ${score >= 8 ? "Strong" : score >= 5 ? "Moderate" : "Weak"}</p>
        <p>Score: ${score}/10</p>
        ${feedback.length > 0 ? `<p>Suggestions:</p><ul>${feedback.map(f => `<li>${f}</li>`).join("")}</ul>` : ""}
    `;
});
