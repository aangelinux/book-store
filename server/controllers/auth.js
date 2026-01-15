/**
 * Handles member authorization and registration.
 */

import { validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import Member from '../models/member.js'
import Cart from '../models/cart.js'

function isValid(req, res) {
  const errors = validationResult(req)

	if (!errors.isEmpty()) {
		res.status(400).json({
			success: false,
			message: errors.array().map(e => `\n${e.msg}`)
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
		req.session.userId = result.insertId
		res.status(201).json({ message: 'Member registered successfully' })
	} catch (error) {
		if (error.code === 'ER_DUP_ENTRY') {
			return res.status(400).json({
				message: 'A member with this email already exists. Please use a different email',
			})
		}
		next(error)
	}
}

export async function login(req, res, next) {
	const { email, password } = req.body

	try {
		const member = await Member.findByEmail(email)
		if (!member) {
			return res.status(401).json({ message: 'Invalid email or password' })
		}
		const match = await bcrypt.compare(password, member.password)
		if (!match) {
			return res.status(401).json({ message: 'Invalid email or password' })
		}
		req.session.userId = member.userid
		res.status(201).send({ message: 'User logged in' })
	} catch (error) {
		next(error)
	}
}

export async function logout(req, res, next) {
	if (!req.session) return res.status(404).json({ message: 'User not logged in' })
		
	try {
		await Cart.delete(req.session.userId)
	} catch (error) {
		next(error)
	}

	req.session.destroy(() => {
		return res.status(201).send({
			message: 'User logged out',
		})
	})
}