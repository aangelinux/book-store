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