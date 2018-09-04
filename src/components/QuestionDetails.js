import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import UserNav from './UserNav'
import PostMeta from './PostMeta'
import { handleAnswer } from '../actions/shared'

class QuestionDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      answer: this.props.answer
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle (id) {
    const { dispatch, auth, question } = this.props
    if (!this.state.answer) {
      if (id === 1) {
        dispatch(handleAnswer(auth, question.id, 'optionOne'))
        this.setState({ answer: 'optionOne' })
      } else {
        dispatch(handleAnswer(auth, question.id, 'optionTwo'))
        this.setState({ answer: 'optionTwo' })
      }
    }
  }

  render () {
    const { question, auth, total, percOne, percTwo } = this.props
    const { answer } = this.state
    if (auth === null) {
      return <Redirect to='/auth' />
    }
    let cls
    if (answer) {
      if (answer === 'optionOne') {
        cls = ['opt option-one selected', 'opt option-two']
      } else if (answer === 'optionTwo') {
        cls = ['opt option-one', 'opt option-two selected']
      }
    } else {
      cls = ['opt option-one', 'opt option-two']
    }
    return (
      <div>
        <UserNav />
        {question && (
          <div>
            <PostMeta userId={question.author} time={question.timestamp} />
            <div className="set">
              <div className="options">
                <div className={cls[0]} onClick={() => this.toggle(1)}>{question.optionOne.text}</div>
                <div className={cls[1]} onClick={() => this.toggle(2)}>{question.optionTwo.text}</div>
              </div>
              { answer && (
                <div className="progress">
                  <div className="progress-one" style={{ width: `${percOne}%` }}>{`${percOne}%`}</div>
                  <div className="progress-two" style={{ width: `${percTwo}%` }}>{`${percTwo}%`}</div>
                </div>
              )}
              { answer && (
                <div className="total">
                  Total number of votes: {total}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps ({ auth, questions, users }, { match }) {
  let question = questions[match.params.question_id]
  let answer, percOne, percTwo, total

  if (auth !== null) {
    const answers = users[auth].answers

    if (answers.hasOwnProperty(question.id)) {
      answer = answers[question.id]
    }

    total = question.optionOne.votes.length + question.optionTwo.votes.length
    percOne = (question.optionOne.votes.length / total) * 100
    percTwo = (question.optionTwo.votes.length / total) * 100
  }

  return {
    auth,
    question,
    answer,
    total,
    percOne,
    percTwo
  }
}

export default connect(mapStateToProps)(QuestionDetails)