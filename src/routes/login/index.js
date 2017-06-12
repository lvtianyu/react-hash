import { injectReducer } from '../../store/reducers'

export default (store) => ({
    path:"/login",
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Login = require('./containers/loginContainer').default
      const reducer = require('./modules/login').default
      injectReducer(store, { key: 'dataLogin', reducer })
      cb(null, Login)
    })
  }
})