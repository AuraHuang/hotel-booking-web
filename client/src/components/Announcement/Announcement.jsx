import React from 'react'
import './announcement.scss'
import { BiInfoCircle } from 'react-icons/bi'

const Announcement = ({type}) => {
  return (
    <div className='announcement'>
        <div className="container">
            {
                type === "upper section" ?
                <>
                    <div className="check">
                        <input type="checkbox" className="checktext" />
                        <label htmlFor="">此為差旅行程</label>
                    </div>
                    <div className="infoDes">
                        <div><BiInfoCircle /></div>
                        <span>
                            獲得所需建議。在出發之前，查看最新的新冠肺炎(COVID-19)相關限制。
                            <a href='#'>了解更多 →</a>
                        </span>
                    </div>
                    <div className="discountInfos">
                        <div className="discountInfo_s1">
                            <div className="left" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=480&q=80")` }}></div>
                            <div className="right">
                                <h2>省15%或更多</h2>
                                <p>這個夏天，讓夢想之旅成真！2022年9月30日前預訂並住房就可省一筆</p>
                                <button>逛逛優惠</button>
                            </div>
                        </div>
                        <div className="discountInfo_s2">
                            <div className="left" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=480&q=80")` }}></div>
                            <div className="right">
                                <h2>省15%或更多</h2>
                                <p>這個夏天，讓夢想之旅成真！2022年9月30日前預訂並住房就可省一筆</p>
                                <button>逛逛優惠</button>
                            </div>
                        </div>
                    </div>
                </>
                :
                <>
                    <div className="discountInfos">
                        <div className="discountInfo">
                            <div className="left" style={{ backgroundImage: `url("https://img.freepik.com/premium-vector/genius-logo-design-with-lamp-letter-g-concept-premium-vector_475443-399.jpg?w=2000")` }}></div>
                            <div className="right">
                                <h2>優惠立即享</h2>
                                <p>登入您的Booking帳戶，尋找Genius圖標，輕鬆省一筆</p>
                                <button>登入</button>
                                <button className='notDecorate'>註冊</button>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    </div>
  )
}

export default Announcement