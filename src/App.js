import NavBar from './components/NavBar'
import { Routes, Route } from 'react-router-dom'
import './App.css'

const App = () => {
  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route />
          <Route />
          <Route />
          <Route />
        </Routes>
      </main>
    </div>
  )
}

export default App
