import React from 'react'
import { Link } from 'react-router-dom'

const UserNav = () => {
  return (
    <div className="menu">
      <Link to='/dashboard' className="logo">Would You Rather?</Link>
      <Link to='/add' className="add primary button"><span role="img" aria-label="add">➕ Add question</span></Link>
      <Link to='/profile' className="your-questions button">Your Questions</Link>
      <Link to='/leaderboard' className="leaderboard button">Leaderboard</Link>
      <Link to='/logout' className="danger button">Logout</Link>
    </div>
  )
}

export default UserNav