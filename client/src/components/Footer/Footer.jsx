import React from 'react'
import './footer.scss'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer_s1">
            <div className="container">
                <div className="subscribe">
                    <h2>省時又省錢</h2>
                    <p>現在訂餐，我們將寄送最佳訂購優惠給您。</p>
                    <input type="email" name="" id="" placeholder='您的電子郵件'/>
                    <button>訂閱！</button>
                </div>
                <div className="sendCheck">
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">請發送Booking免費App下載連結給我！</label>
                </div>
            </div>
        </div>
        <div className="footer_s2">
            <div className="footerContainer">
                <button>將您的住宿註冊上線</button>
            </div>
        </div>
        <div className="footer_s3">
            <div className="footerContainer">
                <ul>
                    <li><a href="">手機板</a></li>
                    <li><a href="">您的帳戶</a></li>
                    <li><a href="">線上修改訂單</a></li>
                    <li><a href="">客服支援</a></li>
                    <li><a href="">加入聯盟行銷</a></li>
                    <li><a href="">Booking企業差旅服務</a></li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Footer