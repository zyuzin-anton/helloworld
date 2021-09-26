import { processHelloWorldSagas } from './hello-world-sagas'
import {processLoginSagas} from "./login-sagas";
import {processTodoSagas} from "./todo-sagas";

export function *rootSaga({history}) {
    yield* [
        ...processLoginSagas({history}),
        ...processHelloWorldSagas(),
        ...processTodoSagas()
    ]
}