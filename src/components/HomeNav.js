import React from 'react'
import { Link } from 'react-router-dom'

const HomeNav = () => {
  return (
    <div className="menu-home">
      <Link to="/auth" className="login button1">Login</Link>
      <Link to="/auth" className="register button2">Register</Link>
    </div>
  )
}

export default HomeNav