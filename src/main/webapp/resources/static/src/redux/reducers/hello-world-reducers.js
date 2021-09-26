import {
  HELLO_WORLD_MESSAGE_OK
} from '../action-types'

const defaultState = {
    loading: true,
    message: null
};

export function helloWorldReducer(state = defaultState, action) {
  switch (action.type) {
    case HELLO_WORLD_MESSAGE_OK: return helloWorldMessageOk(action.message);
    default: return state;
  }
}

function helloWorldMessageOk(message) {
  return {
    loading: false,
    message: message
  };
}