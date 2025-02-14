import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import Coin from './Coin'

function App() {

  const [ coins, setCoins ] = useState([]);
  const [ search, setSearch ] = useState('');

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=pln&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then((res) => {
      setCoins(res.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);

  const handleChange = (event) => {
    setSearch(event.target.value);
  }

  const filteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">
          Search a currency
        </h1>
        <form>
          <input type="text" className="coin-input" placeholder="Search" onChange={handleChange}/>
        </form>
      </div>
      {filteredCoins.map((coin) => (
        <Coin key={coin.id} name={coin.name} image={coin.image} symbol={coin.symbol} price={coin.current_price} marketCap={coin.market_cap} priceChange={coin.price_change_percentage_24h} volume={coin.total_volume}/>
        ))}
    </div>
  );
}

export default App;
