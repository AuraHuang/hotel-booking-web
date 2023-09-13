import React from 'react'
import './postCard.scss'
import { createSearchParams, useNavigate } from 'react-router-dom'
import format from 'date-fns/format'

const PostCard = ({dataArray}) => {

  const initStartDate = new Date()
  const initEndDate = new Date()
  initEndDate.setDate(initEndDate.getDate() + 1)

  const navigate = useNavigate()

  function handleClick(city) {
    
    navigate({ 
      pathname: "/hotelslist",
      search: createSearchParams({
        city: city,
        startdate: format(initStartDate, 'yyyyMMdd'),
        enddate: format(initEndDate, 'yyyyMMdd'),
        adult: 1,
        child: 0,
        room: 1,
      }).toString()
    })
  }

  return (
    <>
      {
        dataArray.map((item, index) => 
          {
            return (
              <div className='postCard' key={index} onClick={() => handleClick(item.name)}>
                <div className="postImg" style={{ backgroundImage: `url("${ item.img }")`}}></div>
                <div className="postInfo">
                  <h2 className="postTitle">{ item.name }</h2>
                  <div className="postFlag" style={{ backgroundImage: `url("${ item.flag }")`}}></div>
                  <div className="postDesc">{ item.amount }</div> 
                </div>
              </div>
            )
          }
        )
      }
    </>
  )
}

export default PostCard