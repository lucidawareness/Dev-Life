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
                                <input class="form-control" id="username" name="username" type="text"/><br>
                            </div>
                            <div>
                                <label for="email" class="email-label">Email</label>
                                <input class="form-control" id="email" name="email" type="email"><br>
                            </div>
                            <div>
                                <label for="password">Password</label>
                                <input class="form-control" id="password" name="password" type="password"/>
                            </div>
                            <div>
                                <a href="/login" data-link>Already have an account?</a>
                            </div>
                            <div>
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
				console.log(response.status);
				CreateView("/login");
			})

	})
}