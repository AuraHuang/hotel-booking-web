import React from 'react'
import './categories.scss'
import useFetch from '../../hooks/useFetch'
import Skeleton from '../../components/Skeleton/Skeleton'

const Categories = ({dataArray,url}) => {

  const {data, loading, error} = useFetch(url)
  // console.log(data)
  
  // const isloading = true
  return (
    <>
      {
        dataArray.map((item, index) => 
          {
            return (
              <div className="cateItem" key={index}>
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