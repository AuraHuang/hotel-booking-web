import React, { useRef } from 'react'
import './listItem.scss'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

const ListItem = ({title, des, component, isScrollBtnShow}) => {
  const ref = useRef(null)
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset
    console.log(ref.current.scrollLeft)
  }

  return (
    <div className="list">
      <div className="listTitle">
        <h2>{ title }</h2>
        <p>{ des }</p>
      </div>
      <div className="listBody">
        {
            isScrollBtnShow? 
            <div className="scrollBtnGroup">
                <button className='scrollBtn' onClick={() => scroll(-1000)}><BsChevronLeft /></button>
                <button className='scrollBtn' onClick={() => scroll(1000)}><BsChevronRight /></button>
            </div>
            :
            <></>
        }
        <div className="listItems" ref={ref} >
          { component }
        </div>
      </div>
    </div>
  )
}

export default ListItem