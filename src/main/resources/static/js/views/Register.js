import CreateView from "../createView.js"

export default function Register(props) {
	//language=HTML
	return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Register</title>
        </head>
        <body>

        <div class="container">
            <div class="row justify-content-center">
                <div class="col col-md-6">
                    <div class="form-holder my-5">
                        <h1 id="register-page-title">Register</h1>
                        <form>
                            <div>
                                <label for="username">Username</label>
                                <input class="form-control" id="username" name="username" type="text" required/>
                                <p id="usernameEmptyMessage">Username cannot be empty</p>
                            </div>
                            <div>
                                <label for="email" class="email-label">Email</label>
                                <input class="form-control" id="email" name="email" type="email" required>
                                <p id="emailEmptyMessage">Email cannot be empty</p>
                                <p id="emailInvalidFormatMessage">Please input correct email format</p>
                            </div>
                            <div>
                                <label for="password">Password</label>
                                <input class="form-control" id="password" name="password" type="password"
                                       pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                       title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                       required/>
                                <p id="passwordEmptyMessage">Password cannot be empty</p>
                                <div id="message">
                                    <p>Password must contain the following:</p>
                                    <p id="letter" class="invalid">A <b>lowercase</b> letter</p>
                                    <p id="capital" class="invalid">A <b>capital (uppercase)</b> letter</p>
                                    <p id="number" class="invalid">A <b>number</b></p>
                                    <p id="length" class="invalid">Minimum <b>8 characters</b></p>
                                </div>
                            </div>
                            <div>
                                <a href="/login" data-link>Already have an account?</a>
                            </div>
                            <div>
                                <p id="emailOrUsernameExists">Username or Email already exists</p>
                                <button id="register-btn" class="btn btn-light mt-3" type="button" disabled>Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </body>
        </html>
	`;
}

export function RegisterEvent() {
	registerButtonListener();
	passwordValidation();
	inputListeners()
}

function inputListeners() {
	let username = document.querySelector("#username");
	let email = document.querySelector("#email");

	let usernameEmptyMessage = document.getElementById("usernameEmptyMessage");
	let emailEmptyMessage = document.getElementById("emailEmptyMessage");
	let emailInvalidFormatMessage = document.getElementById("emailInvalidFormatMessage");
	let button = document.getElementById("register-btn");

	username.onkeyup = function (){
		if (username.value === "") {
			usernameEmptyMessage.style.display = "block";
			usernameEmptyMessage.style.color = "red";
			button.disabled = true;
		} else {
			usernameEmptyMessage.style.display = "none";
		}
	}

	email.onkeyup = function (){
		if (email.value === "") {
			emailEmptyMessage.style.display = "block";
			emailEmptyMessage.style.color = "red";
			button.disabled = true;
		} else {
			emailEmptyMessage.style.display = "none";
		}

		if (!email.value.includes("@", ".com")) {
			emailInvalidFormatMessage.style.display = "block";
			emailInvalidFormatMessage.style.color = "red";
			button.disabled = true;
		} else {
			emailInvalidFormatMessage.style.display = "none";
		}
	}
}

function registerButtonListener() {
	$("#register-btn").click(function () {
		let username = $("#username").val();
		let email = $("#email").val();
		let password = $("#password").val();
		let usernameEmptyMessage = document.getElementById("usernameEmptyMessage");
		let emailEmptyMessage = document.getElementById("emailEmptyMessage");

		if (username === "" || email === "") {
			usernameEmptyMessage.style.display = "block";
			usernameEmptyMessage.style.color = "red";
			emailEmptyMessage.style.display = "block";
			emailEmptyMessage.style.color = "red";
			return;
		}

		const newUser = {
			username: username,
			email: email,
			password: password
		}

		let request = {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(newUser)
		}

		fetch("http://localhost:8080/api/users/create", request)
			.then(response => {
				console.log(response)
				console.log(response.status);
				if (response.status === 500) {
					document.getElementById("emailOrUsernameExists").style.display = "block";
					document.getElementById("emailOrUsernameExists").style.color = "red";
					return;
				}
				CreateView("/login");
			})

	})
}

function passwordValidation() {

	let password = document.querySelector("#password");
	let letter = document.getElementById("letter");
	let capital = document.getElementById("capital");
	let number = document.getElementById("number");
	let length = document.getElementById("length");
	let button = document.getElementById("register-btn");

// When the user clicks on the password field, show the message box
	password.onfocus = function () {
		document.getElementById("message").style.display = "block";
	}

// When the user clicks outside of the password field, hide the message box
	password.onblur = function () {
		document.getElementById("message").style.display = "none";
	}

// When the user starts to type something inside the password field
	password.onkeyup = function () {
		// Validate lowercase letters
		let lowerCaseLetters = /[a-z]/g;
		if (password.value.match(lowerCaseLetters)) {
			letter.classList.remove("invalid");
			letter.classList.add("valid");
			button.disabled = false;
		} else {
			letter.classList.remove("valid");
			letter.classList.add("invalid");
			button.disabled = true;
		}

		// Validate capital letters
		let upperCaseLetters = /[A-Z]/g;
		if (password.value.match(upperCaseLetters)) {
			capital.classList.remove("invalid");
			capital.classList.add("valid");
			button.disabled = false;
		} else {
			capital.classList.remove("valid");
			capital.classList.add("invalid");
			button.disabled = true;
		}

		// Validate numbers
		let numbers = /[0-9]/g;
		if (password.value.match(numbers)) {
			number.classList.remove("invalid");
			number.classList.add("valid");
			button.disabled = false;
		} else {
			number.classList.remove("valid");
			number.classList.add("invalid");
			button.disabled = true;
		}

		// Validate length
		if (password.value.length >= 8) {
			length.classList.remove("invalid");
			length.classList.add("valid");
			button.disabled = false;
		} else {
			length.classList.remove("valid");
			length.classList.add("invalid");
			button.disabled = true;
		}
	}
}