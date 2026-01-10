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
		const query = `
			SELECT 
				b.isbn,
				b.title,
				b.price,
				od.qty
			FROM ODetails od
			JOIN Books b ON od.isbn = b.isbn
			WHERE od.ono = ?`
		const [result] = await db.query(query, order)

		return result
	}

	static async getTotalAmount(order) {
		const query = 'SELECT SUM(amount) AS total FROM ODetails WHERE ono = ?'
		const [result] = await db.query(query, order)
		
		return result[0]
	}
}