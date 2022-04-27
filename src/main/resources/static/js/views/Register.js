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
                                <input class="form-control" id="username" name="username" type="text"/>
								<p id="usernameEmptyMessage">Username cannot be empty</p>
                            </div>
                            <div>
                                <label for="email" class="email-label">Email</label>
                                <input class="form-control" id="email" name="email" type="email">
								<p id="emailEmptyMessage">Email cannot be empty</p>
								<p id="emailInvalidFormatMessage">Please input correct email format</p>
                            </div>
                            <div>
                                <label for="password">Password</label>
                                <input class="form-control" id="password" name="password" type="password"/>
								<p id="passwordEmptyMessage">Password cannot be empty</p>
                            </div>
                            <div>
                                <a href="/login" data-link>Already have an account?</a>
                            </div>
                            <div>
								<p id="emailOrUsernameExists">Username or Email already exists</p>
                                <button id="register-btn" class="btn btn-light mt-3" type="button">Register</button>
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
	$("#register-btn").click(function () {

		let username = document.querySelector("#username").value;
		let email = document.querySelector("#email").value;
		let password = document.querySelector("#password").value;

		let usernameEmptyMessage = document.getElementById("usernameEmptyMessage")
		let emailEmptyMessage = document.getElementById("emailEmptyMessage")
		let emailInvalidFormatMessage = document.getElementById("emailInvalidFormatMessage")
		let passwordEmptyMessage = document.getElementById("passwordEmptyMessage")

		if (username === "") {
			usernameEmptyMessage.style.display = "block";
			usernameEmptyMessage.style.color = "red";
			return;
		}

		if (email === "") {
			emailEmptyMessage.style.display = "block";
			emailEmptyMessage.style.color = "red";
			return;
		}

		if (password === "") {
			passwordEmptyMessage.style.display = "block";
			passwordEmptyMessage.style.color = "red";
			return;
		}

		if (!email.includes("@", ".com")) {
			emailInvalidFormatMessage.style.display = "block";
			emailInvalidFormatMessage.style.color = "red";
			return;
		}

		let newUser = {
			username: $("#username").val(),
			email: $("#email").val(),
			password: $("#password").val()
		}

		console.log(newUser);

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