import { BrowserRouter as Router, Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
<<<<<<< Updated upstream
import { ToastContainer } from "react-toastify"
import Log from './components/home/logIn/Log'
import SignUp from './components/home/logIn/SignUp'
=======
import ForgetPassword from './pages/ForgetPassword'
import { Otp } from './pages/Otp'
>>>>>>> Stashed changes
function App() {

  return (
    <div className="App">
      <Router>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<div className='flex bg-red-500 justify-center items-center h-screen'> TEST </div>} />
          <Route path='/home' element={<HomePage />} />
<<<<<<< Updated upstream
          <Route path='/login' element={<Log />} />
          <Route path='/signup' element={<SignUp />} />

=======
          <Route path='/forget' element={<ForgetPassword />} />
          <Route path='/otp' element={<Otp />} />
>>>>>>> Stashed changes
        </Routes>
      </Router>
    </div>
  )
}

export default App
