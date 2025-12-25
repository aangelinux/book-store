/**
 * Routes to the API's endpoints.
 */

import express from 'express'
import { login, logout, register } from '../controllers/auth.js'
import { getBooks, addBook } from "../controllers/books.js"
import { checkout } from '../controllers/order.js'

const router = express.Router()

router.post('/auth/login', login)
router.post('/auth/register', register)
router.post('/auth/logout', logout)

router.get('/books', getBooks)
router.post('/books', addBook)

router.post('/order', checkout)

export default router