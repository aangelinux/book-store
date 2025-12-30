/**
 * API calls to the backend.
 */

export async function register(memberInfo) {
	const res = await fetch('/auth/register', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(memberInfo)
	})

	const result = await res.json()
  if (!res.ok) {
    const error = new Error(result.message || 'Registration failed')
    error.details = result
    throw error
  }

	return result
}

export async function login(memberInfo) {
	const res = await fetch('/auth/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(memberInfo)
	})

	const result = await res.json()
  if (!res.ok) {
    const error = new Error(result.message || 'Login failed')
    error.details = result
    throw error
  }

	return result
}

export async function logout() {
	return fetch('/auth/logout', {
		method: 'POST'
	})
}

export async function order() {

}