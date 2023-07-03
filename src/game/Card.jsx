import React from 'react'
import './Card.css'

function Card(props) {
  const {carta} = props
  const rank = carta.rank
  const suit = carta.suit
  const imagen = carta.imagen
  return (
    <div>
      <img src={imagen} alt={`${rank} de ${suit}`} />
    </div>
  )
}

export default Card
