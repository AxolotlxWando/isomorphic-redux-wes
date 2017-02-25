import React from 'react'
import { Route, IndexRoute } from 'react-router'

import config from '../../config'
import App from 'lib/shared/components'
import Home from 'lib/shared/components/Home'

export default (
  <Route name='app' component={App} path={config.deploymentURLMapping} >
    <IndexRoute component={Home} />
  </Route>
)
