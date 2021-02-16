import { helloWorldSaga } from '../src/redux/sagas'
import { call } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import { getOne } from '../src/utils'
import { helloWorldReducer } from '../src/redux/reducers'
import chai from 'chai'
import {
    helloWorldMessageRequested
} from '../src/redux/actions'

it('should get "Hello, World!" description', async () => {
    const saga = expectSaga(helloWorldSaga)
        .provide([
            [call(getOne, "/rest/hello/world?id=1"), { data: { description: 'Hello, World!' }}]
        ])
        .withReducer(helloWorldReducer);

    const result = await saga.dispatch(helloWorldMessageRequested()).run();

    chai.expect(result.storeState.message).to.equal('Hello, World!');
});