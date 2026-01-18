/**
 * Queries to the Orders table.
 */

import db from '../config/db.js'

export default class Order {
	static async insert(userId) {
		const query = `
			INSERT INTO Orders (userid, shipAddress, shipCity, shipZip, created)
			SELECT m.userid, m.address, m.city, m.zip, NOW()
			FROM Members m 
			WHERE m.userid = ?`
		const [result] = await db.query(query, userId)

		return result
	}

	static async get(order) {
		const query = `
			SELECT o.ono, o.created, o.shipAddress, o.shipCity, o.shipZip, m.fname, m.lname
			FROM Orders o
			JOIN Members m ON o.userid = m.userid
			WHERE o.ono = ?`
		const [result] = await db.query(query, order)

		return result[0]
	}
}