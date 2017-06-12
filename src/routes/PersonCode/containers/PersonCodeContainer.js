import { connect } from 'react-redux'
import PersonCode from './../components/PersonCode'
const mapDispatchtoProps ="";

const mapStateToProps = (state) => ({
  dataPersonCode: state.dataPersonCode
})

export default connect(mapStateToProps, mapDispatchtoProps)(PersonCode)
