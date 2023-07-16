import Hotel from '../models/Hotel.js'
import errorMessage from '../errorMessage.js'

export const createHotel = async(req, res, next) => {
    const newHotel = new Hotel(req.body)
    try {
        const saveHotel = await newHotel.save()
        res.status(200).json(saveHotel)
    } catch(error) {
        console.log(error)
        next(errorMessage(500,"資料上傳錯誤請確認格式",error))
    } 
}

export const getHotel = async(req, res, next) => {
    const id = req.params.id
    try {
        const getHotel = await Hotel.findById(id)
        res.status(200).json(getHotel)
    } catch(error) {
        console.log(error)
        next(errorMessage(500,"找不到資料，請檢察是否有此id",error))
    } 
}

export const updateHotel = async(req, res, next) => {
    const id = req.params.id
    const body = req.body
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(id,{$set: body}, {new: true})
        res.status(200).json(updateHotel)
    } catch(error) {
        console.log(error)
        next(errorMessage(500,"修改失敗，請確認是否有此id或欄位格式輸入正確",error))
    }
}

export const deleteHotel = async(req, res, next) => {
    const id = req.params.id
    try {
        await Hotel.findByIdAndDelete(id)
        res.status(200).json("刪除成功")
    } catch(error) {
        console.log(error)
        next(errorMessage(500,"刪除失敗，請確認是否有此id",error))
    }
}

export const getAllHotels = async(req, res, next) => {
    const withQuery = req.query
    try {
        const hotelsList = await Hotel.find(
            {
                ...withQuery
            }
        ).limit(7)
        res.status(200).json(hotelsList)
    } catch(error) {
        console.log(error)
        next(errorMessage(500, "無法取得所有飯店資料", error))
    }
}

export const amountOfType = async(req, res, next) => {
    const type = req.query.type.split(",") 
    try {
        const list = await Promise.all(type.map(type => {
            return Hotel.countDocuments({ type: type })
        }))
        res.status(200).json(list)
    } catch(error) {
        console.log(error)
        next(errorMessage(500,"無法統計各個住宿種類的數量",error))
    }
}


export const amountOfCities = async(req, res, next) => {
    const city = req.query.city.split(",") 
    try {
        const list = await Promise.all(city.map(city => {
            return Hotel.countDocuments({ city: city })
        }))
        res.status(200).json(list)
    } catch(error) {
        console.log(error)
        next(errorMessage(500,"無法統計各個城市的提供住宿的數量",error))
    }
}