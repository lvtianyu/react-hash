// 只引入首屏需要加载的时间

// import RouteRoute from './Route'
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Index from "./IndexMessage"
import creditCard from "./creditCardTask"
import taskProgress from "./creditCardProgess"
import Myself from "./myself"
import MyMoney from "./myMoney"
import DemoTask from './DemoTask'
import DemoTaskDetail from './DemoTaskDetail'
import ApprenticeTask from './ApprenticeTask'
import PersonCode from './PersonCode'
import Login from "./login"

export const createRoutes = (store) => ({
  path: '/',
  // component: CoreLayout,//这个层可以不要，
  indexRoute:  Index(store),

  childRoutes: [
    Index(store),
    creditCard(store),
    taskProgress(store),
    Myself(store),
    MyMoney(store),
    Login(store),
    DemoTask(store),
    DemoTaskDetail(store),
    ApprenticeTask(store),
    PersonCode(store),
  ]
})

export default createRoutes
