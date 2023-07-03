import React from 'react'
import { useContext} from 'react';
import { AuthContext } from '../auth/AuthContext';
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from '../home/Home'
import AboutPage from '../about/AboutPage'
import Login from '../profile/Login'
import How from '../home/How'
import Sala from '../game/Sala'
import Signup from '../profile/Signup';
import AdministrarPartidas from '../admin/AdministrarPartidas'
import ElegirPartida from '../home/ElegirPartida'

function Routing() {
  const {token} = useContext(AuthContext);
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path={'/'} element={<Home />} />
    <Route path={'/login'} element={<Login/>} />
      <Route path={'/signup'} element={<Signup/>} />
      <Route path={'/about'} element={<AboutPage/>} />
      <Route path={'/how'} element={<How/>} />
      <Route path={'/sala'} element={<Sala/>} />
      <Route path={'/elegir-partida'} element={<ElegirPartida/>} />
      <Route path={'/administrar-partidas'} element={<AdministrarPartidas/>} />
    </Routes>
    </BrowserRouter>
    </>


  )
}

export default Routing
