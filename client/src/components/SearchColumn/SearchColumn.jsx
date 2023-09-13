import { useRef, useEffect, useState } from 'react'
import './searchColumn.scss'
import Calendar from '../../subcomponents/Calendar/Calendar'
import Conditions from '../../subcomponents/Conditions/Conditions';
import format from 'date-fns/format'
// import { OptionsContext } from '../../context/OptionsContext';
// import moment from 'moment';
const SearchColumn = ({conditions,searchsubmit}) => {
  // console.log(conditions)

  const ref = useRef(null)
  const [ openCalendar, setOpenCalendar] = useState(false);
  const [ openConditions, setOpenConditions ] = useState(false);

  const [inputCity, setInputCity] = useState(conditions.city)
  const [inputDate, setInputDate] = useState(conditions.dates)
  const [inputConditions, setInputConditions] = useState(conditions.options)
  const [inputLowestPrice, setLowestPrice] = useState(conditions.lowestPrice)
  const [inputHighestPrice, setHighestPrice] = useState(conditions.highestPrice)
  
  function handleCounter(conditionType, calcSign) {
    // console.log(inputConditions,conditionType, calcSign)
    setInputConditions(prev => {
      return {
        ...prev,
        [conditionType]: calcSign === "increase" ? inputConditions[conditionType] + 1 : inputConditions[conditionType] - 1
      }
    })
  }
  
  function handleChangeDate(item) {
    setInputDate([item.selection])
    if (item.selection.startDate !== item.selection.endDate) {
      setOpenCalendar(false)
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenConditions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

  }, [openConditions])

  const handleSubmit = () => {
    // console.log(inputCity,inputDate,inputConditions)
    const data = { 
      city: inputCity,
      dates: inputDate,
      options: inputConditions,
      lowestPrice: inputLowestPrice,
      highestPrice: inputHighestPrice
    }
    // console.log(data)
    searchsubmit(data)
  }

  return (
    // <></>
    <div className='searchColumn'>
        <h2 className="searchTitle">搜尋</h2>
          <div className="searchItem">
            <label htmlFor="" className='searchLabel'>目的地/住宿名稱</label>
            <input type="Search" placeholder={inputCity === "" ? '要去哪裡?' : inputCity} className='searchInput' onChange={(e) => setInputCity(e.target.value)} />
          </div>
          <div className="searchItem" ref={ref}>
            <label htmlFor="" className='searchLabel'>入住/退房日期</label>
            <div onClick={() => setOpenCalendar(!openCalendar)}>
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
            <input type="number" className='searchInput' min="1" placeholder={inputLowestPrice?? 0} onChange={(e) => setLowestPrice(e.target.value)}/>
            <label htmlFor="" className='searchLabel'>每晚最高價格</label>
            <input type="number" className='searchInput' min="1" placeholder={inputHighestPrice?? 99999} onChange={(e) => setHighestPrice(e.target.value)} />
            <div ref={ref}>
              <div onClick={() => setOpenConditions(!openConditions)}>
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
          </div>
          <button className='searchBtn' onClick={handleSubmit}>搜尋</button>
    </div>
  )
}

export default SearchColumn