import React, { useState, useEffect } from 'react';
import Nav from '../common/Nav'
import './How.css'
import Mesa from '../game/Mesa';
import Card from '../game/Card';


function How() {
  const [viewIndex, setViewIndex] = useState(0);
  const views = [
     <div className='box'> <p>Al entrar a una partida, te van a dar 12 cartas y va a haber un mazo central. 
      En base al objetivo de ese juego, que será informado previamente, debes recolectar las cartas que te convengan.
      Cuando sea tu turno, Puedes a hacer click sobre el mazo central para recoger una carta al azar o puedes
      sacar la carta que botó el jugador anterior. </p> <Mesa/> </div>,
      <div className='box'> <p> Una vez que veas tu nueva carta, debes elegir cual botar ya que nunca puedes tener más de 
      12 cartas en la mano. Haz click sobre la carta que quieras botar y será desechada, ojo que tu oponente podría
      tomarla.  </p> <div className="new-card"><Card/></div>  <Mesa/> </div>
  ]
  function handleButton (accion){
      const siguiente = (viewIndex +1)%views.length;
      setViewIndex(siguiente)
  }
  return (
    <>
    <Nav/>
    <h1>Intrucciones</h1>
    {views[viewIndex]}
    <div className="botones">
    <button onClick={handleButton}>Siguiente</button>
    </div>
   
    </>

  )
}

export default How
