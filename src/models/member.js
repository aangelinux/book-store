/**
 * Represents a Member entity for the database.
 */

import db from '../config/db.js'

export default class Member {
	static async insert(memberInfo) {
		const query = 'INSERT INTO Members (fname, lname, address, city, zip, phone, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
		const [result] = await db.query(query, memberInfo)

		return result
	}
}