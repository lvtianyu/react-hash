import { connect } from 'react-redux'
import {actions} from './../modules/creditCard.js'

import CreditCard from './../components/creditCard'

const mapDispatchtoProps = actions


const mapStateToProps = (state) => ({
  dataCredit: state.dataCredit
})

export default connect(mapStateToProps, mapDispatchtoProps)(CreditCard)
