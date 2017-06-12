import { injectReducer } from '../../store/reducers'
export default (store) => ({
  path: '/DemoTaskDetail',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const DemoTaskDetail = require('./containers/DemoTaskDetailContainer').default
      const reducer = require('./modules/DemoTaskDetail').default
         injectReducer(store, { key: 'dataDetail', reducer })

      cb(null, DemoTaskDetail)
    })
  }
})
