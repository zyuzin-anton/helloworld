import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'

import {appReducer, helloWorldReducer, loginReducer, navBarReducer, todoReducer} from './reducers'

import createSagaMiddleware from 'redux-saga'
import { rootSaga } from "./sagas"

import { LOCATION_CHANGE } from 'react-router-redux'

import {fromJS} from "immutable";
import {browserHistory} from "react-router";

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
    appData: appReducer,
    processHelloWorldMessage: helloWorldReducer,
    loginData: loginReducer,
    navBarData: navBarReducer,
    todoListData: todoReducer,
    routing: routerReducer
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

sagaMiddleware.run(rootSaga, { history: browserHistory });

export default store