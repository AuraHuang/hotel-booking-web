import React, { useState } from 'react'
import './searchColumn.scss'
import Calendar from '../../subcomponents/Calendar/Calendar'
import Conditions from '../../subcomponents/Conditions/Conditions';
import format from 'date-fns/format'

const SearchColumn = ({searchData}) => {

  console.log(searchData)

  const [ destination, setDestination] = useState(searchData?.destination);
  const [ dates, setDates ] = useState(searchData?.dates)
  const [ conditions, setConditions ] = useState(searchData?.conditions)

  const [ openCalendar, setOpenCalendar] = useState(false);
  const [ openConditions, setOpenConditions ] = useState(false);

  function handleChangeDes(e) {
    console.log(e.target.value)
    setDestination(e.target.value)
  }

  function handleCalendar() {
    setOpenCalendar(!openCalendar)
    console.log(openCalendar)
  }

  function handleChangeDate(item) {
    setDates([item.selection])
  }

  function handleCondition() {
    setOpenConditions(!openConditions)
  }

  function handleCounter(conditionType, calcSign) {
    setConditions(prev => {
      return {
        ...prev,
        [conditionType]: calcSign === "increase" ? conditions[conditionType] + 1 : conditions[conditionType] - 1
      }
    })
  }

  return (
    <div className='searchColumn'>
        <h2 className="searchTitle">搜尋</h2>
          <div className="searchItem">
            <label htmlFor="" className='searchLabel'>目的地/住宿名稱</label>
            <input type="Search" placeholder={destination === '' ? '要去哪裡？' : destination} className='searchInput' onChange={handleChangeDes}/>
          </div>
          <div className="searchItem">
            <label htmlFor="" className='searchLabel'>入住/退房日期</label>
            <div onClick={handleCalendar}>
              <div className="searchText">
                { format(dates[0].startDate, 'yyyy/MM/dd')} - { format(dates[0].endDate, 'yyyy/MM/dd')}
              </div>
            </div>
            <div className='searchWinowPosition'>
              { openCalendar && 
                <Calendar 
                  changeEvent={handleChangeDate}
                  dateRange={dates}
                />
              }
            </div>
          </div>
          <div className="searchItem">
            <label htmlFor="" className='searchLabel'>每晚最低價格</label>
            <input type="number" className='searchInput' min="1" placeholder='3000'/>
            <label htmlFor="" className='searchLabel'>每晚最高價格</label>
            <input type="number" className='searchInput' min="1" placeholder='10000' />
            <div onClick={handleCondition}>
              <div className="searchText">{ conditions['adult'] }位成人．{ conditions['child'] }位小孩．{ conditions['room'] }間房</div>
            </div>
            <div>
              {
                  openConditions &&
                  <Conditions 
                    conditionsProps={conditions}
                    counterEvent={handleCounter}
                  />
                }
            </div>
          </div>
          <button className='searchBtn'>搜尋</button>
    </div>
  )
}

export default SearchColumn