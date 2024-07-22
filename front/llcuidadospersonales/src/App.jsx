import './App.css'
import Footer from './components/primary/Footer'
import Navbar from './components/primary/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './views/Home/Home'
import MyAppointments from './views/MyAppointments/MyAppointments'
import Register from './views/Register/Register'
import Login from './views/Login/Login'
import SheduleAppointment from './components/primary/SheduleAppointment'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/appointments' element={<MyAppointments />}></Route>
        <Route path='appointments/shedule' element={<SheduleAppointment />}></Route>

        <Route path='/users/login' element={<Login />}></Route>
        <Route path='/users/register' element={<Register />}></Route>

      </Routes>
      <Footer />
    </>
  )
}

export default App
