import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from 'lib/shared/components'
import Home from 'lib/shared/components/Home'

class Debug extends React.Component {
  render () {
    return (
      <div>
        {'Route not found with history location: ' + this.props.location.pathname}
      </div>
    )
  }
}

export default (
  <Route name='app' component={App} path='/' >
    <IndexRoute component={Home} />
    <Route path='*' component={Debug} />
  </Route>
)
