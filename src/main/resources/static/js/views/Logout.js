import createView from "../createView.js";

export default function Logout(props) {
	//language=HTML
	return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8"/>
        <title>Log Out</title>
    </head>
    <body>
    <div class="container">
        <div class="form-holder my-5">
            <h1 id="login-page-title">Logging Out</h1>
        </div>
    </div>

    </body>
    </html>`;

}

function removeLocalStorageTokens() {
	window.localStorage.removeItem("access_token");
	window.localStorage.removeItem("refresh_token");
	createView('/login')
}

export function LogoutEvent() {
	removeLocalStorageTokens();
}
