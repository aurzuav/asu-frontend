import React, { useState, useContext } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { AuthContext } from '../auth/AuthContext'


function Login() {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("");
  const { token, setToken } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/Login`,
      {
        email,
        password
      }).then((response) => {
        const data = response.data
        setToken(data.access_token)
        setError(false)
        navigate("/");
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
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>
          <input type="submit" value="Log In" />
        </form>
        {error && <div className="error">Hubo un error con el Login, intenta nuevamente.</div>}
      </div>

      <div className='button-container'>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </div>
    </>
  )
}

export default Login
