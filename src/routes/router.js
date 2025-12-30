/**
 * Routes to the API's endpoints.
 */

import express from 'express'
import { registerValidator } from '../middleware/errorHandler.js'
import { login, logout, register } from '../controllers/auth.js'
import { getBooks } from "../controllers/book.js"
import { checkout } from '../controllers/order.js'

const router = express.Router()

router.post('/auth/login', login)
router.post('/auth/register', registerValidator, register)
router.post('/auth/logout', logout)

router.get('/books', getBooks)

router.post('/order', checkout)

export default router