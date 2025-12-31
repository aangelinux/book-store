/**
 * Represents a Book entity in the database.
 */

import db from '../config/db.js'

export default class Book {
	static async findBy(input) {
		const query = `SELECT * FROM Books WHERE ${input.type} = ?`
		const result = await db.query(query, input.value)

		return result[0]
	}
}