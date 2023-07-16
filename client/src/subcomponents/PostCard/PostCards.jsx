import React from 'react'
import './postCards.scss'
import PostCard from './PostCard'
import { Attractions } from '../../data'

const PostCards = () => {

  // useEffect(() => {
  //   console.log(Attractions)
  // },[])

  return (
    <div className='postCards'>
        <div className="line">
          <PostCard dataArray={Attractions.slice(0,2)} />
        </div>
        <div className="line">
          <PostCard dataArray={Attractions.slice(2,5)} />
        </div>
    </div>
  )
}

export default PostCards