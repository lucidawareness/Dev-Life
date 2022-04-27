import createView from "../createView.js";
import {getHeaders} from "../auth.js";

export default function UserInfo(props) {
	//language=HTML
	return `
        <!DOCTYPE html>
        <html lang="EN">
        <head>
            <meta charset="UTF-8"/>
            <title>User Info</title>
        </head>
        <body>

        <div class="container mb-4">
            <h1 class="user-page-title mb-4">Hello <span class="text-small">${props.user.username}</span></h1>
            <div class="row">
                <div class="col-md-7 mb-3 user-info-box">
                    <h1>Your Posts (${(props.user.posts).length})</h1>
                    ${props.user.posts.reverse().map(post =>

                            `
			<div class="form-holder mb-3">
           		<h3 class="post-title-${post.id}" contenteditable="true">${post.title}</h3> 
           		<p class="post-content post-content-${post.id}" contenteditable="true">${post.content}</p>
           		<div class="post-categories-div">Tags:
           		<span class="post-tags-span-${post.id}" contenteditable="true">
					${post.categories.map(category => ` ${category.name}`)}
				</span>
				</div>
           		<p class="post-createdDate">${new Date(post.createdAt).toLocaleTimeString()} ${new Date(post.createdAt).toLocaleDateString()}</p>
           		<p class="post-author">Author: ${props.user.username}</p>
           		<button class="edit-button p-1 my-2 btn btn-light" data-id="${post.id}">Save Changes</button>
           		<button class="delete-button p-1 my-2 btn btn-light" data-id="${post.id}">Delete Post</button>
			</div>
        `)
                            .join('')}
                </div>
                <div class="col-md-5">
                    <div class="right-col-user-page">
                        <h1>Your Account</h1>
                        <div class="user-info-inner-box mb-3">
                            <div>
                                <p id="form-holder-text" class="mt-3">Your Username: <u
                                        id="usernameDisplay">${props.user.username}</u></p>
                            </div>
                            <div>
                                <p id="form-holder-text" class="mt-3">Your Email: <u
                                        id="emailDisplay">${props.user.email}</u></p>
                            </div>
                            <div>
                                <p id="form-holder-text" class="mt-3 mb-0">Account Created</p>
                                <u id="userCreatedDateDisplay">${new Date(props.user.createdAt).toLocaleTimeString()}
                                    ${new Date(props.user.createdAt).toLocaleDateString()}</u>
                            </div>
                        </div>

                        <!--                    <form>-->
                        <!--                        <h2>Change Username</h2>-->
                        <!--                        <label for="oldUsername">Current Username</label>-->
                        <!--                        <input class="form-control" type="text" name="oldUsername" id="oldUsername">-->
                        <!--                        <label for="newUsername">New Username</label>-->
                        <!--                        <input class="form-control" type="text" name="newUsername" id="newUsername">-->
                        <!--                        <button class="btn btn-dark mt-2" id="change-username">Change your username</button>-->
                        <!--                    </form>-->
                        <!--                    <form>-->
                        <!--                        <h2 class="mt-2">Change Email</h2>-->
                        <!--                        <label for="oldEmail">Old Email</label>-->
                        <!--                        <input class="form-control" type="text" name="oldEmail" id="oldEmail">-->
                        <!--                        <label for="newEmail">New Email</label>-->
                        <!--                        <input class="form-control" type="text" name="newEmail" id="newEmail">-->
                        <!--                        <button class="btn btn-dark mt-2" id="change-email">Change your email</button>-->
                        <!--                    </form>-->

                        <form class="form-holder">
                            <h2 class="mt-2">Change Password</h2>
                            <label for="oldPassword">Old Password</label>
                            <input class="form-control" type="password" name="oldPassword" id="oldPassword">
                            <label for="newPassword">New Password</label>
                            <input class="form-control" type="password" name="newPassword" id="newPassword">
                            <p id="password-submit-success" style="color: green"></p>
                            <button class="btn btn-dark mt-2" id="change-password">Change your password</button>
                        </form>
                    </div>
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
	deletePostListener();
	editPostListener();
}

function deletePostListener() {
	$(".delete-button").click(function () {
		const id = $(this).data("id")
		console.log(id);
		console.log("Ready to delete");

		const postId = {
			id: id
		}

		let request = {
			method: "DELETE",
			headers: getHeaders(),
			body: JSON.stringify(postId)
		}

		fetch(("http://localhost:8080/api/posts/" + id), request)
			.then(res => {
				console.log(res.status)
				createView("/user")
			})
			.catch(error => {
				console.log(error)
				createView("/user")
			})
	})
}

function editPostListener() {
	$(".edit-button").click(function () {
		const id = $(this).data("id")
		console.log(id);
		console.log("Ready to edit");
		const title = $(".post-title-" + id).text().trim();
		const content = $(".post-content-" + id).text().trim();
		const tagsString = $(".post-tags-span-" + id).text().trim();

		const categoryNames = tagsString.split(", ");


		const editedPost = {
			id,
			title,
			content
		}
		console.log(editedPost)

		let request = {
			method: "PUT",
			headers: getHeaders(),
			body: JSON.stringify(editedPost)
		}

		fetch(("http://localhost:8080/api/posts/" + id), request)
			.then(res => {
				console.log(res.status)
				createView("/user")
			})
			.catch(error => {
				console.log(error)
				createView("/user")
			})
	})
}

function changePassword() {
	$("#change-password").click(function () {
		const oldPassword = $("#oldPassword").val();
		const newPassword = $("#newPassword").val();

		const url = "http://localhost:8080/api/users/updatePassword?oldPassword=" + oldPassword + "&newPassword=" + newPassword;
		const options = {
			method: 'GET',
			headers: getHeaders()
		};
		fetch(url, options)
			.then(response => {
					console.log(response);
					createView("/user")

				}
			) /* review was created successfully */
			.catch(error => console.error(error)); /* handle errors */


		// $.ajax("http://localhost:8080/api/users/2/updatePassword?oldPassword=" + oldPassword + "&newPassword=" + newPassword).done(function (data, status, jqXhr) {
		// 	alert("Everything went great! Check out the server's response in the console.");
		// 	console.log(data);
		// }).fail(function (jqXhr, status, error) {
		// 	alert("There was an error! Check the console for details");
		// 	console.log("Response status: " + status);
		// 	console.log("Error object: " + error);
		// })
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