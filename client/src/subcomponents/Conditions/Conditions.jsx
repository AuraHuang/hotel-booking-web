import React, { useEffect } from 'react'
import './conditions.scss'

const Conditions = ({conditionsProps, counterEvent}) => {

  // useEffect(() => {
  //   console.log(conditionsProps, counterEvent)
  // }, [])

  return (
    <>
      <div className="conditions">
        <div className="condition">
          <span>成人</span>
          <div className="conditionCounter">
            <button className='conditionCounterBtn' onClick={() => counterEvent('adult','decrease')} disabled={ conditionsProps['adult'] <= 1}>－</button>
            <span className="number">{ conditionsProps['adult'] }</span>
            <button className='conditionCounterBtn' onClick={() => counterEvent('adult','increase')}>＋</button>
          </div>
        </div>
        <div className="condition">
          <span>小孩<p>0－17歲</p></span>
          <div className="conditionCounter">
            <button className='conditionCounterBtn' onClick={() => counterEvent('child','decrease')} disabled={ conditionsProps['child'] <= 0}>－</button>
            <span className="number">{ conditionsProps['child'] }</span>
            <button className='conditionCounterBtn' onClick={() => counterEvent('child','increase')}>＋</button>
          </div>
        </div>
        <div className="condition">
          <span>房間</span>
          <div className="conditionCounter">
            <button className='conditionCounterBtn' onClick={() => counterEvent('room','decrease')} disabled={ conditionsProps['room'] <= 1}>－</button>
            <span className="number">{ conditionsProps['room'] }</span>
            <button className='conditionCounterBtn' onClick={() => counterEvent('room','increase')}>＋</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Conditions