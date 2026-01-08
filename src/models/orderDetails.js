/**
 * Represents an OrderDetails entity in the database.
 */

import db from '../config/db.js'

export default class OrderDetails {
	static async create({ order, details }) {
		let result = []

		details.forEach(async (book) => {
			const priceQuery = 'SELECT price FROM Books WHERE isbn = ?'
			const [price] = await db.query(priceQuery, book.isbn)

			const query = 'INSER INTO OrderDetails (ono, isbn, qty, amount) VALUES (?, ?, ?, ?)'
			const [orderDetails] = await db.query(query, [
				order,
				book.isbn,
				book.qty,
				(price * book.qty) 
			]) // Need to calculate total price

			result.push(orderDetails)
		})

		return result
	}
}