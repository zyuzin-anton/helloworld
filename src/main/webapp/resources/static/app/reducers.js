import {
  HELLO_WORLD_MESSAGE_OK,
  HELLO_WORLD_MESSAGE_FAIL
} from './actions'

const defaultState = {
    loading: false,
    message: null,
    errors: null
};

export function processHelloWorldMessage(state = defaultState, action) {
  switch (action.type) {
    case HELLO_WORLD_MESSAGE_OK: return helloWorldMessageOk(action.message);
    case HELLO_WORLD_MESSAGE_FAIL: return helloWorldMessageFail(action.error);
    default: return state;
  }
}

function helloWorldMessageOk(message) {
  return {
    loading: false,
    message: message,
    errors: null
  };
}

function helloWorldMessageFail(error) {
  return {
    loading: false,
    message: null,
    error: error
  };
}