import React from 'react'
import './skeleton.scss'

const Skeleton = ({type, length}) => {

    const number = length

    const PopularHotelSkeleton = ({i}) => {
        return <>
            <div className='popularHotelSK' key={i}>
                <div className="imgSK"></div>
                <div className="titleSK"></div>
                <div className="subtitleSK"></div>
                <div className="amountSK"></div>
                <div className="rateSK">
                    <span className="scoreSK"></span>
                    <span className="levelSK"></span>
                    <span className="commentsSK"></span>
                </div>
            </div>
        </>
    }

    const AmountSkeleton = () => {
        return <>
            <div className='amountSK'></div>
        </>
    }

    if (type === "popularHotel" )
    return Array(number).fill().map((item, i) => <PopularHotelSkeleton key={i}/>)
    
    if (type === "amount" )
    return <AmountSkeleton />

}

export default Skeleton