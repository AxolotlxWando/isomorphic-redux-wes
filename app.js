import app from 'lib/server'

import config from './config'

const server = app.listen(config.port, function () {
  console.log('Server listening on', server.address().port)
})
