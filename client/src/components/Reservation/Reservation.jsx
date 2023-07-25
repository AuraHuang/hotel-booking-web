import React, { useContext, useState } from 'react'
import './reservation.scss'
import { AiFillCloseCircle } from 'react-icons/ai'
import useFetch from '../../hooks/useFetch'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { LoginContext } from '../../context/LoginContext'
import useCreateOrder from '../../hooks/useCreateOrder'
import { reservationDatesList } from '../../../datesCalculate'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Reservation = ({openSetting, hotelId, startdate, enddate, dateRange, days, options}) => {
    const navigate = useNavigate()

    const { loading, data, error } = useFetch(`/api/v1/rooms/findHotel/${hotelId}`)
    const { user } = useContext(LoginContext)

    const [roomNumber, setRoomNumber] = useState([])
    const [roomPrice, setRoomPrice] = useState(0)
    const [orderData, setOrderData] = useState({
        userId: user._id,
        hotelId: hotelId,
        roomNumberId: [],
        reservationDates: [{
            startDate: startdate,
            endDate: enddate,
        }],
        totalPrice: 0,
        options: options
    })

    const handleCheck = (e) => {
        const roomId = e.target.name
        const price = Number(e.target.value)
        const checked = e.target.checked
        setRoomNumber(
            checked?
            [...roomNumber, roomId]
            :
            roomNumber.filter((item) => item !== roomId)
        )
        setRoomPrice(
            checked?
            roomPrice + price
            :
            roomPrice - price
        )
    }

    const { datesList } = reservationDatesList(startdate, enddate)
    const [createOrderState, setCreateOrderState] = useState(false)
    const { order } = useCreateOrder('/api/v1/orders',orderData,createOrderState)

    const updatedReservationDates = async() => {
        try {
            await Promise.all(
                roomNumber.map((roomId) => {
                    const res = axios.put(`/api/v1/rooms/reservationdates/${roomId}`, {
                        dates: datesList,
                    })
                })
            )
        } catch (error) {
            console.log("上傳日期失敗")
        }
    }

    const isNotAvailableDate = (roomNumber) => {
        const isNotAvailable = roomNumber.unavailableDates.some((dates) => datesList.includes(new Date(dates).getTime()))
        return isNotAvailable
    }

    const handleSubmit = () => {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
            },
            buttonsStyling: false
          })

        try {
            const data = {
                ...orderData, 
                roomNumberId: roomNumber,
                totalPrice: roomPrice * days,
            }
            setOrderData(data)
            setCreateOrderState(true)
            updatedReservationDates()

            swalWithBootstrapButtons.fire({
                title: "訂房完成",
                icon: "success",
                showConfirmButton: false,
                timer: 3000,
            }).then(res => navigate("/"))
            // console.log(orderData)
        } catch (error) {
            console.log("上傳失敗")
        }
    }


  return (
    <div className='reservation'>
        <motion.div 
            className="container"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
            }}
        >
            <div className="reservationWrapper">
                <div className="reservationTitle">
                    <h2>空房情況</h2>
                    <h4 className='right'>
                        <span>{ dateRange } 入住{days}晚</span>
                        <span onClick={() => openSetting(false)}><AiFillCloseCircle /></span>
                    </h4>
                </div>
                <div className="reservationBody">
                    <div className="reservationRoomTitle">
                        <span>客房類型</span>
                        <span>適合人數</span>
                        <span>房型今日價格</span>
                        <span>住宿總價</span>
                        <span>選擇房型編號</span>
                    </div>
                    <div className="reservationRoomData">
                        <div className="roomColumn">
                            {
                               loading?
                               <div>載入中...</div>
                               : 
                                data?.map((room, i) => 
                                    <div className="roomInfo" key={i}>
                                        <span>{ room.title }<br /><p>{ room.desc }</p></span>
                                        <span>{ room.maxPeople }</span>
                                        <span>TWD { room.price?.toLocaleString() }</span>
                                        <span>TWD { (room.price * days)?.toLocaleString() }</span>
                                        <span>
                                            {
                                                room.roomNumbers.map((item, i) => 
                                                    <div key={i}>
                                                        <input 
                                                            type="checkbox" 
                                                            name={item._id} 
                                                            value={room.price} 
                                                            onChange={handleCheck}
                                                            disabled={isNotAvailableDate(item)} />
                                                        <label htmlFor="">{ item.number }</label>
                                                    </div>
                                                )
                                            }
                                        </span>
                                    </div>
                                )
                            }
                        </div>
                        <button className="reservationBtn" onClick={handleSubmit} disabled={roomNumber.length == 0}>現在預訂</button>
                    </div>
                </div>
            </div>
            {/* {
                createOrderState &&
                Swal.fire({
                    title: "訂房完成",
                    icon: "success"
                })
            } */}
        </motion.div>
    </div>
  )
}

export default Reservation