import React from 'react';

const Footer = () => {
  return (
    <footer>
      <p>© {new Date().getFullYear()} Api Criptomonedas | Open Source</p>
      <p>Source: <a href="https://api.coincap.io/v2/assets">https://api.coincap.io/v2/assets</a></p>
      <p>Madrid, España</p>
    </footer>
  );
};

export default Footer;