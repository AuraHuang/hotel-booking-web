import React, { useRef, useState } from 'react'
import './hotel.scss'
import Navbar from '../../components/Navbar/Navbar'
import { MdGroups2, MdLocationOn, MdSmokeFree, MdClose } from 'react-icons/md'
import { BiBookmarkHeart, BiWifi, BiSolidChevronLeft, BiSolidChevronRight } from 'react-icons/bi'
import { photos } from '../../data'
import { gsap } from "gsap";

const Hotel = () => {

  let comments = useRef(null)
  const [openSlider, setOpenSlider] = useState(false)
  const [sliderIndex, setSliderIndex] = useState(0)
  
  function handleHover(e) {
    gsap.to(comments, {
      css: {
        display: "flex",
        opacity: 1,
      },
      ease: "power3.inOut"
    })
  }

  function handleHoverExit(e) {
    gsap.to(comments, {
      css: {
        display: "none",
        opacity: 0,
      },
      ease: "power3.inOut"
    })
  }

  function handleClickSlider(index) {
    console.log(index)
    setOpenSlider(true)
    setSliderIndex(index)
  }

  function changeSlider(direction) { 
    const lastSliderIndex = photos.length - 1

    if ( direction == "right" ) {
      sliderIndex == lastSliderIndex ? setSliderIndex(lastSliderIndex) : setSliderIndex(sliderIndex + 1)
    } else if ( direction == "left" ) {
      sliderIndex == 0 ? setSliderIndex(0) : setSliderIndex(sliderIndex - 1)
    }
  }

  return (
    <>
      <Navbar />

      {
        openSlider &&
        <div className="slider">
          <div className="container">
            <div className="sliderWrapper">
              <div className="sliderTitle">
                <h2>台南微醺文旅</h2>
                <button className='sliderCloseBtn' onClick={() => setOpenSlider(false)}>
                  <span>關閉</span>
                  <MdClose />
                </button>
              </div>
              <div className="sliderBody">
                <span className='sliderBtn' onClick={() => changeSlider("left")}><BiSolidChevronLeft /></span>
                {/* <div className='sliderImg' style={{ backgroundImage: `url("${photos[0].src}")` }}></div> */}
                <div className="sliderImg"><img src={photos[`${sliderIndex}`].src} alt="" /></div>
                <span className='sliderBtn' onClick={() => changeSlider("right")}><BiSolidChevronRight /></span>
              </div>
            </div>
          </div>
        </div>
      }
      <div className="container">
        <div className="hotel">
          <ul className="hotelHeader">
            <li>資訊 & 房價</li>
            <li>設施</li>
            <li>訂房須知</li>
            <li>房客評價</li>
          </ul>
          <div className="hotelBody">
            <div className="hotelTitle">
              <div className="hotelTitleLeft">
                <span className="hotelType">飯店</span>
                <span className="hotelName">台南微醺文旅</span>
                <span className="hotelTag"><MdGroups2 /><span>推薦四人住宿</span></span>
                <div className="address">
                  <MdLocationOn />
                  台南中西區No. 28 Dade Street
                  <a href="" className='map'>地理位址超棒-顯示地圖</a>
                </div>
              </div>
              <div className="hotelTitleRight">
                <button className='bookingBtn'>現在就預訂</button>
                <div className='bookingTag'>
                  <BiBookmarkHeart />
                  <span>買貴退差價</span>
                </div>
              </div>
            </div>
            <div className="hotelImgWrapper">
              <div className="popupComment" onMouseEnter={e => handleHover(e)} onMouseOut={e => handleHoverExit(e)}>
                <div className="commentInfo" onMouseEnter={e => handleHover(e)} ref={e => (comments = e)}>
                  <button className='commentRate'>9.5</button>
                  <span className="commentLevel">
                    <div>傑出</div>
                    <div>1223則評論</div>
                  </span>
                </div>
              </div>
              <div className="hotelImg">
                {
                  photos.slice(0,6).map((item, index) => 
                    index >= 5 ?
                    <div className="img" style={{ backgroundImage: `url("${item.src}")`}} key={index}>
                      <div className="more" onClick={() => handleClickSlider(index)}>{ photos.length > 6 ? `+${ photos.length - 6 }張照片` : "觀看更多" }</div>
                    </div>
                    :
                    <div className="img" style={{ backgroundImage: `url("${item.src}")`}} key={index} onClick={() => handleClickSlider(index)}></div>
                  )
                }
              </div>
            </div>
            <div className="hotelDes">
              <div className="desLeft">
                <div className="desContent">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi laudantium quo et quaerat quos non, nesciunt impedit! Et soluta modi praesentium laudantium tempore. Ullam commodi, sit voluptatum omnis perspiciatis placeat!</div>
                <div className="desFacility">
                  <h2 className="facilityTitle">熱門設施</h2>
                  <div className="facilityItem">
                    <BiWifi />
                    <span className="facilityName">免費Wifi</span>
                  </div>
                  <div className="facilityItem">
                    <MdSmokeFree />
                    <span className="facilityName">禁菸客房</span>
                  </div>
                </div>
              </div>
              <div className="desRight">
                <div className="desSpecial">
                  <h3 className="specialTitle">住宿特色</h3>
                  <div className="specialContent">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi dolor deleniti perferendis architecto dolorum iure mollitia quo similique.
                  </div>
                  <div className="desPrice">
                    TWD 6,240
                  </div>
                  <div className="desBookingBtn">現在就預定</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hotel