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
	let loadingHMTL = $(".right-col-pages").html(`<h1>Loading...</h1>`)
	$(".li-dashboard").click(() => {
		console.log("dash click");
		loadingHMTL();
		createView("/admin");
	})
	$(".li-posts").click(() => {
		console.log("posts clicked");
		loadingHMTL();
		createFetch("posts");
	})
	$(".li-categories").click(() => {
		console.log("cats clicked");
		loadingHMTL();
		createFetch("cats");
	})
	$(".li-users").click(() => {
		console.log("users clicked");
		loadingHMTL();
		createFetch("users");
	})
}

// function populateRightCol(page) {
// 	if (page === "dash"){
// 		return populateDash()
// 	} else if (page === "posts") {
// 		return populatePosts()
// 	} else if (page === "cats") {
// 		return populateCats()
// 	} else if (page === "users") {
// 		return populateUsers()
// 	} else {
// 		createView("/admin")
// 	}
// }


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
				deletePostListener();
			} else if (page === "cats") {
				populateCategories(data)
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
           		<span class="post-tags-span-{post.id}">
					${post.categories.map(category => `${category.name}`)}
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

//Post page delete
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
				$(".right-col-pages").html(`<h1>Loading...</h1>`)
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
		<h1>Categories</h1>
	`)
}

function populateUsers(data) {
	console.log(data)
	$(".right-col-pages").html(`
		<h1>Users</h1>
	`)


}