import express from 'express'
import { createOrder,deleteOrder,getAllOrder,getOrder, updateOrder } from '../RouterController/order.js'

const router = express.Router()

router.post('/', createOrder)
router.get('/find/:id', getOrder)
router.put('/:id', updateOrder)
router.delete('/:id', deleteOrder)
router.get('/', getAllOrder)

export default router