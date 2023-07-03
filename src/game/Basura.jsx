import React from 'react'
import './Card.css'

function MazoPrincipal(props) {
  const {imagen} = props
  return (
    <div>
      <img src={imagen} alt={"Mazo Principal"} />
    </div>
  )
}

export default MazoPrincipal
