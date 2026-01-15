/**
 * Represents an Order entity in the database.
 */

import db from '../config/db.js'

export default class Order {
	static async insert(userId) {
		const memberQuery = 'SELECT address, city, zip FROM Members WHERE userid = ?'
		const [member] = await db.query(memberQuery, userId)

		const orderQuery = `INSERT INTO Orders (userid, shipAddress, shipCity, shipZip, created)
			VALUES (?, ?, ?, ?, NOW())`
		const [order] = await db.query(orderQuery, [
			userId,
			member[0].address,
			member[0].city,
			member[0].zip
		])

		return order
	}

	static async get(order) {
		const query = `
		SELECT o.ono, o.created, o.shipAddress, o.shipCity, o.shipZip, m.fname, m.lname
		FROM Orders o
		JOIN Members m ON o.userid = m.userid
		WHERE o.ono = ?
		`
		const [result] = await db.query(query, order)

		return result[0]
	}
}