import { useEffect, useState } from "react";

export default function Home() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
      .then(res => res.json())
      .then(data => {
        const sliced = data.slice(0, 10);
        setCoins(sliced);
      })
      .catch(err => console.error("Error al obtener los datos:", err));
  }, []);

  return (
    <div>
      <h1>Top 10 Criptomonedas</h1>
      <ul>
        {coins.map(coin => (
          <li key={coin.id}>
            <img src={coin.image} alt={coin.name} width={25} /> {coin.name} - ${coin.current_price}
          </li>
        ))}
      </ul>
    </div>
  );
}

