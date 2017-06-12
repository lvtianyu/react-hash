import { connect } from 'react-redux'
import {actions} from './../modules/secret'

import Secret from './../components/Secret'
const mapDispatchtoProps = actions

const mapStateToProps = (state) => ({
  dataSecret: state.dataSecret
})

export default connect(mapStateToProps, mapDispatchtoProps)(Secret)
