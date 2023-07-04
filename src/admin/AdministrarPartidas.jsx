import React from 'react'
import { useState, useContext, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import Nav from '../common/Nav'
import { Link } from 'react-router-dom'
import './AdministrarPartidas.css'
import API_URL from '../config';


function AdministrarPartidas() {
    const { token } = useContext(AuthContext);
    const [auth, setAuth] = useState(false);
    const [games, setGames] = useState([]);

    const configAuth = {
        'method': 'get',
        'url': `${API_URL}/scope-example/protectedadmin`,
        'headers': {
            'Authorization': `Bearer ${token}`
        }
    }
    const configGames = {
        'method': 'get',
        'url': `${API_URL}/games/list`,
        'headers': {
            'Authorization': `Bearer ${token}`
        }
    }

    useEffect(() => {
        axios(configAuth).then((response) => {
            setAuth(true)
        }).catch((error) => {
            setAuth(false)
            console.log(error)
        });
    }, []);

    useEffect(() => {
        axios(configGames).then((response) => {
            setGames(response.data)
        }).catch((error) => {
            console.log(error)
        });
    }, [auth]);
    const handleDeleteGame = (gameId) => {
        const configGamesDelete = {
            'method': 'delete',
            'url': `${API_URL}/games/delete/${gameId}`,
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        }
        axios(configGamesDelete).then(() => {
                setGames(games.filter((game) => game.game.id !== gameId));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleSubmitNewGame = (e) => {
        e.preventDefault();
        const configGamesCreate = {
            'method': 'post',
            'url': `${API_URL}/games/create`,
            'headers': {
                'Authorization': `Bearer ${token}`
            },
            'data': {
                'winnerId': null,
              }
        }
        axios(configGamesCreate)
            .then((response) => {
                const { id, winnerId } = response.data;
                const newGame = {
                  game: {
                    id,
                    winnerId,
                  }
                };
                setGames([...games, newGame]);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    if (!auth) {
        return (
            <h1 id='denegado'>¡ALTO AHÍ! NO DEBERÍAS ESTAR ACÁ...</h1>
        )
    } else {
        return (
            <>
                <h1>Administrar Partidas</h1>
                <div className='tabla'>
                    <h2>Lista de Juegos</h2>
                    <p>Solo se borran los juegos que no tienen foreign key</p>
                    <table>
                        <tbody>
                            {games.map((game) => (
                                <tr key={game.game.id}>
                                    <td>ID: {game.game.id}</td>
                                    <td>ID Ganador: {game.game.winnerId}</td>
                                    <td>
                                        <button className='delete' onClick={() => handleDeleteGame(game.game.id)}>
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='create-game'>
                    <h2 >Crear Nuevo Juego</h2>
                    <form onSubmit={handleSubmitNewGame}>
                        <button type="submit">Crear Juego</button>
                    </form>
                </div>
            </>
        );
    }
}

export default AdministrarPartidas