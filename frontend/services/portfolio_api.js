export const authUser = async (data) => {
	return await fetch('http://localhost:3001/auth', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		},
	});
}

export const registerUser = async (data) => {
	return await fetch('http://localhost:3001/register', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		},
	});
}