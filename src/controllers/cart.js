/**
 * Handles the user cart.
 */

import Cart from '../models/cart.js'

export async function addToCart(req, res, next) {
	const userId = req.session.userId

	try {
		await Cart.insert(req.body, userId)
		res.status(201).json({
			message: 'Book added to cart'
		})
	} catch (error) {
		console.error('Error adding book to cart: ', error.message)
		res.status(500).json({ error: 'Failed to add book to cart' })
	}
}