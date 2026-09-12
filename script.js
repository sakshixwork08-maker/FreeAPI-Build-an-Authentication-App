const registerForm = document.getElementById('register-form')

registerForm.addEventListener('submit', async (e) => {
    const submitButton = document.querySelector("button");

    e.preventDefault();

    //prevent the button to click when fetching starts
    submitButton.disabled = true;
    submitButton.textContent = 'Registering...'

    const username = document.getElementById("username").value
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;


    const message = document.getElementById("register-message");

    try {
        const res = await fetch('https://api.freeapi.app/api/v1/users/register', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ username, email, password, role })
        });

        const data = await res.json();
        console.log(data);

        //grab the message from API and show on the UI of register page either success or error
        if (data.success) {
            message.textContent = data.message
            message.style.color = 'green'
        } else { //error is present in aray form in API
            if (data.errors && data.errors.length > 0) {
                message.textContent = data.errors
                    .map((error) => Object.values(error)[0])
                    .join(", ");
            } else {
                //if api don't contains any error then simply show the text message (This API contains 409 code which shows the  "User with email or username already exists" and has empty error)
                message.textContent = data.message; //when error array is empty
            }
            message.style.color = 'red'
        }

    } catch (error) {
        console.error('Something went wrong', error)
        message.textContent = "Something went wrong. Please try again.";
        message.style.color = "red";
    }

    submitButton.disabled = false;
    submitButton.textContent = 'Submit'
})

const loginForm = document.getElementById("login-form");

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = loginForm.querySelector('button')

    const loginUsername = document.getElementById("login-username").value;
    const loginPassword = document.getElementById('login-password').value;

    const loginMessage = document.getElementById('login-message')

    submitBtn.disabled = true;
    submitBtn.textContent = 'Logging in...';

    try {
        const res = await fetch("https://api.freeapi.app/api/v1/users/login", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ username: loginUsername, password: loginPassword }),
        });

        const data = await res.json();
        console.log(data);

        if (data.success) {
            loginMessage.textContent = data.message
            loginMessage.style.color = 'green'
        } else { //error is present in aray form in API
            if (data.errors && data.errors.length > 0) {
                loginMessage.textContent = data.errors
                    .map((error) => Object.values(error)[0])
                    .join(", ");
            } else {
              //if api don't contains any error then simply show the text message (This API contains 409 code which shows the  "User with email or username already exists" and has empty error)
              loginMessage.textContent = data.message; //when error array is empty
            }
            loginMessage.style.color = 'red'
        }
    } catch (error) {
        console.error('Something went wrong', error)
        loginMessage.textContent = "Something went wrong. Please try again.";
        loginMessage.style.color = "red";
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Login";
    }
})


//block the view of screen
function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach((screen) => {
        screen.style.display = "none";
    });
    document.getElementById(screenId).style.display = "block";
}

//display the login screen when clicked at login link written in register
document.getElementById("go-to-login").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Login link clicked")
    showScreen("login-screen");
});

