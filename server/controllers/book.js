/**
 * Retrieves books from the database.
 */

import Book from '../models/book.js'

export async function getBooks(req, res, next) {
	const { type, value, page } = req.query

	try {
		const { books, pages } = await Book.findBy({ type, value, page })
		if (books.length === 0) {
			return res.status(200).json({
				message: 'No books matching search parameter',
				books: []
			})
		}
		return res.status(200).send({ books, pages })
	} catch (error) {
		next(error)
	}
}