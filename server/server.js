import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './controllers/clerkWebhooks.js'
import userRouter from './routes/userRoute.js'
import hotelRouter from './routes/hotelRoute.js'
import connectCloudinary from './config/cloudinary.js'
import roomRouter from './routes/roomRoute.js'
import bookingRouter from './routes/bookingRoute.js'

connectDB()
connectCloudinary()

const app = express()
app.use(cors())

//middleware
app.use(express.json())
app.use(clerkMiddleware())


// API to listen to clerk webhooks
app.use('/api/clerk', clerkWebhooks)



app.get('/', (req, res) => res.send('API is working'))
app.use('/api/user', userRouter)
app.use('/api/hotels', hotelRouter)
app.use('/api/rooms', roomRouter)
app.use('/api/bookings', bookingRouter)


const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
