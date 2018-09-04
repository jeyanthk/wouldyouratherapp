import React from 'react'
import { Link } from 'react-router-dom'

const IntroMeta = (props) => {
  const { user } = props
  const avatarURL = user.avatarURL === '' ? 'https://static-s.aa-cdn.net/img/ios/570306657/c8525d4f709bb8708227cf6ddc441e61?v=1' : user.avatarURL
  return (
    <div className="meta">
      <div className="hello-user">
        <img src={avatarURL} alt={user.name} className="user-icon" />
        <span>Hello, {user.name}.</span>
      </div>
    </div>
  )
}

export default IntroMeta