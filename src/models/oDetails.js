/**
 * Represents an ODetails entity in the database.
 */

import db from '../config/db.js'

export default class ODetails {
	static async create({ order, details }) {
		let result = []
		let total = []

		for (const book of details) {
			const priceQuery = 'SELECT price FROM Books WHERE isbn = ?'
			const [priceRows] = await db.query(priceQuery, [book.isbn])
			const amount = priceRows[0].price * book.qty
			total.push(amount)
			
			const query = 'INSERT INTO ODetails (ono, isbn, qty, amount) VALUES (?, ?, ?, ?)'
			const [orderDetails] = await db.query(query, [
				order,
				book.isbn,
				book.qty,
				amount 
			])
			result.push(orderDetails)
		}

		const totalPrice = total.reduce((a, b) => a + b, 0)

		return totalPrice
	}
}