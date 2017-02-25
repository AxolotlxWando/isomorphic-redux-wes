import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from 'lib/shared/components'
import Home from 'lib/shared/components/Home'

export default (
  <Route name='app' component={App} path='/' >
    <IndexRoute component={Home} />
  </Route>
)
