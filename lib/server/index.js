import express from 'express'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import config from '../../config'
import routes from 'lib/shared/routes'
import rootReducer from 'lib/shared/reducers'

const app = express()

if (process.env.NODE_ENV === 'production') {
  console.log('serving static assets from server from:' + path.resolve('public', 'assets') + ' using port' + config.port)
  app.use('/assets', express.static(path.resolve('public', 'assets')))
}

app.use((req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const store = createStore(rootReducer)
      const initialState = store.getState()
      const contentURL = (process.env.NODE_ENV !== 'production')
                       ? 'http://localhost:' + config.devPort + '/'
                       : config.deploymentURLMapping

      const Component = (
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      )
      const componentHTML = renderToString(Component)

      const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Isomorphic Redux Demo</title>
        </head>
        <body>
          <div id="react-view">${componentHTML}</div>
          <script type="application/javascript">
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState.toJS())}
          </script>
          <script type="application/javascript" src="${contentURL + 'assets/common.js'}"></script>
          <script type="application/javascript" src="${contentURL + 'assets/bundle.js'}"></script>
        </body>
      </html>
      `

      res.status(200).send(HTML)
    } else {
      res.status(404).send('Not found')
    }
  })
})

//  <Provider store={store}>
//    <RouterContext {...renderProps} />
//  </Provider>
export default app
