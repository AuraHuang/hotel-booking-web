import React from 'react'
import './home.scss'
import Navbar from '../../components/Navbar/Navbar'
import Header from '../../components/Header/Header'
import Announcement from '../../components/Announcement/Announcement'
import Feature from '../../components/Feature/Feature'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      <Header />
      <Announcement type={"upper section"}/>
      <Feature />
      <Announcement type={"lower section"} />
      <Footer />
    </div>
  )
}

export default Home