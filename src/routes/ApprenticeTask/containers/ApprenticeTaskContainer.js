import { connect } from 'react-redux'
import ApprenticeTask from './../components/ApprenticeTask'

const mapDispatchtoProps ="";

const mapStateToProps = (state) => ({
  dataApprenticeTask: state.dataApprenticeTask
})

export default connect(mapStateToProps, mapDispatchtoProps)(ApprenticeTask)
