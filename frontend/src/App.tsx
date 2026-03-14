import { BrowserRouter as Router, Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import { ToastContainer } from "react-toastify"
import Log from './components/home/logIn/Log'

function App() {

  return (
    <div className="App">
      <Router>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<div className='flex bg-red-500 justify-center items-center h-screen'> TEST </div>} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/login' element={<Log/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
