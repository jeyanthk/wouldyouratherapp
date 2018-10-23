import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Link } from 'react-router-dom'

const PostMeta = (props) => {
  const { user, time } = props
  const avatar = user.avatarURL === '' ? 'https://static-s.aa-cdn.net/img/ios/570306657/c8525d4f709bb8708227cf6ddc441e61?v=1' : user.avatarURL
  return (
    <div className="meta">
      <div className="user-details">
        <img src={avatar} alt={user.name} className="user-icon" />
        <span className="by">Question by {user.name}</span>
        <span className="time">Posted {moment(time).fromNow()}</span>
      </div>
    </div>
  )
}

function mapStateToProps ({ users }, { userId }) {
  return {
    user: users[userId]
  }
}

export default connect(mapStateToProps)(PostMeta)