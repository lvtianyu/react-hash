import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'PersonCode',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Message = require('./containers/PersonCodeContainer').default
      const reducer = require('./modules/PersonCode').default
      cb(null, Message)
    })
  }
})
