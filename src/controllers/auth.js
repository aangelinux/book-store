/**
 * Handles login, logout, and registering.
 */

export async function login(req, res, next) {
	res.status(201).send({
		message: 'User logged in successfully!',
	})
}

export async function logout(req, res, next) {
	res.status(201).send({
		message: 'User logged out successfully!',
	})
}

export async function register(req, res, next) {
	res.status(201).send({
		message: 'User created successfully!',
	})
}