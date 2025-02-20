document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const messageElement = document.getElementById("message");

    messageElement.textContent = "Connecting...";

    const response = await fetch("http://localhost:5000/naukri-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    messageElement.textContent = data.message;
});
