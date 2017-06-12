import { connect } from 'react-redux'
import {actions} from './../modules/DemoTask'

import DemoTask from './../components/DemoTask'

const mapDispatchtoProps =actions;

const mapStateToProps = (state) => ({
  dataTry: state.dataTry
})

export default connect(mapStateToProps, mapDispatchtoProps)(DemoTask)
