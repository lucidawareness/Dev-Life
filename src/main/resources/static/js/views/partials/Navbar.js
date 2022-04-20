export default function Navbar(props) {
	//language=HTML
	return `
        <nav class="navbar navbar-dark navbar-expand-lg shadow mb-3 rounded1">
            <div class="container">
                <a class="navbar-brand" id="nav-title" href="/posts" data-link>Elixir Blog</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-item nav-link text-light" href="/" data-link>Home</a>
                        <a class="nav-item nav-link text-light" href="/posts" data-link>Posts</a>
                        <a class="nav-item nav-link text-light" href="/about" data-link>About</a>
                        <a class="nav-item nav-link text-light" href="/login" data-link>Login</a>
                        <a class="nav-item nav-link text-light" href="/register" data-link>Register</a>
                        <a class="nav-item nav-link text-light" href="/user" data-link>User</a>
                    </div>
                </div>
            </div>
        </nav>
	`;
}

// <nav>
//     <a href="/" data-link>Home</a>
//     <a href="/posts" data-link>Posts</a>
//     <a href="/about" data-link>About</a>
//     <a href="/login" data-link>Login</a>
//     <a href="/register" data-link>Register</a>
//     <a href="/user" data-link>User</a>
// </nav>