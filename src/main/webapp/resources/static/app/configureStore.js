import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'

import {processHelloWorldMessage} from './reducers'

import createSagaMiddleware from 'redux-saga'
import {rootSaga} from "./sagas"

const rootReducer = combineReducers({
    processHelloWorldMessage
});

const sagaMiddleware = createSagaMiddleware();

function configureStore(preloadedState = {}) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware, sagaMiddleware
    )
  )
}

const store = configureStore();

sagaMiddleware.run(rootSaga);

export default store