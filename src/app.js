/**
 * Application configuration and startup.
 */

import dotenv from 'dotenv'
import express from 'express'
import router from './routes/router.js'
import { errorHandler } from './middleware/errorHandler.js'
import { connectDB } from './config/db.js'

dotenv.config({ path: './.env' })

const app = express()

app.use(express.json())
app.use('/', router)
app.use(errorHandler)

async function start() {
	try {
		await connectDB()
	} catch (err) {
		console.error(err)
	}

	app.listen(3000, function (err) {
		if (err) console.error(err)
		console.log('Server listening on PORT 3000')
	})
}

start()