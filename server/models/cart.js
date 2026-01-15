/**
 * Represents a Cart entity in the database.
 */

import db from '../config/db.js'

export default class Cart {
	static async insert(data, user) {
		const query = `
		INSERT INTO Cart (userid, isbn, qty) VALUES (?, ?, ?)
		ON DUPLICATE KEY UPDATE qty = qty + VALUES(qty)`
		const [result] = await db.query(query, [
			user,
			data.isbn,
			data.quantity
		])

		return result
	}

	static async getItems(userId) {
		const query = `
			SELECT b.isbn, b.title, b.price, c.qty 
			FROM Cart c
			JOIN Books b ON c.isbn = b.isbn
			WHERE c.userid = ?`
		const [result] = await db.query(query, userId)

		return result
	}

	static async getTotalPrice(userId) {
		const query = `
			SELECT SUM(b.price * c.qty) AS total
			FROM Cart c
			JOIN Books b ON c.isbn = b.isbn
			WHERE c.userid = ?`
		const [result] = await db.query(query, userId)

		return result
	}

	static async delete(userId) {
		const query = 'DELETE FROM Cart WHERE userid = ?'
		const [result] = await db.query(query, userId)

		return result
	}
}