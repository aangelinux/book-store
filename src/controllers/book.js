/**
 * Handles retrieval of books from the database.
 */

import Book from '../models/book.js'

export async function getBooks(req, res, next) {
	const { type, value } = req.query

	try {
		const books = await Book.findBy({ type, value })
		console.log(books)
		return res.status(200).send({
			data: books
		})
	} catch (error) {
		return res.status(404).send({ 
			message: 'Books could not be retrieved', 
			errors: error 
		})
	}
}