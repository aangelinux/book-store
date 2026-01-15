/**
 * The API's endpoints.
 */

import express from 'express'
import { validate } from '../middleware/regValidation.js'
import { login, logout, register } from '../controllers/auth.js'
import { getBooks } from '../controllers/book.js'
import { getCart, addToCart } from '../controllers/cart.js'
import { getOrder, order } from '../controllers/order.js'

const router = express.Router()

router.post('/auth/login', login)
router.post('/auth/register', validate, register)
router.post('/auth/logout', logout)

router.get('/books', getBooks)

router.get('/cart', getCart)
router.post('/cart', addToCart)

router.get('/order/:id', getOrder)
router.post('/order', order)

export default router