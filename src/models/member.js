/**
 * Represents a Member entity in the database.
 */

import db from '../config/db.js'

export default class Member {
	static async insert(memberInfo) {
		const { fname, lname, address, city, zip, phone, email, password } = memberInfo
		
		const query = 'INSERT INTO Members (fname, lname, address, city, zip, phone, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
		const [result] = await db.query(query, [
			fname,
			lname,
			address,
			city,
			zip,
			phone,
			email,
			password
		])

		return result
	}

	static async findByEmail(email) {
		const query = 'SELECT * FROM Members WHERE email = ?'
		const [result] = await db.query(query, email)

		return result[0]
	}
}