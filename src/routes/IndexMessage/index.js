import { injectReducer } from '../../store/reducers'

export default (store) => ({
      path:"/index/*",

  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Index = require('./containers/indexContainer').default
      const reducer = require('./modules/index').default
      injectReducer(store, { key: 'dataIndex', reducer })
      cb(null, Index)
    })
  }
})