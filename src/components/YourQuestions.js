import React from 'react'
import { connect } from 'react-redux'
import UserNav from './UserNav'
import Question from './Question'
import IntroMeta from './IntroMeta'
import { Redirect } from 'react-router-dom'

const YourQuestions = (props) => {
  const { user, auth, questions } = props

  if (auth === null) {
    return <Redirect to='/auth' />
  }

  return (
    <div>
      <UserNav />
      <IntroMeta user={user}/>
      <div className="set">
        { questions.map(question => (
          <Question question={question} answer={user.answers[question.id]} key={question.id} />
        ))}
      </div>
    </div>
  )
}

function mapStateToProps ({ auth, users, questions }) {
  let yourQuestions = []
  let user = users[auth]

  Object.keys(questions).map(k => questions[k]).filter(question => {
    if (user.questions.includes(question.id)) {
      yourQuestions.push(question)
    }
  })

  return {
    auth,
    user: users[auth],
    questions: yourQuestions
  }
}

export default connect(mapStateToProps)(YourQuestions)