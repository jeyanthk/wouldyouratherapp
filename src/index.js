import React from 'react'
import ReactDOM from 'react-dom'
import './style/normalize.css'
import './style/index.css'
import App from './components/App'
import { BrowserRouter } from 'react-router-dom'
import { createStore, compose } from 'redux'
import reducer from './reducers'
import middleware from './middleware'
import { Provider } from 'react-redux'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancers(middleware))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
