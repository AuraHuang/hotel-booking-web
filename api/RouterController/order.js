import errorMessage from "../errorMessage.js";
import Order from '../models/Order.js'

export const createOrder = async(req, res, next) => {
    const newOrder = new Order(req.body)
    
    try {
        const saveOrder = await newOrder.save()
        res.status(200).json(saveOrder)
    } catch(error) {
        console.log(error)
        next(errorMessage(500, "", error))
    }
}

export const getOrder = async(req, res, next) => {
    const id = req.params.id

    try {
        const getOder = await Order.findById(id)

        res.status(200).json(getOder)
    } catch(error) {
        console.log(error)
        next(errorMessage(500, "找不到資料，請檢察是否有此id", error))
    }
}

export const updateOrder = async(req, res, next) => {
    const id = req.params.id
    const body = req.body
    
    try {
        const updateOrder = await Order.findByIdAndUpdate(id, {$set: body}, {new: true})

        res.status(200).json(updateOrder)
    } catch(error) {
        console.log(error)
        next(errorMessage(500, "修改失敗，請確認是否有此id或欄位格式輸入正確", error))
    }
}

export const deleteOrder = async(req, res, next) => {
    const id = req.params.id
    
    try {
        await Order.findByIdAndDelete(id)

        res.status(200).json("刪除成功")
    } catch(error) {
        console.log(error)
        next(errorMessage(500, "刪除失敗，請確認是否有此id", error))
    }
}

export const getAllOrder = async(req, res, next) => {
    try {
        const orderList = await Order.find()

        res.status(200).json(orderList)
    } catch(error) {
        console.log(error)
        next(errorMessage(500, "無法取得所有訂單資料", error))
    }
}