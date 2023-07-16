import express from 'express'
import { deleteUser, getAllUsers, getUser, updateUser } from '../RouterController/user.js'
import { verifyUser, verifyAdmin } from '../JWT_Token.js'

const router = express.Router()

router.get('/:id', verifyUser, getUser)
router.put('/:id', verifyUser, updateUser)
router.delete('/:id', verifyUser, deleteUser)
router.get("/", verifyAdmin, getAllUsers)

export default router