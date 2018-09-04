import React from 'react'
import { Link } from 'react-router-dom'
import HomeNav from './HomeNav'

const Home = () => {
  return (
    <div>
      <div className="container">
        <div className="hero">
          <div className="text">
          <Link to="/" className="logo">Would You Rather? 😏</Link>
          </div>
          <div className="subtext">
            <br/>
            Login or Register below👇 to play the game?
          </div>
          <HomeNav />
        </div>
      </div>
    </div>
  )
}

export default Home