import jwt from "jsonwebtoken";
import errorMessage from './errorMessage.js'

const JWT_Token = (req, res, next, callBackFunction) => {
    const token = req.cookies.JWT_token
    // console.log(req)
    if (!token) { next(errorMessage(401, "請先登入")) }
    jwt.verify(token, process.env.JWT, (err, payload) => {
        if (err) { return next(errorMessage(403, "Token無效解開JWT失敗")) }
        req.userData = payload
        callBackFunction()
    }) 
}

export const verifyUser = (req, res, next) => {
    JWT_Token(req, res, next, () => {
        const apiUserId = req.params.id
        if (req.userData.id == apiUserId || req.userData.isAdmin ) {
            next()
        } else { 
            next(errorMessage(403, "只能修改個人自己的權限或你不是管理員")) 
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    JWT_Token(req, res, next, () => {
        if (req.userData.isAdmin) {
            next()
        } else {
            next(errorMessage(403, "你沒有管理員權限")) 
        }
    })
}