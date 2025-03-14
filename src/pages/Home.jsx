import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Home() {

  const [coinHome, setCoinHome] = useState([]); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const response = await fetch(`https://api.coincap.io/v2/assets/`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        setCoinHome(data.data); 
      } catch (err) {
        setError(err.message);
        setCoinHome([]); 
      }
    };
    fetchHome();
  }, []);

  
  return (
    <>
      <h1>Lista de monedas</h1>
      {error && <p className="error">{error}</p>}
      <ul className="lista-home">
        {coinHome.map((moneda) => (
          <li key={moneda.id}>
            <Link to={`/coin/${moneda.id}`}>{moneda.name}</Link> 
          </li>
        ))}
      </ul>
    </>
  );
}
export default Home;