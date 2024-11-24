import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Home from './components/pages/Home.jsx'
import Contact from './components/pages/Contact.jsx'
import About from './components/pages/About.jsx'
import Login from './components/pages/Login.jsx'
import Signup from './components/pages/Signup.jsx'
import Userdash from './components/pages/Userdash.jsx'
import Sellerdash from './components/pages/Sellerdash.jsx'
import Uploadprescription from './components/pages/Uploadprescription.jsx'
import Payment from './components/pages/Payment.jsx'
import Cart from './components/pages/Cart.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="contact" element={<Contact/>}/>
          <Route path="about" element={<About/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="signup" element= {<Signup/>}/>
          <Route path="userDash" element={<Userdash/>}/>
          <Route path="sellerDash" element={<Sellerdash/>}/>
          <Route path="uploadPrescription" element={<Uploadprescription/>}/>
          <Route path="payment" element={<Payment/>}/>
          <Route path="cart" element={<Cart/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
