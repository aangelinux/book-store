/**
 * Handles order creation.
 */

import Cart from '../models/cart.js'
import Order from '../models/order.js'
import OrderDetails from '../models/orderDetails.js'

export async function order(req, res, next) {
	const user = req.session.userId

	try {
		const items = await Cart.getCart(user)
		if (items.length === 0) {
			return res.json({ message: 'Cart is empty' })
		}
		const order = await Order.create(user)
		const orderDetails = await OrderDetails.create({ order: order.ono, details: items })
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