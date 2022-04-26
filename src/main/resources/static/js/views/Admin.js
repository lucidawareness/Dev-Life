import createView from "../createView.js";

export default function Admin(props) {
	console.log(props)
	if (checkIfAuthorized(props)) {
		//language=HTML
		return `
            <div class="container mb-4">
				<div class="row">
					<div class="col">
						${populatePosts(props)}
					</div>
					<div class="col">
						${populateUsers(props)}
					</div>
				</div>
                
            </div>
		`
	} else {
		return `<h1>Access Denied!</h1>`
	}
}

export function adminEvents() {
}

function checkIfAuthorized(props) {
	return props.admin.status !== 500;
}

function populatePosts(props) {
	//language=HTML
	return`
        <h1>Posts</h1>
        ${props.admin.map(user =>
                `
			<div class="user-div-${user.id} form-holder mb-3">
           		<h3 class="user-title-${user.id}">${user.username}</h3>
           		<p>Email: ${user.email}</p>
           		<p>Role: ${user.role}</p>
           		<p>Created At: ${new Date(user.createdAt).toLocaleTimeString()} ${new Date(user.createdAt).toLocaleDateString()}</p>
           	
           		<button class="user-delete-button p-1 my-2 btn btn-light" data-id="${user.id}">Delete User</button>
			</div>
			`
        ).join('')}
	`
}

function populateUsers(props) {
	//language=HTML
	return `
        <h1>Users</h1>
        ${props.admin.map(user =>
                `
			<div class="user-div-${user.id} form-holder mb-3">
           		<h3 class="user-title-${user.id}">${user.username}</h3>
           		<p>Email: ${user.email}</p>
           		<p>Role: ${user.role}</p>
           		<p>Created At: ${new Date(user.createdAt).toLocaleTimeString()} ${new Date(user.createdAt).toLocaleDateString()}</p>
           	
           		<button class="user-delete-button p-1 my-2 btn btn-light" data-id="${user.id}">Delete User</button>
			</div>
			`
        ).join('')}
	`

}