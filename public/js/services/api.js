/**
 * All API calls to the backend.
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

export async function retrieveBooks(input, page = 1) {
	const res = await fetch(`/books?type=${input.type}&value=${input.value}&page=${page}`)

	const result = await res.json()
  if (!res.ok) {
    const error = new Error(result.message || 'Could not retrieve books')
    error.details = result
    throw error
  }
	
	return result
}

export async function addToCart(book) {
	const res = await fetch('/cart', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(book)
	})

	const result = await res.json()
  if (!res.ok) {
    const error = new Error(result.message || 'Could not retrieve books')
    error.details = result
    throw error
  }

	console.log(result)
	
	return result
}

export async function order() {
}