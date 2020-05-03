import PropTypes from 'prop-types'
import React from 'react'

import Counter from './Counter'

const Body = ({ text }) => (
  <div>
    {text}
    <Counter />
  </div>
)

Body.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Body;
