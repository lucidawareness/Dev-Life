import createView from "../createView.js";

export default function PostIndex(props) {
	//language=HTML
	return `
        <div id="form-holder">
            <header>
                <h1>Posts Page</h1>
            </header>
            <main>
                <div id="posts-container">
                    ${props.posts.map(post =>

                            `
           <h3 class="post-title-${post.id}" contenteditable="true">${post.title}</h3> 
           <p class="post-content-${post.id}" contenteditable="true">${post.content}</p>
           <button class="edit-button" data-id="${post.id}">Save Changes</button>
           <button class="delete-button" data-id="${post.id}">Delete Post</button>
        `)
                            .join('')}
                </div>
                <div class="form-div">
                    <form>
                        <label for="newPostTitle">Post Title:</label><br>
                        <input type="text" id="newPostTitle" name="newPostTitle"><br>
                        <label for="newPostContent">Content:</label><br>
                        <input type="text" id="newPostContent" name="newPostContent">
                        <input id="newPostButton" type="button" value="Submit">
                    </form>
                </div>
            </main>
        </div>
	`;
}

function createPostListener() {
	console.log("adding post listener")
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
	console.log("adding delete listener")
	$(".delete-button").click(function () {
		const id = $(this).attr('data-id')
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
	console.log("adding edit listener")
	$(".edit-button").click(function () {
		const id = $(this).attr('data-id')
		console.log(id);
		console.log("Ready to edit");
		const title = $(".post-title-" + id).text();
		const content = $(".post-content-" + id).text();

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