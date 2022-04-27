import fetchData from "./fetchData.js";
import createView from "./createView.js";

/**
 * Adds a login event to allow the user to initially obtain a new OAuth2.0 token
 * On a successful response, sets the tokens into storage and redirects to the root
 */
export default function addLoginEvent() {
	console.log("entered addLoginEvent")
	document.querySelector("#login-btn").addEventListener("click", function () {

		let errMsg = document.getElementById("error-msg");
		let usernameVal = document.querySelector("#username").value
		let passVal = document.querySelector("#password").value

		if (usernameVal === "" || passVal ==="") {
			errMsg.style.display = "block"
			errMsg.style.color = "red"
			return;
		}

		let obj = {
			username: usernameVal,
			password: passVal,
			grant_type: 'password'
		}
		console.log("got to login event")
		// TODO: these are the only request params /oauth/token accepts in Spring Security
		// TODO: need to possibly implement a random bit handshake w/ SHA256 on the password before sending
		//      -> Alternatively, encrypt the entire request body
		let request = {
			method: "POST",
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': 'Basic ' + btoa('rest-blog-client:secret')
			},
			body: `grant_type=${obj.grant_type}&username=${obj.username}&password=${obj.password}&client_id=rest-blog-client`
		};

		fetchData(
			{
				route: `/oauth/token`
			},
			request).then((data) => {
			console.log(data.route);
			if (data.route) {
				if (data.route.error_description !== "Bad credentials") {
					setTokens(data);
					createView("/posts");
				}
			}
			errMsg.style.display = "block"
			errMsg.style.color = "red"
		}).catch((res) => {
			console.log(res);
		});
	});
}

/**
 * Gets the Authorization header needed for making requests to protected endpoints
 * This function should be used only after the user is logged in
 * @returns {{Authorization: string, "Content-Type": string}|{"Content-Type": string}}
 */
export function getHeaders() {
	const token = localStorage.getItem("access_token");
	return token
		? {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + `${token}`
		}
		: {'Content-Type': 'application/json'};
}

/**
 * Attempts to set the access and refresh tokens needs to authenticate and authorize the client and user
 * @param responseData
 */
function setTokens(responseData) {
	if (responseData.route['access_token']) {
		localStorage.setItem("access_token", responseData.route['access_token']);
		console.log("Access token set");
	}
	if (responseData.route['refresh_token']) {
		localStorage.setItem("refresh_token", responseData.route['refresh_token']);
		console.log("Refresh token set")
	}
}

export function isLoggedIn() {
	return !!localStorage.getItem('access_token');
}

export function getUserRole() {
	const accessToken = localStorage.getItem("access_token");
	if(!accessToken) {
		return false;
	}
	const parts = accessToken.split('.');
	const payload = parts[1];
	const decodedPayload = atob(payload);
	const payloadObject = JSON.parse(decodedPayload);
	return payloadObject.authorities[0];
}