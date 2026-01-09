/**
 * Handles order creation.
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
		const orderDetails = await ODetails.create({ order, details })

		return res.status(201).json({ 
			message: 'Order placed succesfully', 
			data: { order, orderDetails }
		})
	} catch (error) {
		return res.status(500).send({ 
			message: 'Order could not be created', 
			errors: error 
		})
	}
}

export async function getOrder(req, res, next, id) {
	try {
		const order = await Order.get(id)
		const orderDetails = await ODetails.getItems(id)
		console.log(order, orderDetails)
	} catch (error) {
		return res.status(500).send({ 
			message: 'Order could not be retrieved', 
			errors: error 
		})
	}
}