import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Favorites() {
  const [coins, setCoins] = useState([])
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || []
    setFavorites(favs)

    fetch(`${import.meta.env.VITE_API_URL}/assets`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        const filtered = data.data.filter(coin => favs.includes(coin.id))
        setCoins(filtered)
      })
  }, [])

  if (favorites.length === 0) return <p>No tienes favoritos</p>

  return (
    <div>
      <h1>Favoritos</h1>
      <ul>
        {coins.map(coin => (
          <li key={coin.id}>
            <Link to={`/coin/${coin.id}`}>
              {coin.name} - ${Number(coin.priceUsd).toFixed(2)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
