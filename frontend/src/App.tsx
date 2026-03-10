import { BrowserRouter as Router, Routes, Route } from 'react-router'
function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<div className='flex bg-red-500 justify-center items-center h-screen'> TEST </div>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
