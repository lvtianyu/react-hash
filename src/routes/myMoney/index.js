import { injectReducer } from '../../store/reducers'

export default (store) => ({
    path:"/MyMoney",
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const MyMoney = require('./containers/MyMoneyContainer').default
      const reducer = require('./modules/..').default
      injectReducer(store, { key: 'dataMoney', reducer })
      cb(null, MyMoney)
    })
  }
})