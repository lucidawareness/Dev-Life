export default function Login(props) {
	//language=HTML
	return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8"/>
        <title>Log In</title>
    </head>
    <body>
    <div class="container">
        <div class="form-holder my-5">
            <h1 id="login-page-title">Log In</h1>
            <form>
                <label for="username">Username</label>
                <input class="form-control" id="username" name="username" type="text"/>
                <label for="password">Password</label>
                <input class="form-control" id="password" name="password" type="password"/>
                <input class="btn btn-light mt-3" id="login-btn" type="button" value="Log In"/>
            </form>
        </div>
    </div>

    </body>
    </html>`;

}


