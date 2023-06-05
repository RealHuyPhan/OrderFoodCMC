import './App.css'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import FoodDetail from './pages/User/FoodDetail'
import FoodStore from './pages/User/FoodStore'
import HistoryOrder from './pages/User/HistoryOrder'
import ListFood from './pages/User/ListFood'
import Profile from './pages/User/Profile'
import ListOrder from './pages/User/ListOrder'


function App() {

  return (
    <div>
      <Routes >
        <Route path='/' element={<LandingPage />} />
        <Route path='detail-food' element={<FoodDetail />} />
        <Route path='store' element={<FoodStore />} />
        <Route path='history-order' element={<HistoryOrder />} />
        <Route path='list-food' element={<ListFood />} />
        <Route path='profile' element={<Profile />} />
        <Route path='list-order' element={<ListOrder />} />
      </Routes>
    </div>
  )
}

export default App
