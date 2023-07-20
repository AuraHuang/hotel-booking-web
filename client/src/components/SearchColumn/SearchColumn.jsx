import React, { useContext, useEffect, useState } from 'react'
import './searchColumn.scss'
import Calendar from '../../subcomponents/Calendar/Calendar'
import Conditions from '../../subcomponents/Conditions/Conditions';
import format from 'date-fns/format'
const SearchColumn = ({ searchData,searchsubmit }) => {

  const city = searchData.city
  const date = searchData.date
  const conditions = searchData.conditions

  const [ openCalendar, setOpenCalendar] = useState(false);
  const [ openConditions, setOpenConditions ] = useState(false);

  const [inputCity, setInputCity] = useState(city)
  const [inputDate, setInputDate] = useState(date)
  const [inputConditions, setInputConditions] = useState(conditions)
  const [inputLowestPrice, setLowestPrice] = useState(0)
  const [inputHighestPrice, setHighestPrice] = useState(9999)

  function handleChangeCity(e) {
    setInputCity(e.target.value)
  }

  function handleChangeLowestPrice(e) {
    setLowestPrice(e.target.value)
  }

  function handleChangeHighestPrice(e) {
    setHighestPrice(e.target.value)
  }

  function handleCalendar() {
    setOpenCalendar(!openCalendar)
    console.log(openCalendar)
  }

  function handleChangeDate(item) {
    // console.log(item)
    setInputDate([item.selection])
  }

  function handleCondition() {
    setOpenConditions(!openConditions)
  }
  
  function handleCounter(conditionType, calcSign) {
    console.log(inputConditions,conditionType, calcSign)
    setInputConditions(prev => {
      return {
        ...prev,
        [conditionType]: calcSign === "increase" ? inputConditions[conditionType] + 1 : inputConditions[conditionType] - 1
      }
    })
  }


  const handleSubmit = () => {
    // console.log(inputCity,inputDate,inputConditions)
    const data = { 
      city: inputCity,
      date: inputDate,
      conditions: inputConditions,
      lowestPrice: inputLowestPrice,
      highestPrice: inputHighestPrice
   }
    searchsubmit(data)
  }

  return (
    // <></>
    <div className='searchColumn'>
        <h2 className="searchTitle">搜尋</h2>
          <div className="searchItem">
            <label htmlFor="" className='searchLabel'>目的地/住宿名稱</label>
            <input type="Search" placeholder={city === "" ? '要去哪裡?' : city} className='searchInput' onChange={handleChangeCity} />
          </div>
          <div className="searchItem">
            <label htmlFor="" className='searchLabel'>入住/退房日期</label>
            <div onClick={handleCalendar}>
              <div className="searchText">
                { inputDate? format(inputDate[0].startDate, 'yyyy/MM/dd') : ''}
                 - 
                { inputDate? format(inputDate[0].endDate, 'yyyy/MM/dd') : ''}
              </div>
            </div>
            <div className='searchWinowPosition'>
              { openCalendar && 
                <Calendar 
                  changeEvent={handleChangeDate}
                  dateRange={inputDate}
                />
              }
            </div>
          </div>
          <div className="searchItem">
            <label htmlFor="" className='searchLabel'>每晚最低價格</label>
            <input type="number" className='searchInput' min="1" placeholder={inputLowestPrice} onChange={handleChangeLowestPrice}/>
            <label htmlFor="" className='searchLabel'>每晚最高價格</label>
            <input type="number" className='searchInput' min="1" placeholder={inputHighestPrice} onChange={handleChangeHighestPrice} />
            <div onClick={handleCondition}>
              <div className="searchText">
                { inputConditions? inputConditions['adult'] : 1 }位成人．
                { inputConditions? inputConditions['child'] : 0 }位小孩．
                { inputConditions? inputConditions['room'] : 1 }間房
              </div>
            </div>
            <div>
              {
                  openConditions &&
                  <Conditions 
                    conditionsProps={ inputConditions? inputConditions : {}}
                    counterEvent={handleCounter}
                  />
                }
            </div>
          </div>
          <button className='searchBtn' onClick={handleSubmit}>搜尋</button>
    </div>
  )
}

export default SearchColumn