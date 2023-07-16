import express from 'express'
import { login, register } from '../RouterController/auth.js'

const router = express.Router()

router.get("/", (req, res) => {
    res.send("這是authApi end points")
})


router.post("/register", register)
router.post("/login", login)

export default router