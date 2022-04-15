export default function UserInfo(props) {
	const user = props;
	console.log(user)
	//language=HTML
	return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8"/>
            <title>User Info</title>
        </head>
        <body>
        <h1>Your Info</h1>

        <p id="usernameDisplay">Your username: </p>
        <form>
            <label for="oldUsername">Your Username</label>
            <input type="text" name="oldUsername" id="oldUsername">
            <label for="newUsername">New Username</label>
            <input type="text" name="newUsername" id="newUsername">
            <button id="change-username">Change your username</button>
        </form>
        <p id="emailDisplay">Your email: </p>
        <form>
            <label for="oldEmail">Old Email</label>
            <input type="text" name="oldEmail" id="oldEmail">
            <label for="newEmail">New Email</label>
            <input type="text" name="newEmail" id="newEmail">
            <button id="change-email">Change your email</button>
        </form>
        <p id="userCreatedDateDisplay">Account Created Date: </p>
        <form>
            <label for="oldPassword">Old Password</label>
            <input type="password" name="oldPassword" id="oldPassword">
            <label for="newPassword">New Password</label>
            <input type="password" name="newPassword" id="newPassword">
            <button id="change-password">Change your password</button>
        </form>
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

	fetch("http://localhost:8080/api/users/1", request)
		.then(resp => {
			return resp.json();
		})
		.then(data => {
			console.log(data);
			document.getElementById('usernameDisplay').innerHTML = "Hello: " + data.username;
			document.getElementById('emailDisplay').innerHTML = "Email " + data.email;
			document.getElementById('userCreatedDateDisplay').innerHTML = "Created: " + data.createdAt;
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

function changeEmail() {
	$("#change-email").click(function () {
		const oldEmail = $("#oldEmail").val();
		const newEmail = $("#newEmail").val();
		console.log(oldEmail);
		console.log(newEmail);
	})
}

function changeUsername() {
	$("#change-username").click(function () {
		const oldUsername = $("#oldUsername").val();
		const newUsername = $("#newUsername").val();
		console.log(oldUsername);
		console.log(newUsername);
	})
}