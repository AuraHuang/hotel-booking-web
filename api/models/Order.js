import mongoose from 'mongoose'
const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    hotelId: {
        type: String,
        required: true,
    },
    roomNumberId: [{
        type: String,
        required: true,
    }],
    reservationDates: [{
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        }
    }],
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: "待確認訂單",
    },
    options: [{
        adult: {
            type: Number, default: 1
        },
        children: {
            type: Number, default: 0
        },
        rooms: {
            type: Number, default: 0
        }
    }]
},{timestamps: true})

export default mongoose.model("Order", OrderSchema)
