import React from 'react'
import './hotelslist.scss'
import Navbar from '../../components/Navbar/Navbar'
import ResultItem from '../../components/ResultItem/ResultItem'
import SearchColumn from '../../components/SearchColumn/SearchColumn'
import { useLocation } from 'react-router-dom'

const HotelsList = () => {

  const location = useLocation()
  const destination = location.state?.destination
  const dates = location.state?.dates
  const conditions = location.state?.conditions

  return (
    <>
      <Navbar />
      <div className='container'>
      <div className="hotelsList">
        <div className="listSearch">
          <SearchColumn searchData={{destination,dates,conditions}} />
        </div>
        <div className="listResult">
          <ResultItem />
        </div>
      </div>
    </div>
    </>
  )
}

export default HotelsList