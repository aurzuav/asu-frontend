import React, { useState, useContext, useEffect } from 'react';
import './Mesa.css'
import Card from './Card'
import MazoPrincipal from './MazoPrincipal'
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';

function Mesa(props) {
  const { cartas, mazoPrincipal, basura } = props
  const { token } = useContext(AuthContext);
  const [robar, setrobar] = useState(true);
  const [botar, setbotar] = useState(false);
  const [mano, setMano] = useState(cartas);

  useEffect(() => {
    setMano(cartas);
  }, [cartas]);
  const handleClickCard = async (carta) => {
    console.log('Carta clickeada:', carta);
    if (botar){
    try {
      const ConfigBotar = {
        'method': 'patch',
        'url': `${import.meta.env.VITE_BACKEND_URL}/mazos/botar`,
        'headers': {
          'Authorization': `Bearer ${token}`
        },
        'data': {
          "carta_id": carta.id,
        }
      };

      const botarResponse = await axios(ConfigBotar).then((response) => response.data);
      console.log('botar', botarResponse);
      const updatedMano = mano.filter((c) => c.id !== carta.id);
      setMano(updatedMano);
      setbotar(false)
      setrobar(false)
    } catch (error) {
      console.log(error)
    }
  }};
  const handleClickMazo = async () => {
    if(robar){
    console.log('mazo clickeada:');
    try {
      const ConfigRobar = {
        'method': 'patch',
        'url': `${import.meta.env.VITE_BACKEND_URL}/mazos/robar`,
        'headers': {
          'Authorization': `Bearer ${token}`
        },
        'data': {
          "mazo_id": 1,
        }
      };

      const robarResponse = await axios(ConfigRobar).then((response) => response.data);
      console.log('robar', robarResponse);
      setrobar(false)
      setbotar(true)
      const ConfigCartas = {
        'method': 'get',
        'url': `${import.meta.env.VITE_BACKEND_URL}/mazos/${mano[0].mazo_id}/cartas`,
        'headers': {
          'Authorization': `Bearer ${token}`
        }
      };

      const cartasResponse = await axios(ConfigCartas).then((response) => response.data);
      console.log('cartas', cartasResponse.cartas);
      setMano(cartasResponse.cartas)
    } catch (error) {
      console.log(error)
    }}
  };

  return (
    <div className="mesa">
      <div className="mazo" onClick={() => handleClickMazo()} >
        <MazoPrincipal imagen={"https://raw.githubusercontent.com/hayeah/playing-cards-assets/master/png/back.png"} />
      </div>
      <div className="mano">
        {console.log(mano)}
        {Array.from(Array(mano.length).keys()).map((index) => (
          <div key={index} onClick={() => handleClickCard(mano[index])}>
            <Card carta={mano[index]} />
          </div>
        ))}
      </div>
    </div>

  )
}

export default Mesa
