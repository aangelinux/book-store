/**
 * Represents a Member entity.
 */

import db from '../config/db.js'

export default class Member {
	static async insert(data, passwordHash) {
		const { fname, lname, address, city, zip, phone, email } = data
		
		const query = `
		INSERT INTO Members (fname, lname, address, city, zip, phone, email, password) 
		VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
		const [result] = await db.query(query, [
			fname,
			lname,
			address,
			city,
			zip,
			phone,
			email,
			passwordHash
		])

		return result
	}

	static async findByEmail(email) {
		const query = 'SELECT * FROM Members WHERE email = ?'
		const [result] = await db.query(query, email)

		return result[0]
	}
}