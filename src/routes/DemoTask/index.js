import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: '/DemoTask/*',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const DemoTask = require('./containers/DemoTaskContainer').default
      const reducer = require('./modules/DemoTask').default
   injectReducer(store, { key: 'dataTry', reducer })
      cb(null, DemoTask)
    })
  }
})
