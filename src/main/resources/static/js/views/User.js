export default function UserInfo(props) {
	//language=HTML
	return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8"/>
            <title>User Info</title>
        </head>
        <body>

        <div class="container mb-4">
            <h1 class="user-page-title">Your Info</h1>
            <div class="row">
                <div class="col-md-4 mb-3 user-info-box">
                    <div class="user-info-inner-box">
                        <div>
                            <p id="form-holder-text" class="mt-3">Your Username: <u id="usernameDisplay"></u></p>
                        </div>
                        <div>
                            <p id="form-holder-text" class="mt-3">Your Email: <u id="emailDisplay"></u></p>
                        </div>
                        <div>
                            <p id="form-holder-text" class="mt-3">Account Created: <u id="userCreatedDateDisplay"></u>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-md-7 form-holder">
                    <form>
                        <h2>Change Username</h2>
                        <label for="oldUsername">Current Username</label>
                        <input class="form-control" type="text" name="oldUsername" id="oldUsername">
                        <label for="newUsername">New Username</label>
                        <input class="form-control" type="text" name="newUsername" id="newUsername">
                        <button class="btn btn-dark mt-2" id="change-username">Change your username</button>
                    </form>
                    <form>
                        <h2 class="mt-2">Change Email</h2>
                        <label for="oldEmail">Old Email</label>
                        <input class="form-control" type="text" name="oldEmail" id="oldEmail">
                        <label for="newEmail">New Email</label>
                        <input class="form-control" type="text" name="newEmail" id="newEmail">
                        <button class="btn btn-dark mt-2" id="change-email">Change your email</button>
                    </form>
                    <form>
                        <h2 class="mt-2">Change Password</h2>
                        <label for="oldPassword">Old Password</label>
                        <input class="form-control" type="password" name="oldPassword" id="oldPassword">
                        <label for="newPassword">New Password</label>
                        <input class="form-control" type="password" name="newPassword" id="newPassword">
                        <button class="btn btn-dark mt-2" id="change-password">Change your password</button>
                    </form>
                </div>
            </div>
        </div>
        <footer></footer>
        </body>
        </html>
	`
}

export function changeUserInfoEvent() {
	changeUsername();
	changePassword();
	changeEmail();
	getUser();
}


function getUser() {
	let request = {
		method: "GET",
		headers: {"Content-Type": "application/json"}
	}

	let user = [];

	fetch("http://localhost:8080/api/users/2", request)
		.then(resp => {
			return resp.json();
		})
		.then(data => {
			console.log(data);
			document.getElementById('usernameDisplay').innerHTML = data.username;
			document.getElementById('emailDisplay').innerHTML = data.email;
			document.getElementById('userCreatedDateDisplay').innerHTML = data.createdAt;
		})
		.catch(error => {
			console.log(error)
		})

	console.log(user);
}

function changePassword() {
	$("#change-password").click(function () {
		const oldPassword = $("#oldPassword").val();
		const newPassword = $("#newPassword").val();

		$.ajax("http://localhost:8080/api/users/1/updatePassword?oldPassword=" + oldPassword + "&newPassword=" + newPassword).done(function (data, status, jqXhr) {
			alert("Everything went great! Check out the server's response in the console.");
			console.log(data);
		}).fail(function (jqXhr, status, error) {
			alert("There was an error! Check the console for details");
			console.log("Response status: " + status);
			console.log("Error object: " + error);
		})
	})
}

//todo: call updateEmail
function changeEmail() {
	$("#change-email").click(function () {
		const oldEmail = $("#oldEmail").val();
		const newEmail = $("#newEmail").val();
		console.log(oldEmail);
		console.log(newEmail);
	})
}

//todo: call updateUsername
function changeUsername() {
	$("#change-username").click(function () {
		const oldUsername = $("#oldUsername").val();
		const newUsername = $("#newUsername").val();
		console.log(oldUsername);
		console.log(newUsername);
	})
}