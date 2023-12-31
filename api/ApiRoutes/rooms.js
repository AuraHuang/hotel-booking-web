import express from 'express'
import Room from '../models/Room.js'
import { createRoom, getRoom, updateRoom, deleteRoom, getAllRooms, getHotelRooms, updateRoomDates } from '../RouterController/room.js'
import { verifyAdmin, verifyUser } from '../JWT_Token.js'

const router = express.Router()

router.post("/:hotelid", verifyAdmin, createRoom)

router.get("/:id", getRoom)

router.put("/:id", verifyAdmin, updateRoom)

router.put("/reservationdates/:id", verifyUser, updateRoomDates)

router.delete("/:hotelid/:id", verifyAdmin, deleteRoom)

router.get("/", getAllRooms)

router.get("/findHotel/:hotelid/", getHotelRooms)

export default router