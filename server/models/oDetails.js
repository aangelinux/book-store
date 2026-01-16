/**
 * Represents an ODetails entity.
 */

import db from '../config/db.js'

export default class ODetails {
	static async insert({ ono, items }) {
		let results = []

		for (const item of items) {
			const priceQuery = 'SELECT price FROM Books WHERE isbn = ?'
			const [rows] = await db.query(priceQuery, item.isbn)
			const amount = rows[0].price * item.qty
			
			const query = 'INSERT INTO ODetails (ono, isbn, qty, amount) VALUES (?, ?, ?, ?)'
			const [current] = await db.query(query, [
				ono,
				item.isbn,
				item.qty,
				amount
			])
			results.push(current)
		}

		return results
	}

	static async getItems(order) {
		const query = `
			SELECT b.isbn, b.title, b.price, od.qty
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