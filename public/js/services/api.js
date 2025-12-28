/**
 * API calls to the backend.
 */

export async function register(memberInfo) {
	return fetch('/auth/register', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(memberInfo)
	})
}

export async function login(memberInfo) {
	return fetch('/auth/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(memberInfo)
	})
}

export async function logout() {
	return fetch('/auth/logout', {
		method: 'POST'
	})
}

export async function order() {

}