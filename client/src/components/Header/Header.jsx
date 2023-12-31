import { useState, useRef, useEffect } from 'react'
import './header.scss'
import Calendar from '../../subcomponents/Calendar/Calendar'
import Conditions from '../../subcomponents/Conditions/Conditions'
import { BsCalendar4, BsPeople } from 'react-icons/bs'
import { GrLocation } from 'react-icons/gr'
import format from 'date-fns/format'
import { createSearchParams, useNavigate } from 'react-router-dom'

const Header = () => {

  // console.log(city, date, options)
  const ref = useRef(null)
  const initStartDate = new Date()
  const initEndDate = new Date()
  initEndDate.setDate(initEndDate.getDate() + 1)
  const [ destination, setDestination] = useState('');
  const [ openCalendar, setOpenCalendar] = useState(false);
  const [ calendarDates, setCalendarDates ] = useState([
    {
      startDate: initStartDate,
      endDate: initEndDate,
      key: 'selection',
    }
  ])
  const [ conditions, setConditions ] = useState({
    adult: 1,
    child: 0,
    room: 1,
  })
  const [ openConditions, setOpenConditions ] = useState(false);

  const navigate = useNavigate()

  function handleChangeDes(e) {
    // console.log(e.target.value)
    setDestination(e.target.value)
  }

  function handleCalendar() {
    setOpenCalendar(!openCalendar)
    // console.log(openCalendar)
  }

  function handleChangeDate(item) {
    setCalendarDates([item.selection])
    if (item.selection.startDate !== item.selection.endDate) {
      setOpenCalendar(false)
    }
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

  function handleSearchBarSubmit() {
    // console.log(destination, calendarDates, conditions)
    navigate({ 
      pathname: "/hotelslist",
      search: createSearchParams({
        city: destination,
        startdate: format(calendarDates[0].startDate, 'yyyyMMdd'),
        enddate: format(calendarDates[0].endDate, 'yyyyMMdd'),
        adult: conditions['adult'],
        child: conditions['child'],
        room: conditions['room'],
      }).toString()
    })
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenConditions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

  }, [openConditions])

  return (
    <div className='header'>
      <div className="container">
        <h1 className='headerTitle'>尋找下趟住宿</h1>
        <div className='headerDes'>搜尋飯店、民宿及其他住宿類型的優惠...<br />
          Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
        </div>
        <div className='headerSearchBar'>
          <div className="searchItem">
            <GrLocation />
            <input type="Search" placeholder={destination === '' ? '你要去哪裡？' : destination} className='searchInput' onChange={handleChangeDes}/>
          </div>
          <div className="searchItem">
            <div onClick={handleCalendar}>
              <BsCalendar4 />
              <span className="searchText">
                { format(calendarDates[0].startDate, 'yyyy/MM/dd')} - { format(calendarDates[0].endDate, 'yyyy/MM/dd')}
              </span>
            </div>
            <div className='searchWinowPosition'>
              { openCalendar && 
                <Calendar 
                  changeEvent={handleChangeDate}
                  dateRange={calendarDates}
                />
              }
            </div>
          </div>
          <div className="searchItem" ref={ref}>
            <div onClick={handleCondition}>
              <BsPeople />
              <span className="searchText">{ conditions['adult'] }位成人．{ conditions['child'] }位小孩．{ conditions['room'] }間房</span>
            </div>
            <div className='searchWinowPosition'>
              {
                openConditions &&
                <Conditions 
                  conditionsProps={conditions}
                  counterEvent={handleCounter}
                />
              }
            </div>
          </div>
          <button className='searchBarBtn' onClick={handleSearchBarSubmit}>搜尋</button>
        </div>
      </div>
    </div>
  )
}

export default Header