import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Coins from './pages/Coins';
import Favorites from './pages/Favorites';

function CriptoRoutes() {
    return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coin/:id" element={<Coins />} />
          <Route path="/favorites" element={<Favorites />} /> 
        </Routes>
    );
  }
  export default CriptoRoutes;