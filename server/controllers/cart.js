/**
 * Handles user's shopping cart.
 */

import Cart from '../models/cart.js'

export async function getCart(req, res, next) {
	const userId = req.session.userId

	try {
		const items = await Cart.getCart(userId)
		if (items.length === 0) {
			return res.status(200).json({ message: 'Cart is empty' })
		}
		return res.status(200).send(items)
	} catch (error) {
		next(error)
	}
}

export async function addToCart(req, res, next) {
	const userId = req.session.userId

	try {
		await Cart.insert(req.body, userId)
		res.status(201).json({ message: 'Book added to cart' })
	} catch (error) {
		next(error)
	}
}