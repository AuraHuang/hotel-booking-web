import React from 'react'
import './postCards.scss'
import PostCard from './PostCard'
const PostCards = ({dataArray}) => {

  // useEffect(() => {
  //   console.log(Attractions)
  // },[])

  return (
    <div className='postCards'>
        <div className="line">
          <PostCard dataArray={dataArray.slice(0,2)} />
        </div>
        <div className="line">
          <PostCard dataArray={dataArray.slice(2,5)} />
        </div>
    </div>
  )
}

export default PostCards