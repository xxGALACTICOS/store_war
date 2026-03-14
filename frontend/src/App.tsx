import { BrowserRouter as Router, Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<div className='flex bg-red-500 justify-center items-center h-screen'> TEST </div>} />
          <Route path='/home' element={<HomePage />} />
          <Route path="/product/:name" element={<ProductPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
