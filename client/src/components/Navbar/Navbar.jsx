import React, { useContext, useEffect } from 'react'
import './navbar.scss'
import { BiBed, BiCar, BiTaxi } from 'react-icons/bi'
import { BsAirplane } from 'react-icons/bs'
import { MdOutlineAttractions } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { LoginContext } from '../../context/LoginContext'
import { logout } from '../../constants/actionTypes'

const Navbar = ({type}) => {
  const { user, dispatch } = useContext(LoginContext)

  const handleClick = (e) => {
    dispatch({ type: logout })
  }

  return (
    <div className={`navbar ${type}`}>
      <div className='container'>
        <div className='lineOne'>
          <div className='left'>
            <Link to="/" className='logo'>Booking</Link>
          </div>
          <div className='right'>
            <button className='navButton navButtonFlag' />
            <button className='navButton navButtonNotif'>使用webpack帳號</button>
              {
                type == "auth" ? 
                <></>
                :
                <>
                {
                  user? 
                  <>
                  <span className='username'>{ user.username }，您好</span>
                  <button className='navButton' onClick={handleClick}>登出</button>
                  </>
                  :
                  <>
                  <Link to="/register"><button className='navButton'>註冊</button></Link>
                  <Link to="/login"><button className='navButton'>登入</button></Link>
                  </>
                }
                </>
              }
          </div>
        </div>
        { 
          type == "auth" ? 
          <></>
          :
          <div className='lineTwo'>
            <div className='item active'>
              <BiBed />
              <span>住宿</span>
            </div>
            <div className='item'>
              <BsAirplane />
              <span>航班</span>
            </div>
            <div className='item'>
              <BiCar />
              <span>租車</span>
            </div>
            <div className='item'>
              <MdOutlineAttractions />
              <span>景點/活動</span>
            </div>
            <div className='item'>
              <BiTaxi />
              <span>機場/計程車</span>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar