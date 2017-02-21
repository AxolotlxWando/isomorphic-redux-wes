import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import * as TodoActionCreators from 'lib/shared/actions/TodoActionCreators'
import { connect } from 'react-redux'

import TodosView from 'lib/shared/components/TodosView'
import TodosForm from 'lib/shared/components/TodosForm'

function mapStateToProps (state) {
  return {
    todos: state.get('todos')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(TodoActionCreators, dispatch)
}

class Home extends React.Component {
  render () {
    const boundActionCreators = bindActionCreators(TodoActionCreators, this.props.dispatch)

    return (
      <div id='todo-list'>
        <TodosView todos={this.props.todos} deleteTodo={this.props.deleteTodo} editTodo={this.props.editTodo} />
        <TodosForm todos={this.props.todos} createTodo={this.props.createTodo} />
      </div>
    )
  }
}

Home.propTypes = {
  todos: PropTypes.any.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
