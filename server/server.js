import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './controllers/clerkWebhooks.js'
import bodyParser from 'body-parser'

connectDB()

const app = express()
app.use(cors())
app.use(clerkMiddleware())


// Use raw body for webhook route
app.use('/api/clerk', bodyParser.raw({ type: 'application/json' }), clerkWebhooks)

//Use express.json() for other routes
app.use(express.json())

app.get('/', (req, res) => res.send('API is working'))

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
