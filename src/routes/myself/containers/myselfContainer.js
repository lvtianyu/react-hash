import { connect } from 'react-redux'
import {actions} from './../modules/myself'

import Myself from './../componets/myself'

const mapDispatchtoProps = actions

const mapStateToProps = (state) => ({
  dataCenter: state.dataCenter
})

export default connect(mapStateToProps, mapDispatchtoProps)(Myself)