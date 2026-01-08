/**
 * Represents an Order entity in the database.
 */

import db from '../config/db.js'

export default class Order {
	static async create(userId) {
		const memberQuery = 'SELECT address, city, zip FROM Members WHERE userid = ?'
		const [member] = await db.query(memberQuery, userId)

		const query = `INSERT INTO Orders (userid, shipAddress, shipCity, shipZip, created)
			VALUES (?, ?, ?, ?, NOW())`
		const [result] = await db.query(query, [
			userId,
			member.address,
			member.city,
			member.zip
		])

		return result
	}
}