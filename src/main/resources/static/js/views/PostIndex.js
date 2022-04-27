import createView from "../createView.js";
import {getHeaders, getUserRole} from "../auth.js";

export default function PostIndex(props) {
	//language=HTML
	return `
        <div class="container">
            <header class="row justify-content-center">
                <h1 class="posts-page-title">Posts</h1>
            </header>
            <main>
                <div class="row justify-content-between">
                    <div id="posts-container" class="col-md-7">
                        ${props.posts.reverse().map(post =>

                                `
			<div class="form-holder mb-3" data-id="${post.id}">
           		<h3 class="post-title-${post.id}">${post.title}</h3> 
           		<p class="post-content-${post.id}">${post.content}</p>
           		<div class="post-categories-div">Tags:
           		<span class="post-tags-span-{post.id}">
					${post.categories.map(category => `${category.name}`)}
				</span>
				</div>
           		<p class="post-createdDate">${new Date(post.createdAt).toLocaleTimeString()} ${new Date(post.createdAt).toLocaleDateString()}</p>
           		<p class="post-author-${post.id}">Author: ${post.author.username}</p>
			</div>
        `)
                                .join('')}
                    </div>
                    <div class="col-md-5 new-post-form">
                        <div class="form-holder create-a-post-sticky">
                            <div id="bottom">
                                <h2>Create a Post!</h2>
                                <form>
                                    <label for="newPostTitle">Post Title <span
                                            id="post-title-validation"></span></label><br>
                                    <input class="form-control" type="text" id="newPostTitle" name="newPostTitle">
                                    <p id="titleCounter">100 characters remaining</p>
                                    <label for="newPostContent" class="mt-2">Content <span
                                            id="post-content-validation"></span></label><br>
                                    <textarea class="form-control mb-2" id="newPostContent"
                                              name="newPostContent"></textarea>
                                    <p id="contentCounter">255 characters remaining</p>


                                    <label for="newPostCategories" class="mt-2">Categories <span
                                            id="post-categories-validation"></span></label>
                                    <input type="text" class="form-control mb-2" id="newPostCategories"
                                           name="newPostCategories">
									<p>Ex: "java, js, html"</p>


                                    <p id="character-warning-on-submit"></p>
                                    <input id="newPostButton" class="btn btn-dark" type="button" value="Submit">
                                </form>
                            </div>
                        </div>
                        <div class="form-holder create-a-post-sticky-login">
                            <button id="create-a-post-login-button" class="btn btn-light feedback">Login to post!
                            </button>
                        </div>
                    </div>
                </div>
                <div id="myButton">
                    <button id="create-post-button" type="button" class="btn btn-light feedback" data-toggle="modal"
                            data-target="#exampleModal">Create A Post!
                    </button>
                    <button id="create-post-login-button" type="button" class="btn btn-light feedback"
                            data-toggle="modal">
                        Log In To Post!
                    </button>
                </div>
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Create A Post!</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <label for="newPostTitleModal">Post Title <span
                                            id="post-title-validation-modal" style="color: red;"></span></label><br>
                                    <input class="form-control" type="text" id="newPostTitleModal"
                                           name="newPostTitleModal">
                                    <p id="titleCounterModal">100 characters remaining</p>
                                    <label for="newPostContentModal" class="mt-2">Content <span
                                            id="post-content-validation-modal" style="color: red;"></span></label><br>
                                    <textarea class="form-control mb-2" id="newPostContentModal"
                                              name="newPostContentModal"></textarea>
                                    <p id="contentCounterModal">255 characters remaining</p>


                                    <label for="newPostCategories" class="mt-2">Categories <span
                                            id="post-categories-validation"></span></label>
                                    <input type="text" class="form-control mb-2" id="newPostCategories"
                                           name="newPostCategories">
                                    <p>Tags separated by ", " ex: "java, js, html"</p>


                                    <p id="character-warning-on-submit-modal"></p>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button id="newPostButtonModal" class="btn btn-dark" type="button" value="Submit"
                                        data-dismiss="modal">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
	`;
}

function countChars() {
	//In page form char counter
	$("#newPostTitle").keyup(() => {
		let maxLength = 100;
		let strLength = document.getElementById("newPostTitle").value.length;
		let charRemain = (maxLength - strLength);
		let charOverCount = (strLength - maxLength);

		if (charRemain < 0) {
			document.getElementById("titleCounter").innerHTML = '<span style="color: red;">You have exceeded the limit of ' + maxLength + ' characters by ' + charOverCount + '</span>';
		} else {
			document.getElementById("titleCounter").innerHTML = charRemain + ' characters remaining';
		}
	})

	$("#newPostContent").keyup(() => {
		let maxLength = 255;
		let strLength = document.getElementById("newPostContent").value.length;
		let charRemain = (maxLength - strLength);
		let charOverCount = (strLength - maxLength)

		if (charRemain < 0) {
			document.getElementById("contentCounter").innerHTML = '<span style="color: red;">You have exceeded the limit of ' + maxLength + ' characters by ' + charOverCount + '</span>';
		} else {
			document.getElementById("contentCounter").innerHTML = charRemain + ' characters remaining';
		}
	})

	//Modal form char counter
	$("#newPostTitleModal").keyup(() => {
		let maxLength = 100;
		let strLength = document.getElementById("newPostTitleModal").value.length;
		let charRemain = (maxLength - strLength);
		let charOverCount = (strLength - maxLength);

		if (charRemain < 0) {
			document.getElementById("titleCounterModal").innerHTML = '<span style="color: red;">You have exceeded the limit of ' + maxLength + ' characters by ' + charOverCount + '</span>';
		} else {
			document.getElementById("titleCounterModal").innerHTML = charRemain + ' characters remaining';
		}
	})

	$("#newPostContentModal").keyup(() => {
		let maxLength = 255;
		let strLength = document.getElementById("newPostContentModal").value.length;
		let charRemain = (maxLength - strLength);
		let charOverCount = (strLength - maxLength)

		if (charRemain < 0) {
			document.getElementById("contentCounterModal").innerHTML = '<span style="color: red;">You have exceeded the limit of ' + maxLength + ' characters by ' + charOverCount + '</span>';
		} else {
			document.getElementById("contentCounterModal").innerHTML = charRemain + ' characters remaining';
		}
	})
}


function formValidation(title, content, formType) {
	let postTitle;
	let postContent;
	let maxCharWarn;

	if (formType === "modal") {
		postTitle = document.getElementById("post-title-validation-modal");
		postContent = document.getElementById("post-content-validation-modal");
		maxCharWarn = document.getElementById("character-warning-on-submit-modal");
	}
	if (formType === "inPage") {
		postTitle = document.getElementById("post-title-validation");
		postContent = document.getElementById("post-content-validation");
		maxCharWarn = document.getElementById("character-warning-on-submit");
	}

	if (title.trim() === "" || content.trim() === "") {
		postTitle.textContent = "Must not be empty"
		postContent.textContent = "Must not be empty";
		maxCharWarn.innerHTML = '<span style="color: red;">Cannot submit with empty field(s)</span>';
		return false
	} else {
		postTitle.textContent = "";
		postContent.textContent = "";
	}

	if (title.length > 100 || content.length > 255) {
		maxCharWarn.innerHTML = '<span style="color: red;">Cannot submit with exceeded character counts</span>'
		return false
	}
	return true
}

function createPostListener() {
	let formType;
	$("#newPostButtonModal").click(() => {
		console.log("Clicked");
		const title = $("#newPostTitleModal").val();
		const content = $("#newPostContentModal").val();
		formType = "modal"

		if (!formValidation(title, content, formType)) {
			return;
		}

		const newPost = {
			title,
			content
		}
		console.log("Ready to add");
		console.log(newPost);

		createPostFetch(newPost);

	})
	$("#newPostButton").click(function () {
		const title = $("#newPostTitle").val();
		const content = $("#newPostContent").val();
		formType = "inPage"

		if (!formValidation(title, content, formType)) {
			return;
		}


		const newPost = {
			title,
			content
		}
		console.log("Ready to add");
		console.log(newPost);

		createPostFetch(newPost);
	})
}

function createPostFetch(newPost) {
	let request = {
		method: "POST",
		headers: getHeaders(),
		body: JSON.stringify(newPost)
	}

	fetch("http://localhost:8080/api/posts", request)
		.then(res => {
			console.log(res.status)
			createView("/posts")
		})
		.catch(error => {
			console.log(error)
			createView("/posts")
		})
}

function hideCreatePostIfNotLoggedIn() {
	console.log(getUserRole())
	if (getUserRole() === false) {
		$(".create-a-post-sticky").css("display", "none");
		$("#create-post-button").css("display", "none");
		$("#create-post-login-button").css("display", "block");
		$(".create-a-post-sticky-login").css("display", "block");
	} else if (getUserRole() === "USER" || getUserRole() === "ADMIN") {
		$(".create-a-post-sticky").css("display", "block");
		$("#create-post-button").css("display", "block");
		$("#create-post-login-button").css("display", "none");
		$(".create-a-post-sticky-login").css("display", "none");
	}
}

function loginButtonRedirect() {
	$("#create-post-login-button").click(() => {
		createView("/login")
	})
	$(".create-a-post-sticky-login").click(() => {
		createView("/login")
	})
}

export function PostsEvent() {
	countChars();
	createPostListener();
	hideCreatePostIfNotLoggedIn();
	loginButtonRedirect();
}