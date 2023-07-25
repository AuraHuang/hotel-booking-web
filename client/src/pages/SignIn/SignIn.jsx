import React, { useContext, useEffect } from 'react'
import './signIn.scss'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import axios from 'axios'
import { useState } from 'react'
import { LoginContext } from '../../context/LoginContext'
import { login_success,login_failure, start_login } from '../../constants/actionTypes'

const SignIn = () => {
    const location = useLocation()
    const navigate = useNavigate()
    
    
    const [registererror, setRegisterError] = useState("")
    const [registerData, setRegisterData] = useState({
        username: undefined,
        email: undefined,
        password: undefined
    })
    const [checkPwd, setCheckPwd] = useState({
        checkPwd: undefined
    })
    const [registerloading, setRegisterLoading] = useState(false)

    const {loading, error: signInError, dispatch} = useContext(LoginContext)
    const [loginData, setLoginData] = useState({
        account: undefined,
        password: undefined
    })


    useEffect(() => {
        if (registerData.password !== checkPwd.checkPwd) {
            setRegisterError("密碼輸入不一致")
        } else {
            setRegisterError("")
        }
    }, [checkPwd])


    const handleRegisterChange = (e) => {
        // console.log(e.target.id,e.target.value)
        setRegisterData(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleCheckPwd = (e) => {
        setCheckPwd( prev => ({...prev, [e.target.id]: e.target.value}) )
    }

    const handleRegisterClick = async(e) => {
        e.preventDefault()
        setRegisterLoading(true)
        // console.log(registerloading)
        try {
            const res = await axios.post("/api/v1/auth/register", registerData)
            navigate("/login", res)
            console.log(res)
        } catch(error) {
            console.log(error)
            setRegisterError(error.response.data.message)
        }
        setRegisterLoading(false)
        // console.log(registerloading)
    }

    const handleLoginChange = (e) => {
        // console.log(e.target.id, e.target.value)
        setLoginData(prev => ({...prev, [e.target.id]: e.target.value}))
    }

    const handleLoginClick = async(e) => {
        e.preventDefault()
        dispatch({type: start_login})
        try {
            const res = await axios.post("/api/v1/auth/login", loginData)
            dispatch({type: login_success, payload: res.data.userDetails})
            navigate(-1)
        } catch(error) {
            dispatch({type: login_failure, payload: error.response.data.message})
        }
    }



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
                        <input type="text" placeholder='帳號' id="account" onChange={handleLoginChange} />
                        <input type="password" placeholder='密碼' id="password" onChange={handleLoginChange} />
                        <button className="submit" onClick={handleLoginClick} >登入</button>
                        <div>忘記密碼？</div>
                        <Link to='/register'><div>註冊 & 創建一個帳號</div></Link>
                        { signInError && <span style={{ color: 'red', fontWeight: 'bold' }}>{ signInError }</span>}
                    </div>
                    :
                    <div className='signInBody'>
                        <input type="text" placeholder='新帳號' id="username" onChange={handleRegisterChange} style={ registererror === "帳號或信箱已註冊" ? { border: "2px solid red" } : { border: 'none' }} />
                        <input type="email" placeholder='新Email' id="email" onChange={handleRegisterChange} style={ registererror === "帳號或信箱已註冊" ? { border: "2px solid red" } : { border: 'none' }} />
                        <input type="password" placeholder='新密碼' id="password" onChange={handleRegisterChange} style={ registererror === "密碼輸入不一致" ? { border: "2px solid red" } : { border: 'none' }} />
                        <input type="password" placeholder='確認密碼' id="checkPwd" onChange={handleCheckPwd} style={ registererror === "密碼輸入不一致" ? { border: "2px solid red" } : { border: 'none' }} />
                        <button className="submit" onClick={handleRegisterClick}>註冊</button>
                        <Link to='/login'><div>已有帳號？按這裡登入</div></Link>
                        { registererror && <span style={{ color: 'red', fontWeight: 'bold' }}>{ registererror }</span>}
                    </div>
                } 
            </div>         
        </div>    
    </>
  )
}

export default SignIn