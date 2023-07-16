import React from 'react'
import './postCard.scss'

const PostCard = ({dataArray}) => {

  // useEffect(() => {
  //   console.log(dataArray)
  // },[])

  return (
    <>
      {
        dataArray.map((item, index) => 
          {
            return (
              <div className='postCard' key={index}>
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