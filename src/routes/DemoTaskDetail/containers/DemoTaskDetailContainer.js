import { connect } from 'react-redux'
import {actions} from './../modules/DemoTaskDetail'

import DemoTaskDetail from './../components/DemoTaskDetail'
const mapDispatchtoProps = actions;
const mapStateToProps = (state) => ({
  dataDetail: state.dataDetail
})

export default connect(mapStateToProps, mapDispatchtoProps)(DemoTaskDetail)
