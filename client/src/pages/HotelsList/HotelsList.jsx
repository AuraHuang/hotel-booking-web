import React, { useContext, useEffect, useState } from 'react'
import './hotelslist.scss'
import Navbar from '../../components/Navbar/Navbar'
import ResultItem from '../../components/ResultItem/ResultItem'
import SearchColumn from '../../components/SearchColumn/SearchColumn'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { new_options } from '../../constants/actionTypes'
import { OptionsContext } from '../../context/OptionsContext'
import moment from 'moment'
import Skeleton from '../../components/Skeleton/Skeleton'

const HotelsList = () => {

  const location = useLocation()
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  
  const [conditions,setConditions] = useState({
    city: searchParams.get('city')?? '',
    date: [
      {
        startDate: moment(searchParams.get('startdate')).toDate(),
        //stringToDate(),
        endDate: moment(searchParams.get('enddate')).toDate(),
        // stringToDate(),
        key: 'selection',
      }
    ]?? {},
    conditions: {
      adult: Number(searchParams.get('adult'))?? 1,
      child: Number(searchParams.get('child'))?? 0,
      room: Number(searchParams.get('room'))?? 1,
    },
    lowestPrice: 0,
    highestPrice: 9999,
  })
  // console.log(conditions)
  // const destination = location.state?.destination
  // const dates = location.state?.dates
  // const conditions = location.state?.conditions

  const [fetchDataUrl, setFetchDataUrl] = useState(`/api/v1/hotels?${ conditions.city? "city=" + conditions.city : "popularHotel=true" }&lowestPrice=${conditions.lowestPrice}&highestPrice=${conditions.highestPrice}`)
  const { loading, data, error }  = useFetch(fetchDataUrl)
  const { dispatch } = useContext(OptionsContext)

  const searchsubmit = (data) => {
    const { city, date, conditions, lowestPrice, highestPrice } = data
    dispatch({ type: new_options, payload: { city: city, dates: date, options: conditions }})
    setConditions({
      city: city,
      date: date,
      conditions: conditions,
      lowestPrice: lowestPrice,
      highestPrice: highestPrice,
    })
    setSearchParams({
      city: city,
      startdate: moment(date[0].startDate).format('YYYYMMDD'),
      enddate: moment(date[0].endDate).format('YYYYMMDD'),
      adult: conditions['adult'],
      child: conditions['child'],
      room: conditions['room'],
      lowestprice: lowestPrice,
      highestprice: highestPrice,
    })
    setFetchDataUrl(`/api/v1/hotels?${ city? "city=" + city : "popularHotel=true&"}&lowestPrice=${lowestPrice}&highestPrice=${highestPrice}`)
  }

  return (
    <>
      <Navbar />
      <div className='container'>
      <div className="hotelsList">
        <div className="listSearch">
          <SearchColumn 
            searchData={conditions}
            searchsubmit={searchsubmit}
          />
        </div>
        <div className="listResult">
          {
            loading?
            <Skeleton type={"resultItem"} length={data.length}/>
            :
            <>
              <div className="resultTitle">
                <h2 className="title">在{ conditions.city }找到{data.length}間房間</h2>
                <div className="map"></div>
              </div>
              {
                data.map((item, index) => 
                  <ResultItem 
                    active={index==0 && "active"}
                    key={item._id}
                    dataDetail={item}
                    conditions={conditions.conditions}
                    dates={conditions.dates}
                  />
                )
              }
            </>
          }
        </div>
      </div>
    </div>
    </>
  )
}

export default HotelsList