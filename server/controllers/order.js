/**
 * Places and retrieves orders from the database.
 */

import Cart from '../models/cart.js'
import Order from '../models/order.js'
import ODetails from '../models/oDetails.js'

export async function order(req, res, next) {
	const user = req.session.userId

	try {
		const items = await Cart.getItems(user)
		if (items.length === 0) {
			return res.status(404).json({ message: 'Cannot check out empty cart' })
		}
		const order = await Order.insert(user)
		const ono = order.insertId
		const orderDetails = await ODetails.insert({ ono, items })
		await Cart.delete(user)

		return res.status(201).json({ 
			message: 'Order placed succesfully', 
			orderDetails,
			ono
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
			order,
			orderDetails,
			total
		})
	} catch (error) {
		next(error)
	}
}