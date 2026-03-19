import { BrowserRouter as Router, Routes, Route } from 'react-router'
import HomePage from './features/home/pages/HomePage'
import { ToastContainer } from "react-toastify"
import Log from './features/auth/pages/Log'
import SignUp from './features/auth/components/SignUp'
import ForgetPassword from './features/auth/pages/ForgetPassword'
import { Otp } from './features/auth/pages/Otp'
import NewPass from './features/auth/pages/NewPass'
function App() {

  return (
    <div className="App">
      <Router>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<div className='flex bg-red-500 justify-center items-center h-screen'> TEST </div>} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/login' element={<Log />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forget' element={<ForgetPassword />} />
          <Route path='/otp' element={<Otp />} />
          <Route path='/newpass' element={<NewPass />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
