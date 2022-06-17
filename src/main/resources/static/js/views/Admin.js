import createView from "../createView.js";
import {getHeaders} from "../auth.js";

export default function Admin(props) {
	console.log(props)
	if (checkIfAuthorized(props)) {
		//language=HTML
		return `
            <div class="container-fluid mb-4">
                <div class="row">
                    <nav class="col-md-2 mr-2 d-none d-md-block sidebar">
                        <div class="sidebar-sticky">
                            <h1>Admin</h1>
                            <ul class="nav flex-column">
                                <li class="nav-item"><a class="admin-links li-dashboard" href="">Dashboard</a></li>
                                <li class="nav-item"><a class="admin-links li-posts" href="">Posts</a></li>
                                <li class="nav-item"><a class="admin-links li-categories" href="">Categories</a></li>
                                <li class="nav-item"><a class="admin-links li-users" href="">Users</a></li>
                            </ul>
                        </div>
                    </nav>
                    <div class="col">
                        <nav class="d-block d-md-none admin-hor-nav">
                            <ul class="nav flex-column hor-ul">
                                <li class="hor-li nav-item"><a class="admin-links li-dashboard hor-links" href="">Dashboard</a>
                                </li>
                                <li class="hor-li nav-item"><a class="admin-links li-posts hor-links" href="">Posts</a>
                                </li>
                                <li class="hor-li nav-item"><a class="admin-links li-categories hor-links" href="">Categories</a>
                                </li>
                                <li class="hor-li nav-item"><a class="admin-links li-users hor-links" href="">Users</a>
                                </li>
                            </ul>
                        </nav>
                        <div class="container right-col-pages">
                            <h1>Dashboard</h1>
                            <div class="form-holder mb-3">
                                <h3>Post Stats</h3>
                                <p>Number of posts in blog: ${props.posts.length}</p>
                            </div>
                            <div class="form-holder mb-3">
                                <h3>Category Stats</h3>
                                <p>Number of categories in blog: ${props.categories.length}</p>
                            </div>
                            <div class="form-holder mb-3">
                                <h3>User Stats</h3>
                                <p>Number of users in blog: ${props.users.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
		`
	} else {
		return `<h1>Access Denied!</h1>`
	}
}

export function adminEvents() {
	navLinkListeners();
}

function checkIfAuthorized(props) {
	if (props.categories.status === 500) {
		return false
	} else if (props.users.status === 500) {
		return false
	} else return props.posts.status !== 500;
}

function navLinkListeners() {
	$(".li-dashboard").click(() => {
		console.log("dash click");
		$(".right-col-pages").html(`<h1>Loading...</h1>`)
		createView("/admin");
	})
	$(".li-posts").click(() => {
		console.log("posts clicked");
		$(".right-col-pages").html(`<h1>Loading...</h1>`)
		createFetch("posts");
	})
	$(".li-categories").click(() => {
		console.log("cats clicked");
		$(".right-col-pages").html(`<h1>Loading...</h1>`)
		createFetch("cats");
	})
	$(".li-users").click(() => {
		console.log("users clicked");
		$(".right-col-pages").html(`<h1>Loading...</h1>`)
		createFetch("users");
	})
}

//Dynamic fetch takes in page title and routes to proper method call.
function createFetch(page) {
	let url;

	if (page === "posts") {
		url = "http://localhost:8080/api/posts"
	} else if (page === "cats") {
		url = "http://localhost:8080/api/categories"
	} else if (page === "users") {
		url = "http://localhost:8080/api/users"
	}


	let request = {
		method: "GET",
		headers: getHeaders()
	}

	fetch(url, request)
		.then(res => res.json())
		.then(data => {
			if (page === "posts") {
				populatePosts(data)
				postListeners();
			} else if (page === "cats") {
				populateCategories(data)
				categoryListeners();
			} else if (page === "users") {
				populateUsers(data)
			}
		})
		.catch(error => {
			console.log(error)
		})
}

function populatePosts(data) {
	console.log(data)
	//language=HTML
	$(".right-col-pages").html(`
        <h1>Posts (${data.length})</h1>
        <div id="posts-container" class="col">
            ${data.reverse().map(post =>

                    `
			<div class="form-holder mb-3" data-id="${post.id}">
           		<h3 class="post-title-${post.id}" contenteditable="true">${post.title}</h3> 
           		<p class="post-content-${post.id}" contenteditable="true">${post.content}</p>
           		<div class="post-categories-div">Tags:
           		<span contenteditable="true" class="post-tags-span-${post.id}">
					${post.categories.map(category => `${category.name}`).join(', ')}
				</span>
				</div>
           		<p class="post-createdDate">${new Date(post.createdAt).toLocaleTimeString()} ${new Date(post.createdAt).toLocaleDateString()}</p>
           		<p class="post-author-${post.id}">Author: ${post.author.username}</p>
           		<button class="edit-button p-1 my-2 btn btn-light" data-id="${post.id}">Save Changes</button>
           		<button class="delete-button p-1 my-2 btn btn-light" data-id="${post.id}">Delete Post</button>
			</div>
        `)
                    .join('')}
        </div>
	`)
}

//Post page delete and edit listeners
function postListeners() {
	$(".delete-button").click(function () {
		const id = $(this).data("id")
		console.log(id);
		console.log("Ready to delete post");

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
				$(".right-col-pages").html(`<h1>Loading...</h1>`)
				createFetch("posts")
			})
			.catch(error => {
				console.log(error)
				createFetch("posts")
			})
	})

	$(".edit-button").click(function () {
		const id = $(this).data("id");
		console.log(id);
		console.log("Ready to edit");
		const title = $(".post-title-" + id).text().trim();
		const content = $(".post-content-" + id).text().trim();
		const tagsString = $(".post-tags-span-" + id).text().trim().toLowerCase();

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

		fetch((`http://localhost:8080/api/posts/${id}?categories=${categoryNames}`), request)
			.then(res => {
				console.log(res.status)
				createFetch("posts")
			})
			.catch(error => {
				console.log(error)
				createFetch("posts")
			})
	})
}

function populateCategories(data) {
	console.log(data)
	//language=HTML
	$(".right-col-pages").html(`
        <h1>Categories (${data.length})</h1>
        <div id="posts-container" class="col">
            ${data.reverse().map(category =>
                    `
			<div class="form-holder mb-3" data-id="${category.id}">
           		<h3 class="post-title-${category.id}">${category.name}</h3> 
           		<p class="post-content-${category.id}">Post this category is used in: ${data.length}</p>
           		<div class="post-categories-div">Posts: ${category.posts.length}
				</div>
           		<button class="delete-button p-1 my-2 btn btn-light" data-id="${category.id}">Delete Category</button>
			</div>
        `)
                    .join('')}
        </div>
	`)
}

function categoryListeners() {
	$(".delete-button").click(function () {
		const id = $(this).data("id")
		console.log(id);
		console.log("Ready to delete category");

		const categoryId = {
			id: id
		}

		let request = {
			method: "DELETE",
			headers: getHeaders(),
			body: JSON.stringify(categoryId)
		}

		fetch(("http://localhost:8080/api/categories/" + id), request)
			.then(res => {
				console.log(res.status)
				$(".right-col-pages").html(`<h1>Loading...</h1>`)
				createFetch("cats")
			})
			.catch(error => {
				console.log(error)
				createFetch("cats")
			})
	})
}

function populateUsers(data) {
	console.log(data)
	$(".right-col-pages").html(`
		<h1>Users (${data.length})</h1>
        <div id="posts-container" class="col">
            ${data.reverse().map(user =>
		`
			<div class="form-holder mb-3" data-id="${user.id}">
           		<h3 class="user-username-${user.id}">${user.username}</h3> 
           		<p class="user-id-${user.id}">User Id: ${user.id} | Email: ${user.email} | Role: ${user.role} | Posts: ${user.posts.length} | Created: ${user.createdAt}</p>
           		<div class="post-categories-div">Posts: ${user.posts.length}
				</div>
           		<button class="delete-button p-1 my-2 btn btn-light" data-id="${user.id}">Deactivate User</button>
			</div>
        `)
		.join('')}
        </div>
	`)


}