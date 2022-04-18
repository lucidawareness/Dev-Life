export default function Login(props) {
	//language=HTML
	return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8"/>
        <title>Log In</title>
    </head>
    <body>
    <div id="form-holder">
        <h1 id="login-page-title">Log In</h1>
        <form>
            <label for="username">Username</label>
            <input id="username" name="username" type="text"/>
            <label for="password">Password</label>
            <input id="password" name="password" type="password"/>
            <input id="login-btn" type="submit" value="Log In"/>
        </form>
    </div>

    </body>
    </html>`;

}


