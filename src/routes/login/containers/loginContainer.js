import { connect } from 'react-redux'
import {actions} from './../modules/login.js'

import Login from './../components/login'

const mapDispatchtoProps = actions

const mapStateToProps = (state) => ({
  dataLogin: state.dataLogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(Login)