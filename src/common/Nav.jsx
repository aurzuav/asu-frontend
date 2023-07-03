import React from 'react'
import "./Nav.css"
import{Link, useLocation} from 'react-router-dom'
import LogoutButton from '../profile/Logout'
import { useState } from 'react';

function Nav() {
  const location = useLocation();
  console.log(location.pathname)
  return (
      <nav>
        <Link to="/" >Home</Link>
        <Link to="/about" >About</Link>
        <LogoutButton />
    </nav>
  )
}

export default Nav
