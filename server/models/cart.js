/**
 * Represents a Cart entity in the database.
 */

import db from '../config/db.js'

export default class Cart {
	static async insert(data, user) {
		const query = 'INSERT INTO Cart (userid, isbn, qty) VALUES (?, ?, ?)'
		const [result] = await db.query(query, [
			user,
			data.isbn,
			data.quantity
		])

		return result
	}

	static async getCart(userId) {
		const query = `
			SELECT b.isbn, b.title, b.price, c.qty 
			FROM Cart c
			JOIN Books b ON c.isbn = b.isbn
			WHERE c.userid = ?`
		const [result] = await db.query(query, userId)

		return result
	}

	static async getMemberID() {
		const query = 'SELECT userid FROM Cart'
		const [result] = await db.query(query)

		return result
	}

	static async delete() {
		const query = 'DELETE FROM Cart'
		const [result] = await db.query(query)

		return result
	}
}