import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'

import createSagaMiddleware from 'redux-saga'
import {rootSaga} from "./sagas";

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

export default store;