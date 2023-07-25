import Room from '../models/Room.js'
import Hotel from '../models/Hotel.js'
import errorMessage from '../errorMessage.js'

export const createRoom = async(req, res, next) => {
    const hotelId = req.params.hotelid
    const newRoom = new Room(req.body)
    try {
        const saveRoom = await newRoom.save()
        
        try {
            await Hotel.findByIdAndUpdate(hotelId, {$push: { rooms: saveRoom._id }})
        } catch(error) {
            console.log(error)
            next(errorMessage(500,"找不到hotel id無法上傳room更新",error))
        }

        res.status(200).json(saveRoom)
    } catch(error) {
        console.log(error)
        next(errorMessage(500,"資料上傳錯誤請確認格式",error))
    } 
}

export const getRoom = async(req, res, next) => {
    const id = req.params.id
    try {
        const getRoom = await Room.findById(id)
        res.status(200).json(getRoom)
    } catch(error) {
        console.log(error)
        next(errorMessage(500,"找不到資料，請檢察是否有此id",error))
    } 
}

export const updateRoom = async(req, res, next) => {
    const id = req.params.id
    const body = req.body
    try {
        const updateRoom = await Room.findByIdAndUpdate(id,{$set: body}, {new: true})
        res.status(200).json(updateRoom)
    } catch(error) {
        console.log(error)
        next(errorMessage(500,"修改失敗，請確認是否有此id或欄位格式輸入正確",error))
    }
}

export const updateRoomDates = async(req, res, next) => {
    const id = req.params.id
    const dates = req.body.dates
    
    try {
        const updateRoomDates = await Room.updateOne(
            { "roomNumbers._id": id },
            {
                $push: {"roomNumbers.$.unavailableDates": dates}
            }
        )

        res.status(200).json(updateRoomDates)
    } catch(error) {
        console.log(error)
        next(errorMessage(500,"日期上傳失敗，可能為格式錯誤或找不到ID",error))
    }
}

export const deleteRoom = async(req, res, next) => {
    const id = req.params.id
    const hotelId = req.params.hotelid
    try {
        await Room.findByIdAndDelete(id)
        try {
            await Hotel.findByIdAndUpdate(hotelId, {$pull: { rooms: id }})
        } catch(error) {
            console.log(error)
            next(error)
        }
        res.status(200).json("刪除成功")
    } catch(error) {
        console.log(error)
        next(errorMessage(500,"刪除失敗，請確認是否有此id",error))
    }
}

export const getAllRooms = async(req, res, next) => {
    try {
        const RoomsList = await Room.find()
        res.status(200).json(RoomsList)
    } catch(error) {
        console.log(error)
        next(errorMessage(500, "無法取得所有房間資料", error))
    }
}

export const getHotelRooms = async(req, res, next) => {
    const gethotel = req.params.hotelid
    try {
        const hoteldata = await Hotel.findById(gethotel)
        try {
            const RoomsList = await Promise.all(hoteldata.rooms.map(roomId => {
                return Room.findById(roomId)
            }))
            // console.log(RoomsList)
            res.status(200).json(RoomsList)
        } catch(error) {
            console.log(error)
            next(errorMessage(500, "發生錯誤，可能為Room資料庫問題", error))
        }    
    } catch(error) {
        next(errorMessage(500, "找不到hotel id無法查看rooms", error))
    }

    
}