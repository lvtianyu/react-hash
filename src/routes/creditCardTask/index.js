import { injectReducer } from '../../store/reducers'

export default (store) => ({
    path:"/creditCard/*",
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const creditCard = require('./containers/creditCardContainer').default
      const reducer = require('./modules/creditCard').default
      injectReducer(store, { key: 'dataCredit', reducer })
      cb(null, creditCard)
    })
  }
})