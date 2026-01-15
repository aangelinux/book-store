/**
 * Represents an ODetails entity.
 */

import db from '../config/db.js'

export default class ODetails {
	static async insert({ ono, items }) {
		let result = []
		for (const item of items) {
			const priceQuery = 'SELECT price FROM Books WHERE isbn = ?'
			const [priceRows] = await db.query(priceQuery, [item.isbn])
			const amount = priceRows[0].price * item.qty
			
			const query = 'INSERT INTO ODetails (ono, isbn, qty, amount) VALUES (?, ?, ?, ?)'
			const [orderDetails] = await db.query(query, [
				ono,
				item.isbn,
				item.qty,
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