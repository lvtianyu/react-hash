import React from 'react'
import PropTypes from 'prop-types';

import './CoreLayout.scss'
import '../../styles/core.scss'
// import example from '../../containers/AppContainer.scss'


export const CoreLayout = ({ children }) => (
  
    <div className='core-layout__viewport'>
      {children}{console.log(children)}
  </div>
)

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default CoreLayout
