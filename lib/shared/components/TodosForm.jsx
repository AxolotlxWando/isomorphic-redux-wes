/* Notice the use of html5 data attributes (e.g. data-<attribute> and dataset.
 * <attribute>):
 * https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
 */

import React from 'react'

class TodosView extends React.Component {
  constructor () {
    super()
    this.handleCreate = this.handleCreate.bind(this)
  }

  handleCreate (e) {
    let node = this.refs['todo-input']
    this.props.createTodo(node.value)
    node.value = ''
  }

  render () {
    return (
      <div id='todo-form'>
        <input type='text' placeholder='type todo' ref='todo-input' />
        <input type='submit' value='OK!' onClick={this.handleCreate} />
      </div>
    )
  }
}

export default TodosView
