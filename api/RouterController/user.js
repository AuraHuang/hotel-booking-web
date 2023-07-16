import errorMessage from '../errorMessage.js'
import User from '../models/User.js'

export const getUser = async(req, res, next) => {
    const id = req.params.id
    try {
        const getUsers = await User.findById(id)
        res.status(200).json(getUsers)
    } catch(error) {
        console.log(error)
        next(errorMessage(500, "讀取用戶失敗", error))
    }
}

export const updateUser = async(req, res, next) => {
    const id = req.params.id
    const body = req.body 
    try {
        const updateUserNameWrong = await User.findOne({ username: body.username })
        const updateUserEmailWrong = await User.findOne({ email: body.email })
        const originalUser = await User.findById(id)

        if (updateUserNameWrong && updateUserNameWrong.id != originalUser.id)
        return (next(errorMessage(400, "此名稱已被使用")))

        if (updateUserEmailWrong && updateUserEmailWrong.id != originalUser.id)
        return (next(errorMessage(400, "此信箱已被使用")))

        const updateUser = await User.findByIdAndUpdate(id, {$set: body}, {new: true})
        res.status(200).json(updateUser)
    } catch(error) {
        console.log(error)
        next(errorMessage(500, "修改用戶失敗", error))
    }
}

export const deleteUser = async(req, res, next) => {
    const id = req.params.id
    try {
        await User.findByIdAndDelete(id)
        res.status(200).json("成功刪除用戶")
    } catch(error) {
        console.log(error)
        next(errorMessage(500, "刪除用戶失敗", error))
    }
}

export const getAllUsers = async(req, res, next) => {
    try {
        const usersList = await User.find()
        res.status(200).json(usersList)
    } catch(error) {
        console.log(error)
        next(errorMessage(500, "無法取得所有使用者資料", error))
    }
}