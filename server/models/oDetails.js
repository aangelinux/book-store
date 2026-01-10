/**
 * Represents an ODetails entity in the database.
 */

import db from '../config/db.js'

export default class ODetails {
	static async create({ order, details }) {
		let result = []
		for (const book of details) {
			const priceQuery = 'SELECT price FROM Books WHERE isbn = ?'
			const [priceRows] = await db.query(priceQuery, [book.isbn])
			const amount = priceRows[0].price * book.qty
			
			const query = 'INSERT INTO ODetails (ono, isbn, qty, amount) VALUES (?, ?, ?, ?)'
			const [orderDetails] = await db.query(query, [
				order,
				book.isbn,
				book.qty,
				amount
			])
			result.push(orderDetails)
		}

		return result
	}

	static async getItems(order) {
		let items = []

		const query = 'SELECT isbn, qty, amount FROM ODetails WHERE ono = ?'
		const [result] = await db.query(query, order)

		for (const item of result) {
			const bookQuery = 'SELECT title, price FROM Books WHERE isbn = ?'
			const [book] = await db.query(bookQuery, item.isbn)
			items.push(book[0])
		}

		return items
	}

	static async getTotalAmount(order) {
		const query = 'SELECT SUM(amount) AS total FROM ODetails WHERE ono = ?'
		const [result] = await db.query(query, order)
		
		return result[0]
	}
}