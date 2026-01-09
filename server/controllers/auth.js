/**
 * Handles all forms of member authorization and registration.
 */

import { validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import Member from '../models/member.js'

function isValid(req, res) {
  const errors = validationResult(req)

	if (!errors.isEmpty()) {
		res.status(400).json({
			success: false,
			errors: errors.array()
		})
		return false
	}
	return true
}

export async function register(req, res, next) {
	if (!isValid(req, res)) return

  try {
		const hashedPassword = await bcrypt.hash(req.body.password, 12)
		const result = await Member.insert(req.body, hashedPassword)
		res.status(201).json({
			message: 'Member registered successfully!',
			memberId: result.insertId
		})
	} catch (error) {
		if (error.code === 'ER_DUP_ENTRY') {
			return res.status(400).json({
				errors: 'A member with this email already exists. Please use a different email.',
			})
		}
		console.error('Error registering member: ', error.message)
		res.status(500).json({ error: 'Failed to register member' })
	}
}

export async function login(req, res, next) {
	const { email, password } = req.body

	const member = await Member.findByEmail(email)
	if (!member) {
		return res.status(401).json({ errors: 'Invalid email or password.' })
	}

	const match = await bcrypt.compare(password, member.password)
	if (!match) {
		return res.status(401).json({ errors: 'Invalid email or password.' })
	}

	req.session.userId = member.userid
	res.status(201).send({
		message: 'User logged in successfully!',
	})
}

export async function logout(req, res, next) {
	if (!req.session) return

	req.session.destroy(() => {
		res.status(201).send({
			message: 'User logged out successfully!',
		})
	})
}