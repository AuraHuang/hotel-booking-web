import React from 'react'
import './signIn.scss'
import { useLocation, Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'

const SignIn = () => {
    const location = useLocation()
    console.log(location)

  return (
    <>
        <Navbar type={"auth"} />
        <div className="signIn">
            <div className='signInSec'>
                <div className="signInBtn">
                    <Link to='/login' className={ location.pathname == '/login' ? 'active' : '' }><h2>登入或建立帳戶</h2></Link>
                    <Link to='/register' className={ location.pathname == '/register' ? 'active' : '' }><h2>註冊帳戶</h2></Link>
                </div>
                {
                    location.pathname == '/login' ? 
                    
                    <div className='signInBody'>
                        <input type="text" placeholder='帳號' />
                        <input type="password" placeholder='密碼' />
                        <button className="submit">登入</button>
                        <div>忘記密碼？</div>
                        <Link to='/register'><div>註冊 & 創建一個帳號</div></Link>
                    </div>
                    :
                    <div className='signInBody'>
                        <input type="text" placeholder='新帳號' />
                        <input type="password" placeholder='新密碼' />
                        <input type="password" placeholder='確認密碼' />
                        <button className="submit">註冊</button>
                        <Link to='/login'><div>已有帳號？按這裡登入</div></Link>
                    </div>
                } 
            </div>         
        </div>    
    </>
  )
}

export default SignIn