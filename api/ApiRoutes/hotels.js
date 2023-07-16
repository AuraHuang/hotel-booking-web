import express from 'express'
import Hotel from '../models/Hotel.js'
import { createHotel, getHotel, updateHotel, deleteHotel, getAllHotels, amountOfType, amountOfCities } from '../RouterController/hotel.js'
import { verifyAdmin } from '../JWT_Token.js'

const router = express.Router()

router.post("/", verifyAdmin, createHotel)

router.get("/find/:id", getHotel)

router.put("/:id", updateHotel)

router.delete("/:id", verifyAdmin, deleteHotel)

router.get("/", getAllHotels)

router.get("/amountoftype", amountOfType)

router.get("/amountofcities", amountOfCities)

export default router

