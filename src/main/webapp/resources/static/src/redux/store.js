import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'

import { helloWorldReducer } from './reducers'

import createSagaMiddleware from 'redux-saga'
import { helloWorldSaga } from "./sagas"

import { handleRequests } from '@redux-requests/core'
import { createDriver } from '@redux-requests/graphql'

const { requestsReducer, requestsMiddleware } = handleRequests({
    driver: createDriver({ url: '/graphql' }),
});

const rootReducer = combineReducers({
    processHelloWorldMessage: helloWorldReducer, requests: requestsReducer
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

sagaMiddleware.run(helloWorldSaga);

export default store