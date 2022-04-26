import {isLoggedIn} from "../../auth.js";

export default function Navbar(props) {

	const loggedIn = isLoggedIn();
	//language=HTML
	let html = `
        <nav class="navbar navbar-dark navbar-expand-lg shadow mb-3 rounded1">
            <div class="container">
                <a class="navbar-brand" id="nav-title" href="/" data-link>Elixir Blog</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-item nav-link text-light" href="/" data-link>Home</a>`;
	if (loggedIn) {
		html += `<a class="nav-item nav-link text-light" href="/posts" data-link>Posts</a>`;
	}
	html += `<a class="nav-item nav-link text-light" href="/about" data-link>About</a>`;
	if (!loggedIn) {
		html += `<a class="nav-item nav-link text-light" href="/login" data-link>Login</a>
                        				<a class="nav-item nav-link text-light" href="/register" data-link>Register</a>`
	}
	if (loggedIn) {
		html += `<a class="nav-item nav-link text-light" href="/user" data-link>User</a><a class="nav-item nav-link text-light" href="/logout" data-link>Logout</a>`

	}
	html += `
                    </div>
                </div>
            </div>
        </nav>
	`;

	return html;
}