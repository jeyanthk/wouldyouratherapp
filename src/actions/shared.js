import { getUsers, saveUserAnswer, addUserQuestion } from './users'
import { getQuestions, saveAnswer, handleAddQuestion } from './questions'
import { handleUserLogin } from './authedUser'
import {
  getInitialData,
  saveNewUser,
  saveQuestionAnswer,
  saveQuestion
} from '../utils/api'

export const GET_INITIAL_DATA = 'GET_INITIAL_DATA'

export function handleInitialData () {
  return (dispatch) => {
    getInitialData().then(({users, questions}) => {
      dispatch(getUsers(users))
      dispatch(getQuestions(questions))
      dispatch(handleUserLogin(null))
    })
  }
}

export function handleUserRegistration (username, name) {
  return (dispatch) => {
    saveNewUser({ username, name })
      .then((users) => {
        if (users.error) {
          console.error('Username Already taken')
        } else {
          dispatch(getUsers(users))
          dispatch(handleUserLogin(username))
        }
      })
  }
}

export function handleAnswer (auth, qid, option) {
  const data = {
    authedUser: auth,
    qid,
    answer: option
  }
  return (dispatch) => {
    saveQuestionAnswer(data)
      .then(() => {
        dispatch(saveAnswer(auth, qid, option))
        dispatch(saveUserAnswer(auth, qid, option))
      })
  }
}

export function addQuestionAction (auth, optOne, optTwo) {
  return dispatch => {
    saveQuestion({
      optionOneText: optOne,
      optionTwoText: optTwo,
      author: auth
    }).then(question => {
      dispatch(addUserQuestion(question))
      dispatch(handleAddQuestion(question))
    })
  }
}