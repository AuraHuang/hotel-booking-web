import express from "express"
import dotenv from 'dotenv'
import mongoose from "mongoose"
import authApiRoutes from './ApiRoutes/auth.js'
import hotelsApiRoutes from './ApiRoutes/hotels.js'
import roomsApiRoutes from './ApiRoutes/rooms.js'
import usersApiRoutes from './ApiRoutes/users.js'
import orderApiRoutes from './ApiRoutes/order.js'
import cookieParser from "cookie-parser"
import cors from "cors";

const app = express()

app.use(cors())

dotenv.config()

const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGODB)
        console.log("connected to mongoDB")
    } catch(error) {
        console.log(error)
        console.log('disconnected to mongoDB')
    }
}

mongoose.connection.on("connected", () => {
    console.log("mongoDB connected")
})

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!")
})

app.get('/', (req, res) => {
    const name = process.env.NAME || 'World';
    res.send(`Hello ${name}!`);
})

const port = process.env.PORT || 8080

app.listen(port, () => {
    connect()
    console.log(`connected to ${port} backend test`)
})

app.use(cookieParser())

app.use(express.json())

app.use("/api/v1/hotels", hotelsApiRoutes)
app.use("/api/v1/auth", authApiRoutes)
app.use("/api/v1/rooms", roomsApiRoutes)
app.use("/api/v1/users", usersApiRoutes)
app.use("/api/v1/orders", orderApiRoutes)

app.use((error,req, res, next) => {
    const errorStatus = error.status || 500
    const errorMsg = error.message || '中間ApiRoute出錯'
    return res.status(errorStatus).json({
        status: errorStatus,
        message: errorMsg
    })
})


