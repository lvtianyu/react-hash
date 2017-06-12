import React from 'react'
import { render } from 'react-dom'

import { func, object, arrayOf, oneOfType, element, shape } from 'prop-types'
import {hashHistory, Router, Route} from 'react-router'
//Redux提供的高阶组件，用来将redux绑定到react
import {Provider} from 'react-redux'


class AppContainer extends React.Component {
  shouldComponentUpdate() {
    return false
  }
  render() {
    const {routes, store} = this.props
    return (
      <Provider store={store}>
        {/*Router只是一个组件，起路由作用的是Route */}
        <Router history={hashHistory} routes={routes}>
        </Router>
      </Provider>
    )
  }
}

React.propTypes = {
  routes: object.isRequired,
  store: object.isRequired
}

export default AppContainer
