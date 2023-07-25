import React, { useContext, useEffect, useState } from 'react'
import './hotelslist.scss'
import Navbar from '../../components/Navbar/Navbar'
import ResultItem from '../../components/ResultItem/ResultItem'
import SearchColumn from '../../components/SearchColumn/SearchColumn'
import { useSearchParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import moment from 'moment'
import Skeleton from '../../components/Skeleton/Skeleton'
import Footer from '../../components/Footer/Footer'

const HotelsList = () => {

  // const { city, dates, options, lowestPrice, highestPrice, dispatch } = useContext(OptionsContext)
  const [searchParams, setSearchParams] = useSearchParams()
  const [conditions,setConditions] = useState({
    city: searchParams.get('city')?? '',
    dates: [
      {
        startDate: moment(searchParams.get('startdate')).toDate(),
        endDate: moment(searchParams.get('enddate')).toDate(),
        key: 'selection',
      }
    ]?? [{}],
    options: {
      adult: Number(searchParams.get('adult'))?? 1,
      child: Number(searchParams.get('child'))?? 0,
      room: Number(searchParams.get('room'))?? 1,
    }
  })

  const [fetchDataUrl, setFetchDataUrl] = useState(`/api/v1/hotels?${ conditions.city? "city=" + conditions.city : "popularHotel=true" }`) 
  const { loading, data, error }  = useFetch(fetchDataUrl)

  useEffect(() => {  
    setFetchDataUrl(`/api/v1/hotels?${ conditions.city? "city=" + conditions.city : "popularHotel=true" }${ conditions.lowestPrice? "&lowestPrice=" + conditions.lowestPrice : ''}${ conditions.lowestPrice? "&highestPrice=" + conditions.highestPrice : ''}`)
    setSearchParams({
      city: conditions.city,
      startdate: moment(conditions.dates[0].startDate).format('YYYYMMDD'),
      enddate: moment(conditions.dates[0].endDate).format('YYYYMMDD'),
      adult: conditions.options['adult'],
      child: conditions.options['child'],
      room: conditions.options['room'],
      lowestPrice: conditions.lowestPrice?? '',
      highestPrice: conditions.highestPrice?? '',
    })
  },[conditions])

  return (
    <>
      <Navbar />
      <div className='container'>
      <div className="hotelsList">
        <div className="listSearch">
          <SearchColumn 
            conditions={conditions}
            searchsubmit={setConditions}
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
                    searchParams={searchParams}
                  />
                )
              }
            </>
          }
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default HotelsList