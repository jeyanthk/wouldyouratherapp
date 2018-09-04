import {
  SIGNIN_USER,
  SIGNOUT_USER
} from '../actions/authedUser'

export function auth (state = null, action) {
  switch (action.type) {
    case SIGNIN_USER:
      return action.id
    case SIGNOUT_USER:
      return null
    default:
      return state
  }
}
