export default function UserInfo(props) {
	//language=HTML
	return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8"/>
            <title>User Info</title>
        </head>
        <body id="user-page-body">

        <div id="form-holder">
            <h1 id="user-page-title">Your Info</h1>
            <p class="mt-3">Your username: <u id="usernameDisplay"></u></p>
            <form>
                <label for="oldUsername">Current Username</label>
                <input type="text" name="oldUsername" id="oldUsername">
                <label for="newUsername">New Username</label>
                <input type="text" name="newUsername" id="newUsername">
                <button id="change-username">Change your username</button>
            </form>
            <p class="mt-3">Your email: <u id="emailDisplay"></u></p>
            <form>
                <label for="oldEmail">Old Email</label>
                <input type="text" name="oldEmail" id="oldEmail">
                <label for="newEmail">New Email</label>
                <input type="text" name="newEmail" id="newEmail">
                <button id="change-email">Change your email</button>
            </form>
            <p class="mt-3">Account Created Date: <u id="userCreatedDateDisplay"></u></p>
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