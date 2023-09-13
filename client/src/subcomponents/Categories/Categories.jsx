import React from 'react'
import './categories.scss'
import useFetch from '../../hooks/useFetch'
import Skeleton from '../../components/Skeleton/Skeleton'
import { createSearchParams, useNavigate } from 'react-router-dom'
import format from 'date-fns/format'

const Categories = ({dataArray,url}) => {

  const {data, loading, error} = useFetch(url)
  // console.log(data)

  const initStartDate = new Date()
  const initEndDate = new Date()
  initEndDate.setDate(initEndDate.getDate() + 1)

  const navigate = useNavigate()

  function handleClick() {
    
    navigate({ 
      pathname: "/hotelslist",
      search: createSearchParams({
        city: '',
        startdate: format(initStartDate, 'yyyyMMdd'),
        enddate: format(initEndDate, 'yyyyMMdd'),
        adult: 1,
        child: 0,
        room: 1,
      }).toString()
    })
  }
  
  // const isloading = true
  return (
    <>
      {
        dataArray.map((item, index) => 
          {
            return (
              <div className="cateItem" key={index} onClick={handleClick}>
                  <div className="itemImg" style={{ backgroundImage: `url('${ item.img }')` }}></div>
                  <div className="info">
                    <div className="title">{ item.name }</div>
                    <div className="desc">{ loading? <Skeleton type={"amount"}/> : `${data[index]}間住宿` }</div>
                  </div>
              </div>
            )
          }
        )
      }    
    </>
  )
}

export default Categories