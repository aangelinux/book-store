/**
 * App configuration and startup.
 */

import path from 'path'
import dotenv from 'dotenv'
import express from 'express'
import session from 'express-session'
import router from './routes/router.js'
import db from './config/db.js'
import { xss } from 'express-xss-sanitizer'
import { fileURLToPath } from 'url'

dotenv.config()

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, '../client/public')))
app.use('/src', express.static(path.join(__dirname, '..', 'client', 'src')))
app.use(express.json())
app.use(xss())

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use('/', router)

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: "Oops! Something went wrong." })
})

try {
	await db.getConnection()
	console.log('Database connected succesfully!')
} catch (error) {
	console.error('Database failed to connect: ', error)
	process.exit(1)
}

app.listen(process.env.PORT, () => {
	console.log(`Server running on PORT ${process.env.PORT}`)	
})