import React, { useContext, useEffect, useRef, useState } from 'react'
import './hotel.scss'
import Navbar from '../../components/Navbar/Navbar'
import { MdGroups2, MdLocationOn, MdSmokeFree, MdClose } from 'react-icons/md'
import { BiBookmarkHeart, BiWifi, BiSolidChevronLeft, BiSolidChevronRight } from 'react-icons/bi'
import { photos } from '../../data'
import { gsap } from "gsap";
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { LoginContext } from '../../context/LoginContext'
import Footer from '../../components/Footer/Footer'
import Reservation from '../../components/Reservation/Reservation'
import moment from 'moment'
import { countDateAndPrice } from '../../../datesCalculate'

const Hotel = () => {

  let comments = useRef(null)
  const params = useParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const startdate = moment(searchParams.get('startdate')).toDate()
  const enddate = moment(searchParams.get('enddate')).toDate()
  const options = {
    adult : searchParams.get('adult'),
    child : searchParams.get('child'),
    room : searchParams.get('room'),
  }

  const [openSlider, setOpenSlider] = useState(false)
  const [sliderIndex, setSliderIndex] = useState(0)
  const { loading, data, error } = useFetch(`/api/v1/hotels/find/${params.id}`)
  const [openReservation, setOpenReservation] = useState(false)
  const { days, totalHotelPrice } = countDateAndPrice(startdate,enddate,data.cheapestPrice)

  const { user } = useContext(LoginContext)

  const dateTypeChange = (date) => {
    const result = moment(moment(date).toDate()).format('YYYY/MM/DD')
    return result
  }

  const dateRangeString = `${ dateTypeChange(searchParams.get('startdate')) } - ${ dateTypeChange(searchParams.get('enddate')) }`

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
    // console.log(index)
    setOpenSlider(true)
    setSliderIndex(index)
  }

  function changeSlider(direction) { 
    const lastSliderIndex = data.photos.length - 1

    if ( direction == "right" ) {
      sliderIndex == lastSliderIndex ? setSliderIndex(lastSliderIndex) : setSliderIndex(sliderIndex + 1)
    } else if ( direction == "left" ) {
      sliderIndex == 0 ? setSliderIndex(0) : setSliderIndex(sliderIndex - 1)
    }
  }

  const handleReservation = () => {
    if (user) {
      setOpenReservation(true)
    } else {
      navigate('/login')
    }
    // console.log(user, openReservation)
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
                <h2>{ data.name }</h2>
                <button className='sliderCloseBtn' onClick={() => setOpenSlider(false)}>
                  <span>關閉</span>
                  <MdClose />
                </button>
              </div>
              <div className="sliderBody">
                <span className='sliderBtn' onClick={() => changeSlider("left")}><BiSolidChevronLeft /></span>
                {/* <div className='sliderImg' style={{ backgroundImage: `url("${photos[0].src}")` }}></div> */}
                <div className="sliderImg"><img src={data.photos[`${sliderIndex}`]} alt="" /></div>
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
                <span className="hotelType">{ data.type }</span>
                <span className="hotelName">{ data.name }</span>
                <span className="hotelTag"><MdGroups2 /><span>推薦四人住宿</span></span>
                <div className="address">
                  <MdLocationOn />
                  { data.address }
                  <a href="" className='map'>地理位址超棒-顯示地圖</a>
                </div>
              </div>
              <div className="hotelTitleRight">
                <button className='bookingBtn' onClick={handleReservation}>現在就預訂</button>
                <div className='bookingTag'>
                  <BiBookmarkHeart />
                  <span>買貴退差價</span>
                </div>
              </div>
            </div>
            <div className="hotelImgWrapper">
              <div className="popupComment" onMouseEnter={e => handleHover(e)} onMouseOut={e => handleHoverExit(e)}>
                <div className="commentInfo" onMouseEnter={e => handleHover(e)} ref={e => (comments = e)}>
                  <button className='commentRate'>{ data.rating }</button>
                  <span className="commentLevel">
                    <div>{ data.rating > 9.5 ? "棒極了" : "傑出" }</div>
                    <div>{ data.comments?.toLocaleString() }則評論</div>
                  </span>
                </div>
              </div>
              <div className="hotelImg">
                {
                  data.photos?.slice(0,6)?.map((item, index) => 
                    index >= 5 ?
                    <div className="img" style={{ backgroundImage: `url("${item}")`}} key={index}>
                      <div className="more" onClick={() => handleClickSlider(index)}>{ data.photos.length > 6 ? `+${ data.photos.length - 6 }張照片` : "觀看更多" }</div>
                    </div>
                    :
                    <div className="img" style={{ backgroundImage: `url("${item}")`}} key={index} onClick={() => handleClickSlider(index)}></div>
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
                  <p className="specialDates">
                    {
                      days == 0 ? 
                      '請選擇住宿日期'
                      :
                      dateRangeString
                    }
                  </p>
                  <div className="specialContent">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi dolor deleniti perferendis architecto dolorum iure mollitia quo similique.
                  </div>
                  <div className="desPrice">
                    TWD { days == 0 ? data.cheapestPrice?.toLocaleString() : totalHotelPrice.toLocaleString()}
                  </div>
                  <div className="desBookingBtn" onClick={handleReservation}>現在就預定</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {
        openReservation && 
        <Reservation 
          openSetting={setOpenReservation} 
          hotelId={data._id} 
          startdate={startdate}
          enddate={enddate}
          dateRange={dateRangeString} 
          days={days} 
          options={options}
        />
      }
    </>
  )
}

export default Hotel