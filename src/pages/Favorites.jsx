import { useState, useEffect } from "react";

const Favorites = () => {
    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = localStorage.getItem('cryptoID');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });
      
    const [coinData, setCoinData] = useState([]);

    const fetchCoin = async (id) => {
        try {

          const response = await fetch(`https://api.coincap.io/v2/assets/${id}`);
          if (!response.ok) throw new Error(`Error:${response.status}`);
          const data = await response.json();
          
          return {
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
          }
        } catch (err) {
          console.error(err)
        }
    };

    const fetchAllCoins = async () => {
        setCoinData([]);
        for (let i = 0; i < favorites.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 1000)); 
            const coin = await fetchCoin(favorites[i]);
            if (coin) setCoinData(prevData => [...prevData, coin]);
        }
    };

    useEffect(() => {
        fetchAllCoins();
        console.log(favorites)
        console.log(localStorage)
    }, [favorites]); 

    const handleEliminate = (index) => {
        const updatedFavorites = [...favorites]
        updatedFavorites.splice(index, 1);
        
        localStorage.setItem('cryptoID', JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
    };

    return (
    <>
    <h1>Favorites Coins</h1>
    <div className="center">  
    {coinData && coinData.map((coin, index) => (
        <div key={index} className="coin-card">
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
                <button onClick={() => handleEliminate(index)}>Eliminar de Favoritos</button>
            </ul>
      </div>
    ))}
    </div>
    </>
    );
}

export default Favorites; 