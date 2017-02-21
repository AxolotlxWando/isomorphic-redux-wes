/* Notice the use of html5 data attributes (e.g. data-<attribute> and dataset.
 * <attribute>):
 * https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
 */

import React, {PropTypes} from 'react'

class TodosView extends React.Component {
  constructor () {
    super()
    this.handleDelete = this.handleDelete.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  handleDelete (e) {
    const id = Number(e.target.dataset.id)
    this.props.deleteTodo(id)
  }

  handleEdit (e) {
    const id = Number(e.target.dataset.id)
    const val = this.props.todos.get(id).text

    let newVal = window.prompt('', val)
    this.props.editTodo(id, newVal)
  }

  render () {
    return (
      <div id='todo-list'>
        { this.props.todos.map((todo, index) => {
          return (
            <div key={index}>
              <span>{todo}</span>
              <button data-id={index} onClick={this.handleDelete}>X</button>
              <button data-id={index} onClick={this.handleEdit}>Edit</button>
            </div>
          )
        })}
      </div>
    )
  }
}

TodosView.propTypes = {
  todos: PropTypes.any.isRequired
}

export default TodosView
