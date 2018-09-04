import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Home from './Home'
import Auth from './Auth'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import QuestionDetails from './QuestionDetails'
import Logout from './Logout'
import AddQuestion from './AddQuestion'
import YourQuestions from './YourQuestions'
import Leaderboard from './Leaderboard'

class App extends Component {
  componentDidMount () {
    this.props.dispatch(handleInitialData())
  }
  render () {
    return (
      <div>
        <Route exact path='/' component={Home} />
        <div className="container">
          <Route exact path='/auth' component={Auth} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/questions/:question_id' component={QuestionDetails} />
          <Route exact path='/add' component={AddQuestion} />
          <Route exact path='/profile' component={YourQuestions} />
          <Route exact path='/leaderboard' component={Leaderboard} />
          <Route exact path='/logout' component={Logout} />
        </div>
      </div>
    )
  }
}

export default withRouter(connect()(App))