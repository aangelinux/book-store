/**
 * Represents a Book entity.
 */

import db from '../config/db.js'

export default class Book {
	static async findBy({ type, value, page = 1, pageLimit = 5 }) {
		const bookQuery = 
		`SELECT * FROM Books WHERE ${type} LIKE ? COLLATE utf8mb4_general_ci LIMIT ? OFFSET ?`
		const [rows] = await db.query(bookQuery, [
			`%${value}%`,
			pageLimit,
			(page - 1) * pageLimit
		])

		const pagesQuery = 
		`SELECT COUNT (*) AS total FROM Books WHERE ${type} LIKE ? COLLATE utf8mb4_general_ci`
		const [countRows] = await db.query(pagesQuery, `%${value}%`)
		const total = countRows[0].total
		const nrOfPages = Math.ceil(total / pageLimit)

		return { books: rows, pages: nrOfPages }
	}
}