import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'index.html/s',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Secret = require('./containers/SecretContainer').default
      const reducer = require('./modules/secret').default
      // injectReducer(store, { key: 'dataSecret', reducer })
      cb(null, Secret)
    })
  }
})