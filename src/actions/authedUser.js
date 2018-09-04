export const SIGNIN_USER = 'SIGNIN_USER'
export const SIGNOUT_USER = 'SIGNOUT_USER'

export function handleUserLogin(id) {
  return {
    type: SIGNIN_USER,
    id
  }
}

export function logoutUser() {
  return {
    type: SIGNOUT_USER
  }
}