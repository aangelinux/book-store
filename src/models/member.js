/**
 * Represents a Member entity for the database.
 */

export default class Member {
	constructor({ info }) {
		const { fname, lname, address, city, zip, phone, email, password } = info

		this.fname = fname
		this.lname = lname
		this.address = address
		this.city = city
		this.zip = zip
		this.phone = phone
		this.email = email
		this.password = password
	}

	insert() {
		//SQL query here
	}
}