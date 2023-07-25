import React, { useEffect } from 'react'
import './resultItem.scss'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { countDateAndPrice } from '../../../datesCalculate.js'
import moment from 'moment'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const ResultItem = ({ active, dataDetail, searchParams }) => {
  // console.log(searchParams.get('options'))
  const navigate = useNavigate()

  const startdate = moment(searchParams.get('startdate')).toDate()
  const endate = moment(searchParams.get('enddate')).toDate()
  const adult = searchParams.get('adult')
  const child = searchParams.get('child')
  const room = searchParams.get('room')

  const { days, totalHotelPrice } = countDateAndPrice(startdate,endate,dataDetail.cheapestPrice)
  // console.log(days, totalHotelPrice)

  const handleClickHotel = () => {
    navigate({
      pathname: `/hotel/${dataDetail._id}`,
      search: createSearchParams(searchParams).toString()
    })
  }

  const ItemTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#F5544A',
      padding: 10,
    },
  }));

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
                  <p>{ days==0? `請選擇住宿日期`: `總共${days}晚` }</p>
                  <p>{adult}位大人{ child > 0? `、${child}位小孩` : '' }</p>
                </span>
                <span className="price">
                  TWD { days==0? dataDetail.cheapestPrice.toLocaleString() : totalHotelPrice.toLocaleString() }
                </span>
                <span className="tax">
                  含稅費與其他費用
                </span>
                {
                  days == 0 ?
                  <ItemTooltip title="請先輸入住宿日期，並按左側 搜尋 查看結果" followCursor>
                    <span><button className='btn' onClick={handleClickHotel} disabled>查看客房供應情況</button></span>
                  </ItemTooltip>
                  :
                  <button className='btn' onClick={handleClickHotel}>查看客房供應情況</button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultItem