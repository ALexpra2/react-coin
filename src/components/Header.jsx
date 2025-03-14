import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  
    return (
        <>
        <h1>Cripto Api Render</h1>
        <nav>
            <ul className='navList'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/favorites'>Favorites</Link></li>
            </ul>
        </nav>
        </>

    );
}

export default Header;