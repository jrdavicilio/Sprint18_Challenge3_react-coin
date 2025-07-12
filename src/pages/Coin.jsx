import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Coin() {
  const { id } = useParams()
  const [coin, setCoin] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/assets/${id}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    })
      .then(res => res.json())
      .then(data => setCoin(data.data))
  }, [id])

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || []
    setIsFavorite(favs.includes(id))
  }, [id])

  const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || []
    const updated = isFavorite
      ? favs.filter(f => f !== id)
      : [...favs, id]
    localStorage.setItem('favorites', JSON.stringify(updated))
    setIsFavorite(!isFavorite)
  }

  if (!coin) return <p>Cargando...</p>

  return (
    <div>
      <h1>{coin.name}</h1>
      <p>Precio: ${Number(coin.priceUsd).toFixed(2)}</p>
      <p>Rank: {coin.rank}</p>
      <p>Market Cap: ${Number(coin.marketCapUsd).toFixed(0)}</p>
      <button onClick={toggleFavorite}>
        {isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      </button>
    </div>
  )
}
