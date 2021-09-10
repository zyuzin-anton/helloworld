global.window = {};
import 'mock-local-storage'
window.localStorage = global.localStorage;

import { rootSaga } from '../src/redux/sagas'
import { call } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import {one, isAuthenticated} from '../src/utils'
import { helloWorldReducer } from '../src/redux/reducers'
import chai from 'chai'
import {
    helloWorldMessageRequested, loginRequested
} from '../src/redux/actions'

it('should get "Hello, World!" description', async () => {
    const saga = expectSaga(rootSaga, { history: { push(route) {console.log('pushed: ', route)} } })
        .provide([
            [call(one, "get", "/rest/hello/world?id=1"), { data: { description: 'Hello, World!' }}]
        ])
        .withReducer(helloWorldReducer);

    const result = await saga.dispatch(helloWorldMessageRequested()).run();

    chai.expect(result.storeState.message).to.equal('Hello, World!');
});
/*
it('should get token', async () => {
    const saga = expectSaga(rootSaga, { history: { push(route) {console.log('pushed: ', route)} } } );

    await saga.dispatch(loginRequested('user', 'user')).run();

    chai.expect(isAuthenticated()).to.equal(true);
});*/