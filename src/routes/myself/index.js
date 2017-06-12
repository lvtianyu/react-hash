import { injectReducer } from '../../store/reducers'

export default (store) => ({
    path:"/Myself",
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Myself = require('./containers/myselfContainer').default
      const reducer = require('./modules/myself').default
      injectReducer(store, { key: 'dataCenter', reducer })
      cb(null, Myself)
    })
  }
})