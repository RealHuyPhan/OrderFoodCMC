import './App.css'
import { Protector } from "./helper";
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import FoodDetail from './pages/User/FoodDetail'
import FoodStore from './pages/User/FoodStore'
import HistoryOrder from './pages/User/HistoryOrder'
import ListFood from './pages/User/ListFood'
import Profile from './pages/User/Profile'
import ListOrder from './pages/User/ListOrder'
import Register from './pages/Register'


function App() {

  return (
    <div>
      <Routes >
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<Register />} />
        <Route path="*" element={<p>404 not found</p>} />

        <Route path='detail-food' element={<Protector component={<FoodDetail />} />} />
        <Route path='store' element={<Protector component={<FoodStore />} />} />
        <Route path='history-order' element={<Protector component={<HistoryOrder />} />} />
        <Route path='list-food' element={<Protector component={<ListFood />} />} />
        <Route path='profile' element={<Protector component={<Profile />} />} />
        <Route path='list-order' element={<Protector component={<ListOrder />} />} />

      </Routes>
    </div>
  )
}

export default App
