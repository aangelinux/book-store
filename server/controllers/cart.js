/**
 * Handles user's shopping cart.
 */

import Cart from '../models/cart.js'

export async function getCart(req, res, next) {
	const userId = req.session.userId

	try {
		const items = await Cart.getItems(userId)
		const { total } = await Cart.getTotalPrice(userId)
		return res.status(200).send({ items, total })
	} catch (error) {
		next(error)
	}
}

export async function addToCart(req, res, next) {
	const userId = req.session.userId

	try {
		await Cart.insert(req.body, userId)
		return res.status(201).json({ message: 'Book added to cart' })
	} catch (error) {
		next(error)
	}
}