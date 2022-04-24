import createView from "../createView.js";

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
			<div class="form-holder mb-3">
           		<h3 class="post-title-${post.id}" contenteditable="true">${post.title}</h3> 
           		<p class="post-content-${post.id}" contenteditable="true">${post.content}</p>
           		<p class="post-author">Author: ${post.author.username}</p>
           		<div class="post-categories-div">Tags:
           		<span class="post-tags-span-{post.id}">
					${post.categories.map(category => `${category.name}`)}
				</span>
				</div>
           		<p class="post-createdDate">${new Date(post.createdAt).toLocaleTimeString()} ${new Date(post.createdAt).toLocaleDateString()}</p>
           		<button class="edit-button p-1 my-2 btn btn-light" data-id="${post.id}">Save Changes</button>
           		<button class="delete-button p-1 my-2 btn btn-light" data-id="${post.id}">Delete Post</button>
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
                                    <label for="newPostContent">Content <span
                                            id="post-content-validation"></span></label><br>
                                    <textarea class="form-control mb-2" id="newPostContent"
                                              name="newPostContent"></textarea>
                                    <p id="contentCounter">255 characters remaining</p>
                                    <!--                                    <label for="newPostCategories">Categories <span-->
                                    <!--                                            id="post-categories-validation"></span></label>-->
                                    <!--                                    <input type="text" class="form-control mb-2" id="newPostCategories"-->
                                    <!--                                           name="newPostCategories">-->
                                    <p id="character-warning-on-submit"></p>
                                    <input id="newPostButton" class="btn btn-dark" type="button" value="Submit">
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="myButton">
                    <button id="create-post-button" type="button" class="btn btn-light feedback" data-toggle="modal"
                            data-target="#exampleModal">Create A Post!
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
                                            id="post-title-validation-modal"></span></label><br>
                                    <input class="form-control" type="text" id="newPostTitleModal"
                                           name="newPostTitleModal">
                                    <p id="titleCounterModal">100 characters remaining</p>
                                    <label for="newPostContentModal">Content <span
                                            id="post-content-validation-modal"></span></label><br>
                                    <textarea class="form-control mb-2" id="newPostContentModal"
                                              name="newPostContentModal"></textarea>
                                    <p id="contentCounterModal">255 characters remaining</p>
                                    <!--                                    <label for="newPostCategories">Categories <span-->
                                    <!--                                            id="post-categories-validation"></span></label>-->
                                    <!--                                    <input type="text" class="form-control mb-2" id="newPostCategories"-->
                                    <!--                                           name="newPostCategories">-->
                                    <p id="character-warning-on-submit-modal"></p>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button id="newPostButtonModal" class="btn btn-dark" type="button" value="Submit">
                                    Submit
                                </button>
                                <!--								<button type="button" class="btn btn-primary">Save changes</button>-->
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
	`;
}

function countChars() {
	$("#newPostButtonModal").click(()=> {
		console.log("Clicked");
	})
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
}


function formValidation(title, content) {
	const postTitle = document.getElementById("post-title-validation");
	const postContent = document.getElementById("post-content-validation");
	const maxCharWarn = document.getElementById("character-warning-on-submit")

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
	$("#newPostButton").click(function () {
		const title = $("#newPostTitle").val();
		const content = $("#newPostContent").val();

		if (!formValidation(title, content)) {
			return;
		}

		const newPost = {
			title,
			content
		}
		console.log("Ready to add");
		console.log(newPost);

		let request = {
			method: "POST",
			headers: {"Content-Type": "application/json"},
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
	})
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
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(postId)
		}

		fetch(("http://localhost:8080/api/posts/" + id), request)
			.then(res => {
				console.log(res.status)
				createView("/posts")
			})
			.catch(error => {
				console.log(error)
				createView("/posts")
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
			title,
			content
		}
		console.log(editedPost)

		let request = {
			method: "PUT",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(editedPost)
		}

		fetch(("http://localhost:8080/api/posts/" + id), request)
			.then(res => {
				console.log(res.status)
				createView("/posts")
			})
			.catch(error => {
				console.log(error)
				createView("/posts")
			})
	})
}

export function PostsEvent() {
	countChars();
	createPostListener();
	deletePostListener();
	editPostListener();
}