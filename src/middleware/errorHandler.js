/**
 * Handles errors.
 */

export function errorHandler(err, req, res, next) {
	console.error(err)

	const status = err && err.status ? err.status : 500
	const message = err && err.message ? err.message : 'Internal Server Error'

	if (res.headersSent) return next(err)

	res.status(status).json({ message })
}