/**
 * Retrieves books and the total number of pages from the database.
 */

import Book from '../models/book.js'

export async function getSubject(req, res, next) {
	const { value, page } = req.query

	try {
		const { books, pages } = await Book.getSubject({ value, page })
		if (books.length === 0) {
			return res.status(404).json({
				message: 'No books matching search parameter'
			})
		}
		return res.status(200).send({ books, pages })
	} catch (error) {
		next(error)
	}
}

export async function getAuthor(req, res, next) {
	const { value, page } = req.query

	try {
		const { books, pages } = await Book.getAuthor({ value, page })
		if (books.length === 0) {
			return res.status(404).json({
				message: 'No books matching search parameter'
			})
		}
		return res.status(200).send({ books, pages })
	} catch (error) {
		next(error)
	}
}

export async function getTitle(req, res, next) {
	const { value, page } = req.query

	try {
		const { books, pages } = await Book.getTitle({ value, page })
		if (books.length === 0) {
			return res.status(404).json({
				message: 'No books matching search parameter'
			})
		}
		return res.status(200).send({ books, pages })
	} catch (error) {
		next(error)
	}
}