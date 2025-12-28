/**
 * Routes to the API's endpoints.
 */

import express from 'express'
import { login, logout, register } from '../controllers/auth.js'
import { getBooks } from "../controllers/books.js"
import { checkout } from '../controllers/order.js'

const router = express.Router()

router.post('/auth/login', (req, res, next) => login(req, res, next))
router.post('/auth/register', (req, res, next) => register(req, res, next))
router.post('/auth/logout', (req, res, next) => logout(req, res, next))

router.get('/books', (req, res, next) => getBooks(req, res, next))
router.post('/books', (req, res, next) => addBook(req, res, next))

router.post('/order', (req, res, next) => checkout(req, res, next))

export default router