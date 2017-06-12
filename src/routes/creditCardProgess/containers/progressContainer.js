import { connect } from 'react-redux'
import {actions} from './../modules/progress'

import CreditCardP from './../components/progress'

const mapDispatchtoProps = actions

const mapStateToProps = (state) => ({
  dataCard: state.dataCard
})

export default connect(mapStateToProps, mapDispatchtoProps)(CreditCardP)