import React from 'react'
import './popularHotels.scss'
import { Link } from 'react-router-dom'
import Skeleton from '../../components/Skeleton/Skeleton'

const PopularHotels = ({dataArray, loading}) => {
  // const isloading = true
  return (
    <>
      { 
        loading? <><Skeleton type={"popularHotel"} length={dataArray.length} /></>
        :
        dataArray.map((item, index) => {
          return (
              <Link className='popularHotel' to={`hotel/${item._id}`} key={index}>
                <div className="popularHotelImg" style={{ backgroundImage: `url("${ item.photos }")` }}></div>
                <div className="popularHotelTitle">{ item.name }</div>
                <div className="popularHotelSubtitle">{ item.city }</div>
                <div className="popularHotelAmount">TWD { item.cheapestPrice.toLocaleString() }</div>
                <div className="popularHotelRate">
                    <span className="popularHotelScore">{ item.rating }</span>
                    <span className="popularHotelLevel">{ item.rating >= 9.5? "好極了" : "傑出" }．</span>
                    <span className="popularHotelComments">{ item.comments }則評論</span>
                </div>
              </Link>
          )
        })
        
      }
    </>
  )
}

export default PopularHotels