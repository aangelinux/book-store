/**
 * The API's endpoints.
 */

import express from 'express'
import { validate } from '../middleware/regValidation.js'
import { login, logout, register } from '../controllers/auth.js'
import { getSubject, getAuthor, getTitle } from '../controllers/book.js'
import { getCart, addToCart } from '../controllers/cart.js'
import { getOrder, order } from '../controllers/order.js'

const router = express.Router()

router.post('/auth/login', login)
router.post('/auth/register', validate, register)
router.post('/auth/logout', logout)

router.get('/books/subject', getSubject)
router.get('/books/author', getAuthor)
router.get('/books/title', getTitle)

router.get('/cart', getCart)
router.post('/cart', addToCart)

router.get('/order/:id', getOrder)
router.post('/order', order)

export default router