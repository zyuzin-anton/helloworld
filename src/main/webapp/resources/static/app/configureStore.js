import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'

import {processHelloWorldMessage} from './reducers'

import createSagaMiddleware from 'redux-saga'
import {rootSaga} from "./sagas"

import { handleRequests } from '@redux-requests/core';
import { createDriver } from '@redux-requests/graphql';

const { requestsReducer, requestsMiddleware } = handleRequests({
    driver: createDriver({ url: 'http://localhost:8080/graphql' }),
});

const rootReducer = combineReducers({
    processHelloWorldMessage, requests: requestsReducer
});

const sagaMiddleware = createSagaMiddleware();

function configureStore(preloadedState = {}) {
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(
          thunkMiddleware, sagaMiddleware, ...requestsMiddleware
        )
    )
}

const store = configureStore();

sagaMiddleware.run(rootSaga);

export default store