export default function Navbar(props) {
    return `
        <nav class="navbar navbar-expand-lg navbar-light bg-light shadow p-3 mb-5 bg-white rounded">
            <a class="navbar-brand" href="#">Elixir Blog</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-item nav-link" href="/home" data-link>Home</a>
                    <a class="nav-item nav-link" href="/posts" data-link>Posts</a>
                    <a class="nav-item nav-link" href="/about" data-link>About</a>
                    <a class="nav-item nav-link" href="/login" data-link>Login</a>
                    <a class="nav-item nav-link" href="/register" data-link>Register</a>
                    <a class="nav-item nav-link" href="/user" data-link>User</a>
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