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

		return result
	}

	static async getTotalAmount(order) {
		let amounts = []
		const total = total.reduce((a, b) => a + b, 0)		
	}
}