import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';


function Coins() {
    
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchCoin = async () => {
      setLoading(true);
      setError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await fetch(`https://api.coincap.io/v2/assets/${id}`);
        if (!response.ok) throw new Error(`Error:${response.status}`);
        const data = await response.json();
        setCoin({
            name: data.data.name,
            symbol: data.data.symbol,
            supply: data.data.supply,
            maxSupply: data.data.maxSupply,
            marketCapUsd: data.data.marketCapUsd,
            volumeUsd24Hr: data.data.volumeUsd24Hr,
            priceUsd: data.data.priceUsd,
            changePercent24Hr: data.data.changePercent24Hr,
            vwap24Hr: data.data.vwap24Hr,
            explorer: data.data.explorer
        });
      } catch (err) {
        setError(err.message);
        setCoin(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCoin();
  }, [id]); 

  const addFavorite = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('cryptoID')) || [];
    if (!savedFavorites.includes(id)) {
      savedFavorites.push(id);
      localStorage.setItem('cryptoID', JSON.stringify(savedFavorites))
      alert("Item added successfully!");
    }
  };
  
  return (
    <>     
    <h2>Coin Info:</h2>
    <div className="center">  
      {loading && <p>Cargando...</p>}
      {error && <p className="error">{error}</p>}
      
      {coin && (
        <div className="coin-card">
        <h3>{coin.name}</h3>
        <ul className="coin-info">
          <li>Symbol: {coin.symbol}</li>
          <li>Supply: {coin.supply}</li>
          <li>Max Supply: {coin.maxSupply}</li>
          <li>Market Cap: {coin.marketCapUsd}</li>
          <li>24h Volume: {coin.volumeUsd24Hr}</li>
          <li>Price: ${coin.priceUsd}</li>
          <li>24h Change: {coin.changePercent24Hr}%</li>
          <li>VWAP (24h): {coin.vwap24Hr}</li>
          <li>
            <a href={coin.explorer} target="_blank">
              Explorer
            </a>
          </li>
          <button onClick={addFavorite}>Agregar a Favoritos</button>
        </ul>
        </div>
      )}
      </div>
    </>
  );
}
export default Coins;