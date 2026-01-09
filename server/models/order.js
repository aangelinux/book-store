/**
 * Represents an Order entity in the database.
 */

import db from '../config/db.js'

export default class Order {
	static async create(userId) {
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
		const ono = order.insertId

		return ono
	}

	static async get(order) {
		
	}
}