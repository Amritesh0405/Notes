const loginForm = document.getElementById("formSignin");
const loginButton = document.getElementById("loginButton");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "user" && password === "password") {
        alert("You have successfully logged in.");
        location.replace("../html/notes.html");
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})