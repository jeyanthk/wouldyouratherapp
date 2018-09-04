import {
  _getQuestions,
  _getUsers,
  _saveQuestion,
  _saveQuestionAnswer,
  _saveNewUser
} from './_DATA.js'

export function getInitialData () {
  return Promise.all([
    _getQuestions(),
    _getUsers()
  ]).then(([ questions, users ]) => ({
    questions,
    users
  }))
}

/**
 *
 * @param {string} question.optionOneText
 * @param {string} question.optionTwoText
 * @param {string} question.author
 */
export function saveQuestion (question) {
  return _saveQuestion(question)
}

/**
 *
 * @param {string} data.authedUser
 * @param {string} data.qid
 * @param {string} data.answer
 */
export function saveQuestionAnswer (data) {
  return _saveQuestionAnswer(data)
}

/**
 *
 * @param {string} user.username
 * @param {string} user.name
 */
export function saveNewUser (user) {
  return _saveNewUser(user)
}
