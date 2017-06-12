import { injectReducer } from '../../store/reducers'

export default (store) => ({
    path:"/taskProgress",
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const progress = require('./containers/progressContainer').default
      const reducer = require('./modules/progress').default
      injectReducer(store, { key: 'dataCard', reducer })
      cb(null, progress)
    })
  }
})