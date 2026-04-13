import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import Cart from './components/Cart'
import GetInTouch from './components/GetInTouch'
import Profile from './components/Profile'
import Service from './components/Service'
import OrderSuccess from './components/OrderSuccess'
import CheckoutPage from './components/CheckoutPage'
import Footer from './components/Footer'
import { CartProvider } from './components/Cartcontext'

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
          <Navbar />
          <div style={{ flex: 1, width: '100%' }}>
            <Routes>
              <Route path="/"              element={<Hero />} />
              <Route path="/gallery"       element={<Gallery />} />
              <Route path="/services"      element={<Service />} />
              <Route path="/cart"          element={<Cart />} />
              <Route path="/checkout"      element={<CheckoutPage />} />
              <Route path="/contact"       element={<GetInTouch />} />
              <Route path="/profile"       element={<Profile />} />
              <Route path="/order-success" element={<OrderSuccess />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App