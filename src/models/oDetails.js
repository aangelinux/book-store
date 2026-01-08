/**
 * Represents an ODetails entity in the database.
 */

import db from '../config/db.js'

export default class ODetails {
	static async create({ order, details }) {
		let result = []

		details.forEach(async (book) => {
			const priceQuery = 'SELECT price FROM Books WHERE isbn = ?'
			const [price] = await db.query(priceQuery, book.isbn)
			
			const query = 'INSERT INTO ODetails (ono, isbn, qty, amount) VALUES (?, ?, ?, ?)'
			const [orderDetails] = await db.query(query, [
				order,
				book.isbn,
				book.qty,
				(price[0].price * book.qty) 
			]) // Need to calculate total price

			result.push(orderDetails)
		})

		return result
	}
}