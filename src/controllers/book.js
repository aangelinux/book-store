/**
 * Handles retrieval of books from the database.
 */

import Book from '../models/book.js'

export async function getBooks(req, res, next) {
	const { type, value, page } = req.query

	try {
		const { books, pages } = await Book.findBy({ type, value, page })
		if (books.length === 0) {
			return res.json({
				message: 'No books matching search parameter',
				data: []
			})
		}
		return res.status(200).send({
			data: books,
			pages
		})
	} catch (error) {
		return res.status(404).send({ 
			message: 'Books could not be retrieved', 
			errors: error 
		})
	}
}