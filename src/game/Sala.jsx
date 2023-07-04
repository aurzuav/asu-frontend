import React, { useState, useContext, useEffect } from 'react';
import Mesa from './Mesa';
import Card from './Card';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import { AuthContext } from '../auth/AuthContext';
import API_URL from '../config';


function Sala() {
  const { token } = useContext(AuthContext);
  const location = useLocation();
  let gameId = location.state.gameId;
  const decodedToken = jwt_decode(token);
  const userId = parseInt(decodedToken.sub);

  const [player, setPlayer] = useState({});
  const [tablero, settablero] = useState()
  const [mazo, setmazo] = useState([]);
  const [cartas, setcartas] = useState([]);
  const [mazoPrincipal, setMazoPrincipal] = useState([]);
  const [basura, setBasura] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const configPlayerCreate = {
          'method': 'post',
          'url': `${API_URL}/players/create`,
          'headers': {
            'Authorization': `Bearer ${token}`
          },
          'data': {
            'userId': userId,
            'gameId': gameId,
          }
        };
  
        const playerResponse = await axios(configPlayerCreate).then((response) => response.data);
        setPlayer(playerResponse);
        console.log(playerResponse);
  
        const configTablesCreate = {
          'method': 'post',
          'url': `${API_URL}/tables/create`,
          'headers': {
            'Authorization': `Bearer ${token}`
          },
          'data': {
            'playerId': playerResponse.id,
            'gameId': gameId,
          }
        };
  
        const tablesResponse = await axios(configTablesCreate).then((response) => response.data);
        settablero(tablesResponse);
        console.log(tablesResponse);
  
        const configMazosCreate = {
          'method': 'post',
          'url': `${API_URL}/mazos/create`,
          'headers': {
            'Authorization': `Bearer ${token}`
          },
          'data': {
            'playerId': playerResponse.id,
            'mazo_central': 1,
            'mazo_basura': 2,
          }
        };
  
        const mazosResponse = await axios(configMazosCreate).then((response) => response.data);
        setmazo(mazosResponse);
        console.log(mazosResponse);
        console.log(mazosResponse.id);
        const configMazoRepartir = {
          'method': 'patch',
          'url': `${API_URL}/mazos/repartir`,
          'headers': {
            'Authorization': `Bearer ${token}`
          },
          'data': {
            "mazo_origen_id": 1,
            "mazo_destino_id": mazosResponse.id
          }
        };
  
        await axios(configMazoRepartir).then((response) => console.log(response.data));
  
        const ConfigCartas = {
          'method': 'get',
          'url': `${API_URL}/mazos/${mazosResponse.id}/cartas`,
          'headers': {
            'Authorization': `Bearer ${token}`
          }
        };
  
        const cartasResponse = await axios(ConfigCartas).then((response) => response.data);
        console.log('cartas', cartasResponse);
        setcartas(cartasResponse.cartas)

        const ConfigMazoPrincipal = {
          'method': 'get',
          'url': `${API_URL}/mazos/${1}/cartas`,
          'headers': {
            'Authorization': `Bearer ${token}`
          }
        };
  
        const mazoPrincipalResponse = await axios(ConfigMazoPrincipal).then((response) => response.data);
        console.log('mazop', mazoPrincipalResponse);
        setMazoPrincipal(mazoPrincipalResponse.cartas)

        const ConfigBasuraResponse = {
          'method': 'get',
          'url': `${API_URL}/mazos/${2}/cartas`,
          'headers': {
            'Authorization': `Bearer ${token}`
          }
        };
  
        const basuraResponse = await axios(ConfigBasuraResponse).then((response) => response.data);
        console.log('cartas', basuraResponse.cartas);
        setBasura(basuraResponse.cartas)
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, []);
  
  

  return (
    <>
    <Mesa cartas={cartas} mazoPrincipal={mazoPrincipal} basura={basura}/>
    </>

  )
}

export default Sala
