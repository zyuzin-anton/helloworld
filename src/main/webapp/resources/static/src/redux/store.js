import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'

import {helloWorldReducer, loginReducer} from './reducers'

import createSagaMiddleware from 'redux-saga'
import { rootSaga } from "./sagas"

import { LOCATION_CHANGE } from 'react-router-redux'

import { handleRequests } from '@redux-requests/core'
import { createDriver } from '@redux-requests/graphql'
import {fromJS} from "immutable";
import {browserHistory} from "react-router";

const { requestsReducer, requestsMiddleware } = handleRequests({
    driver: createDriver({ url: '/graphql' }),
});

const initialState = fromJS({
    locationBeforeTransitions: null
});

function routerReducer(state = initialState, action) {
    if (action.type === LOCATION_CHANGE) {
        return state.merge({
            locationBeforeTransitions: action.payload
        });
    }
    return state;
}

const rootReducer = combineReducers({
    processHelloWorldMessage: helloWorldReducer, loginData: loginReducer, requests: requestsReducer, routing: routerReducer
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

sagaMiddleware.run(rootSaga, { history: browserHistory });

export default store