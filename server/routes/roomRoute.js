import express from 'express'
import upload from '../middlewares/multer.js'
import { protect } from '../middlewares/authMiddleware.js'
import { createRoom, getOwnerRooms, getRoom, toggleRoomAvailability } from '../controllers/roomController.js'


const roomRouter = express.Router()


roomRouter.post('/', upload.array('images', 4), protect, createRoom)
roomRouter.get('/', getRoom)
roomRouter.get('/owner', protect, getOwnerRooms)
roomRouter.post('/toggle-availability', protect, toggleRoomAvailability)


export default roomRouter;