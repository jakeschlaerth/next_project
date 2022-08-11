const paths = {
	authUser: {
		uri: "/auth",
		method: "POST",
	},
	registerUser: {
		uri: "/register",
		method: "POST",
	},
}
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// lol maybe some day
// for (const [path, pathInfo] of Object.entries(paths)) {
//	export const [path] = async (data) => await sendRequest([pathInfo]);
// }

export const authUser = async (data) => await sendRequest(paths.authUser, data)
export const registerUser = async (data) => await sendRequest(paths.registerUser, data)

const sendRequest = async (pathInfo, data) => {
	const response = await fetch(`${baseUrl}${pathInfo.uri}`, {
		method: pathInfo.method,
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		},
	});
	return {
		status: response.status,
		body: await response.json(),
	}
}