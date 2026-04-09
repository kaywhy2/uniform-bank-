import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import BrewNavbar from './components/navbar'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import Cart from './components/cart'
import GetInTouch from './components/GetInTouch'
import Profile from './components/profile'
import Service from './components/service'
import OrderSuccess from './components/OrderSuccess'   // ← add this
import { CartProvider } from './components/Cartcontext'

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <BrewNavbar />
        <Routes>
          <Route path="/"              element={<Hero />} />
          <Route path="/gallery"       element={<Gallery />} />
          <Route path="/services"      element={<Service />} />
          <Route path="/cart"          element={<Cart />} />
          <Route path="/contact"       element={<GetInTouch />} />
          <Route path="/profile"       element={<Profile />} />
          <Route path="/order-success" element={<OrderSuccess />} />  {/* ← add this */}
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App