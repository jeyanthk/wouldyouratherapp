import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import UserNav from './UserNav'
import LeaderboardMeta from './LeaderboardMeta'

const Leaderboard = (props) => {
  const { auth, data } = props

  if (auth === null) {
    return <Redirect to='/auth' />
  }

  return (
    <div>
      <UserNav />
      <LeaderboardMeta />
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Picture</th>
            <th>Questions</th>
            <th>Answers</th>
          </tr>
        </thead>
        <tbody>
          { data.map((user, key) => (
            <tr key={user.id}>
              <td>{key + 1}</td>
              <td>{user.name}</td>
              <td><img src={ user.avatar === '' ? 'https://static-s.aa-cdn.net/img/ios/570306657/c8525d4f709bb8708227cf6ddc441e61?v=1' : user.avatar} alt="User icon" /></td>
              <td>{user.questions}</td>
              <td>{user.answers}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function mapStateToProps ({ auth, users }) {
  let data = []

  Object.keys(users).forEach(userId => {
    data.push({
      id: userId,
      name: users[userId].name,
      avatar: users[userId].avatarURL,
      questions: users[userId].questions.length,
      answers: Object.keys(users[userId].answers).length
    })
  })

  data.sort(function (a, b) {
    return (b.questions + b.answers) - (a.questions + a.answers)
  })

  return {
    auth,
    data
  }
}

export default connect(mapStateToProps)(Leaderboard)