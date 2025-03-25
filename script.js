// Credenciales predefinidas
const validUsername = "admin";
const validPassword = "admin";

// Referencia al formulario y al mensaje
const form = document.getElementById("loginForm");
const message = document.getElementById("message");

// Manejo del evento submit
form.addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar recarga de la página

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === validUsername && password === validPassword) {
        message.style.color = "green";
        message.textContent = "Login successful!";
        // Aquí podrías redirigir a otra página si es necesario
        window.location.href="juan.html";
    } else {
        message.style.color = "red";
        message.textContent = "el usuario o contraseña es incorrecto";
    }
});
