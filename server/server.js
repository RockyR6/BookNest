import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './controllers/clerkWebhooks.js'
import userRouter from './routes/userRoute.js'

connectDB()

const app = express()
app.use(cors())

//middleware
app.use(express.json())
app.use(clerkMiddleware())


// Use raw body for webhook route
app.use('/api/clerk', clerkWebhooks)



app.get('/', (req, res) => res.send('API is working'))
app.use('/api/user', userRouter)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
