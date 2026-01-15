/**
 * All requests to the API.
 */

export async function register(memberInfo) {
	const res = await fetch('/auth/register', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(memberInfo)
	})

	const result = await res.json()
  if (!res.ok) {
    const error = new Error(result.message, result)
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
    const error = new Error(result.message, result)
    throw error
  }

	return result
}

export async function retrieveBooks(input, page = 1) {
	const res = await fetch(`/books?type=${input.type}&value=${input.value}&page=${page}`)

	const result = await res.json()
  if (!res.ok) {
    const error = new Error(result.message, result)
    throw error
  }
	
	return result
}

export async function getCart() {
	const res = await fetch('/cart')

	const result = await res.json()
  if (!res.ok) {
    const error = new Error(result.message, result)
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
    const error = new Error(result.message, result)
    throw error
  }
	
	return result
}

export async function order() {
	const res = await fetch('/order', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' }
	})

	const result = await res.json()
  if (!res.ok) {
    const error = new Error(result.message, result)
    throw error
  }
	
	return result	
}

export async function getOrder(id) {
	const res = await fetch(`/order/${id}`)

	const result = await res.json()
  if (!res.ok) {
    const error = new Error(result.message, result)
    throw error
  }
	
	return result
}

export async function logout() {
  const res = await fetch('/auth/logout', { method: 'POST' })

  const result = await res.json()
  if (!res.ok) {
    const error = new Error(result.message, result)
    throw error
  }
	
	return result	
}