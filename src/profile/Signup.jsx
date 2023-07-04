import React, { useState, useContext } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import API_URL from '../config';


function Signup() {
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();


    async function handleSubmit(event) {
        event.preventDefault();
        axios.post(`${API_URL}/Signup`,
            {
                email,
                username,
                password
            }).then((response) => {
                const data = response.data
                setError(false)
                navigate("/login");
            }).catch((error) => {
                console.log(error)
                setError(true)
            });
    }


    return (
        <>
            <div className='container'>
                <img id="logo" src="../imgs/logo.png" alt="" />
                <h1>¡Bienvenido a ASU Cariocas!</h1>
                <h2>Tu juego favorito, digitalizado.</h2>
            </div>
            <div className="Login">
                <form onSubmit={handleSubmit}>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <input type="submit" value="Sign Up" />
                </form>
                {error && <div className="error">Hubo un error con el Signup, intenta nuevamente.</div>}
            </div>
            <div className='button-container'>
            <Link to="/login">
                        <button>Log In</button>
                    </Link>
            </div>

        </>
    )
}

export default Signup
