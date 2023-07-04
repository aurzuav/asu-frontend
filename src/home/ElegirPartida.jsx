import React from 'react'
import { useState, useContext, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import Nav from '../common/Nav'
import { Link } from 'react-router-dom'
import './ElegirPartida.css'
import { useNavigate } from "react-router-dom";
import API_URL from '../config';


function ElegirPartida() {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const config = {
        'method': 'get',
        'url': `${API_URL}/games/list`,
        'headers': {
            'Authorization': `Bearer ${token}`
        }
    }
    useEffect(() => {
        axios(config).then((response) => {
            setGames(response.data)
        }).catch((error) => {
            console.log(error)
        });
    }, []);

    const handleEnterGame = (gameId) => {
        const params = {
          gameId: gameId
        };
        navigate('/sala', { state: params });
      }
      

    if (token === null || token === "null") {
        return <Navigate replace to="/login" />;
    } else {
        return (
            <>
                <h1>Elegir Partida</h1>
                <div className='tabla'>
                    <h2>Lista de Juegos</h2>
                    <table>
                        <tbody>
                            {games.map((game) => (
                                <tr key={game.game.id}>
                                    <td>ID: {game.game.id}</td>
                                    <td>ID Ganador: {game.game.winnerId}</td>
                                    <td>
                                        <button className='enter' onClick={() => handleEnterGame(game.game.id)}>
                                            Entrar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

export default ElegirPartida