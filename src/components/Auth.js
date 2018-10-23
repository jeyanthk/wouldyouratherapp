import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleUserLogin } from '../actions/authedUser'
import { handleUserRegistration } from '../actions/shared'

class Auth extends Component {
  constructor (props) {
    super(props)
    this.state = {
      login: false,
      redirect: false,
      userNotFound: false,
      usernameAlreadyTaken: false
    }
    this.handleSwitch = this.handleSwitch.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegistration = this.handleRegistration.bind(this)
  }

  handleSwitch (action) {
    switch (action) {
      case 'login':
        this.setState({ login: true })
        break
      case 'register':
        this.setState({ login: false })
        break
      default:
        break
    }
  }

  handleLogin (e) {
    e.preventDefault()
    const username = e.target[0].value
    let found = false
    const { users, dispatch } = this.props
    users.forEach(user => {
      if (user === username) {
        found = true
        dispatch(handleUserLogin(username))
        this.setState({ redirect: true })
      }
    })
    if (!found) {
      this.setState({ userNotFound: true })
    }
  }

  handleRegistration (e) {
    e.preventDefault()
    const username = e.target[0].value
    const name = e.target[1].value
    const { users, dispatch } = this.props
    users.forEach(user => {
      if (user === username) {
        this.setState({ usernameAlreadyTaken: true })
      }
    })
    dispatch(handleUserRegistration(username, name))
  }

  render () {
    const { login, redirect, userNotFound, usernameAlreadyTaken } = this.state
    const { auth } = this.props
    const { from } = this.props.location.state || { from: { pathname: '/dashboard' } };

    if (auth != null) {
      return <Redirect to={from} />
    }

    return (
      <div>
        <div className="centered">
          <div className="registration-box">
            <div className="buttons">
              <div className={login ? 'login-button button active' : 'login-button button'} onClick={() => this.handleSwitch('login')}>Login</div>
              <div className={login ? 'register-button button' : 'register-button button active'} onClick={() => this.handleSwitch('register')}>Register</div>
            </div>
            <div className="sections">
              <div className={login ? 'register-section hidden' : 'register-section'}>
                { usernameAlreadyTaken && (
                  <div style={{ color: 'red' }}>Username Already Taken</div>
                )}
                <form onSubmit={this.handleRegistration}>
                  <span><b>Would you rather?</b></span>
                  <div className="input-field">
                    <label htmlFor="username">Username:</label><br />
                    <input type="text" id="username" placeholder="Enter your Username" />
                  </div>
                  <div className="input-field">
                    <label htmlFor="name">Full Name:</label><br />
                    <input type="text" id="name" placeholder="Enter your Full Name" />
                  </div>
                  <button type="submit" className="submit-button">Register</button>
                </form>
              </div>
              <div className={login ? 'login-section' : 'login-section hidden'} id='login-section'>
                { userNotFound && (
                  <div style={{ color: 'red' }}>Wrong Username</div>
                )}
                <form onSubmit={this.handleLogin}>
                  <div className="input-field">
                    <label htmlFor="username">Username:</label><br/ >
                    <input type="text" id="username" placeholder="Input your Username" />
                  </div>
                  <button type="submit" className="submit-button">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ users, auth }) {
  const usersProp = Object.keys(users)
  return {
    users: usersProp,
    auth
  }
}

export default connect(mapStateToProps)(Auth)