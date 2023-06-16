import './App.css'
import { Protector } from "./helper";
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Profile from './pages/User/Profile'
import Register from './pages/Register'
import Foods from './pages/User/Foods';
import Orders from './pages/User/Orders';
import Stores from './pages/User/Stores';
import Histories from './pages/User/Histories';
import ListStore from './pages/User/ListStore';
import OrderDetail from './pages/User/OrderDetail';
import FoodOrder from './pages/User/FoodOrder';



function App() {

  return (
    <div>
      <Routes >
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<Register />} />
        <Route path="*" element={<p>404 not found</p>} />

        <Route path='stores/:id/foods' element={<Protector component={<Stores />} />} />
        <Route path='histories' element={<Protector component={<Histories />} />} />
        <Route path='stores' element={<Protector component={<ListStore />} />} />
        <Route path='profile' element={<Protector component={<Profile />} />} />
        <Route path='orders' element={<Protector component={<Orders />} />} />
        <Route path='stores/:id/foods/:id' element={<Protector component={<Foods />} />} />
        <Route path='orders/:id' element={<Protector component={<OrderDetail />} />} />
        <Route path='orders/:id/foods/:id' element={<Protector component={<FoodOrder />} />} />
      </Routes>
    </div>
  )
}

export default App
