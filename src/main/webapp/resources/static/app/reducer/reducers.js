import { combineReducers } from 'redux'
import {
  HELLO_WORLD_MESSAGE_REQUESTED,
  HELLO_WORLD_MESSAGE_OK,
  HELLO_WORLD_MESSAGE_FAIL
} from '../action/actions'

const defaultState = {
    loading: false,
    message: null,
    errors: null
};

function processHelloWorldMessage(state = defaultState, action) {
  switch (action.type) {
    case HELLO_WORLD_MESSAGE_REQUESTED:
      return {
        loading: true,
        message: null,
        errors: null
      };

    case HELLO_WORLD_MESSAGE_OK:
      return {
        loading: false,
        message: action.message,
        errors: null
      };

    case HELLO_WORLD_MESSAGE_FAIL:
      return {
        loading: false,
        message: null,
        errors: action.errors
      };

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  processHelloWorldMessage
})

export default rootReducer