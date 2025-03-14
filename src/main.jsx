import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import CriptoRoutes from './Routes.jsx'
import './main.css'
import Footer from '../src/components/Footer.jsx'
import Header from '../src/components/Header.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Header />
      <CriptoRoutes />
      <Footer />
    </Router>
  </React.StrictMode>,
)