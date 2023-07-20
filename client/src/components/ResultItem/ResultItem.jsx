import React from 'react'
import './resultItem.scss'
import { Link } from 'react-router-dom'

const ResultItem = ({ active, dataDetail, conditions, dates }) => {
  // console.log(dataDetail)
  return (
    <div className='result'>
      <div className='resultItem'>
        <div className="itemImg" style={{ background: `url("${dataDetail.photos[0]}")` }}></div>
        <div className="itemInfo">
          <div className="infoTitle">
            <h2 className="title">{ dataDetail.name }</h2>
            <div className="rate">
              <div className="rateLeft">
                <div className="level">{ dataDetail.rating < 9.5 ? "傑出" : "極致好評" }</div>
                <div className="comments">{ dataDetail.comments.toLocaleString() }則評論</div>
              </div>
              <button className="rateRight">{ dataDetail.rating }</button>
            </div>
          </div>
          <div className="infoDes">
            <div className="location">
              <span className="far">{ dataDetail.distance }</span>
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
                  TWD { dataDetail.cheapestPrice.toLocaleString() }
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