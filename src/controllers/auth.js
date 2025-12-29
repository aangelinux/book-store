/**
 * Handles login, logout, and registering.
 */

import { validationResult } from 'express-validator'
import Member from '../models/member.js'

export async function login(req, res, next) {
	//Add validation!

	res.status(201).send({
		message: 'User logged in successfully!',
	})
}

export async function logout(req, res, next) {
	res.status(201).send({
		message: 'User logged out successfully!',
	})
}

export async function register(req, res, next) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    })
	}

  try {
		const result = await Member.insert(req.body)
		res.status(201).json({
			message: 'Member registered successfully!',
			memberId: result.insertId
		})
	} catch (error) {
		console.error('Error registering member: ', error.message)
		res.status(500).json({ error: 'Failed to register member' })
	}
}