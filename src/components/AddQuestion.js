import React, { Component } from 'react'
import { connect } from 'react-redux'
import CreateMeta from './CreateMeta'
import UserNav from './UserNav'
import { addQuestionAction } from '../actions/shared'
import { Redirect } from 'react-router-dom'

class AddQuestion extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirect: false
    }
    this.addQuestion = this.addQuestion.bind(this)
  }

  addQuestion (e) {
    e.preventDefault()

    let optOne = e.target[0].value
    let optTwo = e.target[1].value
    if(e.target[0].value !== '' && e.target[1].value !== ''){
    this.props.dispatch(addQuestionAction(this.props.auth, optOne, optTwo))
    this.setState({ redirect: true })
    }
    else{
      alert("Please enter both the options");
    }
  }

  render () {
    if (this.props.auth === null) {
      return <Redirect to='/' />
    }

    if (this.state.redirect) {
      return <Redirect to='/dashboard' />
    }

    return (
      <div>
        <UserNav />
        <CreateMeta />
        <div className="set">
          <form onSubmit={this.addQuestion}>
            Would you rather?
            <div className="options">
              <input type="text" className="opt input option-one" placeholder="Enter your first option here" />
              <input type="text" className="opt input option-two" placeholder="Enter your second option here" />
            </div>
            <div className="center"><button type="submit" className="add-button">Add Question</button></div>
          </form>
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

export default connect(mapStateToProps)(AddQuestion)