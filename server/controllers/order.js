/**
 * Places and retrieves orders from the database.
 */

import Cart from '../models/cart.js'
import Order from '../models/order.js'
import ODetails from '../models/oDetails.js'

export async function order(req, res, next) {
	const user = req.session.userId

	try {
		const details = await Cart.getCart(user)
		if (details.length === 0) {
			return res.json({ message: 'Cart is empty' })
		}
		const order = await Order.create(user)
		const orderDetails = await ODetails.create({ order: order.insertId, details })
		await Cart.delete(user)

		return res.status(201).json({ 
			message: 'Order placed succesfully', 
			data: { order: order.insertId, orderDetails }
		})
	} catch (error) {
		next(error)
	}
}

export async function getOrder(req, res, next) {
	try {
		const order = await Order.get(req.params.id)
		const orderDetails = await ODetails.getItems(req.params.id)
		const total = await ODetails.getTotalAmount(req.params.id)

		return res.status(200).json({ 
			message: 'Order retrieved succesfully', 
			data: { order, orderDetails, total }
		})
	} catch (error) {
		next(error)
	}
}