import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleAnswer } from '../actions/shared'

class Question extends Component {
  constructor (props) {
    super(props)
    this.state = {
      answer: this.props.answer
    }
    this.changeOption = this.changeOption.bind(this)
  }

  changeOption (opt) {
    const { dispatch, auth, question } = this.props
    if (!this.state.answer) {
      if (opt === 1) {
        dispatch(handleAnswer(auth, question.id, 'optionOne'))
        this.setState({ answer: 'optionOne' })
      } else if (opt === 2) {
        dispatch(handleAnswer(auth, question.id, 'optionTwo'))
        this.setState({ answer: 'optionTwo' })
      }
    }
  }

  render () {
    const { question } = this.props
    const { answer } = this.state
    let cls = []
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
      <div className="question q opt">
        <div className="options">
          <div className={cls[0]} onClick={() => this.changeOption(1)}>{question.optionOne.text}</div>
          <div className={cls[1]} onClick={() => this.changeOption(2)}>{question.optionTwo.text}</div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ auth }) {
  return {
    auth
  }
}

export default connect(mapStateToProps)(Question)