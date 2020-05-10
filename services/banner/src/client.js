import React from 'react'
import { hydrate } from 'react-dom'

import App from './components/App'
import constants from './constants'

hydrate(<App />, document.getElementById(constants.ROOT_ID))

if (module.hot) {
  module.hot.accept()
}
