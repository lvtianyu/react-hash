import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: '/ApprenticeTask',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Message = require('./containers/ApprenticeTaskContainer').default
      const reducer = require('./modules/ApprenticeTask').default
      cb(null, Message)
    })
  }
})
