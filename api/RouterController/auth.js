import errorMessage from '../errorMessage.js'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'


export const register = async(req, res, next) => {
    const registerData = req.body
    try {
        const registerWrong = await User.findOne({username: registerData.username}) || await User.findOne({username: registerData.username})
        if (registerWrong) 
        return (next(errorMessage(400, "帳號或信箱已註冊")))
        
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(registerData.password, salt)
        const newUser = new User({
            username: registerData.username,
            email: registerData.email,
            password: hash,
        })
        console.log(newUser)
        const saveUser = await newUser.save()
        res.status(200).json(saveUser)
    } catch(error) {
        console.log(error)
        next(errorMessage(500, "註冊失敗", error))
    }
}

export const login = async(req, res, next) => {
    const loginData = req.body
    try {
        const userData = await User.findOne({ username: loginData.account }) || await User.findOne({ email: loginData.account })
        // console.log(userData)
        
        if (!userData) 
        return (next(errorMessage(404, "無此帳號")))

        const isPasswordCorrect  = await bcrypt.compare(loginData.password, userData.password)
        if (!isPasswordCorrect) 
        return (next(errorMessage(404, "帳號/密碼輸入錯誤")))
        
        const token = jwt.sign({ id: userData._id, isAdmin: userData.isAdmin }, process.env.JWT)
        const { password, isAdmin, ...userDetails } = userData._doc
        // console.log({ id: userData._id, isAdmin: userData.isAdmin })
        // console.log(userDetails)
        res.cookie('JWT_token', token, { httpOnly: true }).status(200).json({userDetails})
    } catch(error) {
        console.log(error)
        next(errorMessage(500,"請確認輸入帳號密碼正確性",error))
    }
}
