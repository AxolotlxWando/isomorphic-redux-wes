import { combineReducers } from 'redux-immutable'

import todosReducer from 'lib/shared/reducers/todoReducer'

export default combineReducers({todos: todosReducer})
