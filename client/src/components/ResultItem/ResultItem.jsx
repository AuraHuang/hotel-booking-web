import React from 'react'
import './resultItem.scss'
import { Link } from 'react-router-dom'

const ResultItem = () => {
  return (
    <div className='result'>
      <div className="resultTitle">
        <h2 className="title">在台北找到505間房間</h2>
        <div className="map"></div>
      </div>
      <div className='resultItem'>
        <div className="itemImg" style={{ background: `url("https://cf.bstatic.com/xdata/images/hotel/square600/347072190.webp?k=74cb5ec7f0ef6a6b424dca16d22b2e0b62c5438fbeef2e9f56bed64167dddbad&o=&s=1")` }}></div>
        <div className="itemInfo">
          <div className="infoTitle">
            <h2 className="title">台南微醺文旅|老宅古城 漫遊體驗</h2>
            <div className="rate">
              <div className="rateLeft">
                <div className="level">傑出</div>
                <div className="comments">1223則評論</div>
              </div>
              <button className="rateRight">9.5</button>
            </div>
          </div>
          <div className="infoDes">
            <div className="location">
              <span className="far">中西區 台南 400公尺遠</span>
              <span className="discount">免費專機接送</span>
            </div>
            <div className="infoDetail">
              <div className="detailLeft">
                <div className="equipment">
                  <b>標準單人房－附共用衛浴</b>
                  <p>一張單人床</p>
                </div>
                <div className="detailDes">
                  <b>免費取消</b>
                  <p>立即搶下優惠價－可取消</p>
                  <b>此價格的客房在本站僅剩 1 間</b>
                </div>
              </div>
              <div className="detailRight">
                <span className="optionDes">
                  五晚、1位
                </span>
                <span className="price">
                  TWD 4534
                </span>
                <span className="tax">
                  含稅費與其他費用
                </span>
                <Link to="/hotel/id123">
                  <button className='btn'>查看客房供應情況</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultItem