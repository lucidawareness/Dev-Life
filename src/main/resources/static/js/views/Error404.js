export default function Error404(props) {
	//language=HTML
	return `
        <div class="container">
            <div class="row form-holder text-center">
				<div class="col-12">
					<h1>404 ERROR</h1>
				</div>
			</div>
			<div class="row form-holder text-center">
				<div class="col">
                    <div class="" id="">
                        <a class="rounded px-3 m-1 bg-light err-404-links" href="/" data-link>Home</a>
                        <a class="rounded px-3 m-1 bg-light err-404-links" href="/posts" data-link>Posts</a>
                        <a class="rounded px-3 m-1 bg-light err-404-links" href="/about" data-link>About</a>
                        <a class="rounded px-3 m-1 bg-light err-404-links" href="/login" data-link>Login</a>
                        <a class="rounded px-3 m-1 bg-light err-404-links" href="/register" data-link>Register</a>
                        <a class="rounded px-3 m-1 bg-light err-404-links" href="/user" data-link>User</a>

                    </div>
				</div>
                
        </div>`;
}