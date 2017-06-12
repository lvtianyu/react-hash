import { connect } from 'react-redux'
import {actions} from './../modules/index'

import Index from './../components/index'

const mapDispatchtoProps = actions

const mapStateToProps = (state) => ({
  dataIndex: state.dataIndex
})

export default connect(mapStateToProps, mapDispatchtoProps)(Index)
