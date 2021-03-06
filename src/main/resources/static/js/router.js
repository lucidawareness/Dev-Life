import Home from "./views/Home.js";
import PostIndex from "./views/PostIndex.js";
import About from "./views/About.js";
import Error404 from "./views/Error404.js";
import Loading from "./views/Loading.js";
import Login from "./views/Login.js";
import LoginEvent from "./auth.js";
import Register from "./views/Register.js"
import {RegisterEvent} from "./views/Register.js";
import {PostsEvent} from "./views/PostIndex.js"
import User from "./views/User.js";
import {changeUserInfoEvent} from "./views/User.js";
import Logout, {LogoutEvent} from "./views/Logout.js";
import Admin, {adminEvents} from "./views/Admin.js";

/**
 * Returns the route object for a specific route based on the given URI
 * @param URI
 * @returns {*}
 */
export default function router(URI) {
	const routes = {
		'/': {
			returnView: Home,
			state: {},
			uri: '/',
			title: 'Home',
		},
		'/login': {
			returnView: Login,
			state: {},
			uri: '/login',
			title: "Login",
			viewEvent: LoginEvent
		},
		'/logout': {
			returnView: Logout,
			state: {},
			uri: '/logout',
			title: "Logout",
			viewEvent: LogoutEvent
		},
		'/register': {
			returnView: Register,
			state: {},
			uri: '/register',
			title: 'Register',
			viewEvent: RegisterEvent
		},
		'/posts': {
			returnView: PostIndex,
			state: {
				posts: '/api/posts'
			},
			uri: '/posts',
			title: 'All Posts',
			viewEvent: PostsEvent // <-- Use PostEvent as a callback here
		},
		'/about': {
			returnView: About,
			state: {},
			uri: '/about',
			title: 'About',
		},
		'/error': {
			returnView: Error404,
			state: {},
			uri: location.pathname,
			title: ' ERROR',
		},
		'/loading': {
			returnView: Loading,
			state: {},
			uri: location.pathname,
			title: 'Loading...',
		},
		'/user': {
			returnView: User,
			state: {
				user: "/api/users/userdata"
			},
			uri: '/user',
			title: ' User Info',
			viewEvent: changeUserInfoEvent
		},
		'/admin': {
			returnView: Admin,
			state: {
				users: "/api/users/admin",
				categories: "/api/categories",
				posts: "/api/posts"
			},
			uri: '/admin',
			title: 'Admin',
			viewEvent: adminEvents
		}
	};

	return routes[URI];
}

