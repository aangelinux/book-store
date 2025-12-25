/**
 * App configuration and startup.
 */

import path from 'path'
import dotenv from 'dotenv'
import express from 'express'
import router from './routes/router.js'
import { fileURLToPath } from 'url'
import { errorHandler } from './middleware/errorHandler.js'
import { connectDB } from './config/db.js'

dotenv.config()

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json())
app.use('/', router)
app.use(errorHandler)

async function start() {
	await connectDB()

	app.listen(process.env.PORT, () => {
    console.log(`Server running at PORT ${process.env.PORT}`)	
	})
}

start().catch(error => {
	console.error("Error starting app: ", error)
	process.exit(1)
})