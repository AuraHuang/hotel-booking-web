import './App.scss'
import Home from './pages/Home/Home'
import HotelsList from './pages/HotelsList/HotelsList'
import Hotel from './pages/Hotel/Hotel'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn/SignIn'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/hotelslist' element={<HotelsList />}></Route>
          <Route path='/hotel/:id' element={<Hotel />}></Route>
          <Route path='/login' element={<SignIn />}></Route>
          <Route path='/register' element={<SignIn />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
