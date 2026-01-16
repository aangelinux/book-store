/**
 * Represents a Book entity.
 */

import db from '../config/db.js'

export default class Book {
	static async getSubject({ value, page = 1, pageLimit = 5 }) {
		const currentPage = (page - 1) * pageLimit
		const bookQuery = 
		`SELECT * FROM Books WHERE subject LIKE ? LIMIT ? OFFSET ?`
		const [books] = await db.query(bookQuery, [
			value,
			pageLimit,
			currentPage
		])

		const pagesQuery = 
		`SELECT COUNT(*) AS total FROM Books WHERE subject LIKE ?`
		const [rows] = await db.query(pagesQuery, value)
		const total = rows[0].total
		const pages = Math.ceil(total / pageLimit)

		return { books, pages }
	}

	static async getAuthor({ value, page = 1, pageLimit = 5 }) {
		const currentPage = (page - 1) * pageLimit
		const bookQuery = 
		`SELECT * FROM Books WHERE author LIKE ? LIMIT ? OFFSET ?`
		const [books] = await db.query(bookQuery, [
			`${value}%`,
			pageLimit,
			currentPage
		])

		const pagesQuery = 
		`SELECT COUNT(*) AS total FROM Books WHERE author LIKE ?`
		const [rows] = await db.query(pagesQuery, `${value}%`)
		const total = rows[0].total
		const pages = Math.ceil(total / pageLimit)

		return { books, pages }
	}

	static async getTitle({ value, page = 1, pageLimit = 5 }) {
		const currentPage = (page - 1) * pageLimit
		const bookQuery = 
		`SELECT * FROM Books WHERE title LIKE ? LIMIT ? OFFSET ?`
		const [books] = await db.query(bookQuery, [
			`%${value}%`,
			pageLimit,
			currentPage
		])

		const pagesQuery = 
		`SELECT COUNT(*) AS total FROM Books WHERE title LIKE ?`
		const [rows] = await db.query(pagesQuery, `%${value}%`)
		const total = rows[0].total
		const pages = Math.ceil(total / pageLimit)

		return { books, pages }
	}
}