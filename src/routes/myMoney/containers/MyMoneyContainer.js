import { connect } from 'react-redux'
import {actions} from './../modules/MyMoney'

import MyMoney from './../components/MyMoney'

const mapDispatchtoProps = actions

const mapStateToProps = (state) => ({
  dataMoney: state.dataMoney
})

export default connect(mapStateToProps, mapDispatchtoProps)(MyMoney)