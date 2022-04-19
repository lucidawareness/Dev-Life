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
                        ${props.posts.map(post =>

                                `
			<div class="form-holder mb-3">
           		<h3 class="post-title-${post.id}" contenteditable="true">${post.title}</h3> 
           		<p class="post-content-${post.id}" contenteditable="true">${post.content}</p>
           		<p class="post-author">${post.user.username}</p>
           		<div class="post-categories-div">Tags:
           		<span class="post-tags-span-${post.id}" contenteditable="true">
					${post.categories.map(category =>
											` ${category.name}`
									)}
				</span>
				</div>
           		<p class="post-createdDate">${post.createdAt}</p>
           		<button class="edit-button p-1 my-2 btn btn-light" data-id="${post.id}">Save Changes</button>
           		<button class="delete-button p-1 my-2 btn btn-light" data-id="${post.id}">Delete Post</button>
			</div>
        `)
                                .join('')}
                    </div>
                    <div class="form-div col-md-4 new-post-form">
                        <h2 class="">Create a Post!</h2>
                        <form>
                            <label for="newPostTitle">Post Title</label><br>
                            <input class="form-control" type="text" id="newPostTitle" name="newPostTitle">
                            <label for="newPostContent">Content</label><br>
							<textarea class="form-control mb-2" type="text" id="newPostContent" name="newPostContent"></textarea>
							<label for="newPostCategories">Categories</label>
							<input type="text" class="form-control mb-2" id="newPostCategories" name="newPostCategories">
                            <input id="newPostButton" class="btn btn-dark" type="button" value="Submit">
                        </form>
                    </div>
                </div>
            </main>
        </div>
	`;
}

function createPostListener() {
	$("#newPostButton").click(function () {
		const title = $("#newPostTitle").val();
		const content = $("#newPostContent").val();
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
		const title = $(".post-title-" + id).text();
		const content = $(".post-content-" + id).text();
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
	createPostListener();
	deletePostListener();
	editPostListener();
}