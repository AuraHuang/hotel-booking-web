import React from 'react'
import './calendar.scss'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import * as locales from 'react-date-range/dist/locale'
import { DateRange } from 'react-date-range'

const Calendar = ({changeEvent, dateRange}) => {
  return (
    <>
      <DateRange 
        editableDateInputs={true}
        onChange={changeEvent}
        moveRangeOnFirstSelection={false}
        className='calendar'
        minDate={new Date()}
        ranges={dateRange}
        locale={locales['zhTW']}
      /> 
    </>
  )
}

export default Calendar