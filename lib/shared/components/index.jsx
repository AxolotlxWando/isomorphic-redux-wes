import React, {PropTypes} from 'react'

class App extends React.Component {
  render () {
    return (
      <div id='app-view'>
        <h1>Todos</h1>
        <hr />
        {this.props.children}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.object
}

export default App
