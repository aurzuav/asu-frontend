import React from 'react'
import { useState, useContext, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import Nav from '../common/Nav'
import "./Home.css"
import{Link} from 'react-router-dom'
import jwt_decode from 'jwt-decode';

const checkUserIsAdmin = (token) => {
  const decodedToken = jwt_decode(token);
  return (decodedToken.scope[1] === "admin")
};

function Home() {
  const {token} = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const config = {
    'method' : 'get',
    'url' : `${import.meta.env.VITE_BACKEND_URL}/users/list`,
    'headers':{
      'Authorization':`Bearer ${token}`
    }
  }
  useEffect(() => {
    axios(config).then((response) => {
      setUsers(response.data)
      console.log(response.data)
    }).catch((error) => {
      console.log(error)
    });
  }, []);

  if (token === null || token === "null") {
    return <Navigate replace to="/login" />;
  } else {
    const isAdmin = checkUserIsAdmin(token);
  return (

<div className='pagina'>
<Nav/>
<h1>ASU Cariocas</h1>
<div className="contenido">

<div className="resumen">
  <p>Según ChatGPT, un modelo de lenguaje entrenado por OpenAI (2021), 
    "Cariocas es un juego de cartas con una baraja española 
    de 40 cartas, que se juega por dos a seis jugadores. El objetivo es 
    ser el primero en quedarse sin cartas, siguiendo una serie de reglas
    específicas de descarte y utilizando cartas especiales con efectos 
    diferentes. Es un juego divertido y emocionante que requiere habilidad 
    y estrategia para ganar."</p>
    <img id="logo" src="../imgs/logo.png" />
</div>

<div className='puntajes'>
  <p id='ranking-title'>Usuarios:</p>
  <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>IsAdmin</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.mail}</td>
                    <td>{user.is_admin ? 'true' : 'false'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
<div className='botones'>
<Link to="/elegir-partida">
<button>Elegir una partida</button>
</Link>


{isAdmin && (
            <Link to="/administrar-partidas">
              <button className="admin-button">Administrar Partidas</button>
            </Link>
          )}

</div>

</div>
  )
}}

export default Home
