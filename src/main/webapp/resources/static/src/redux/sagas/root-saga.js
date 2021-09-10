import { processHelloWorldSagas } from './hello-world-sagas'
import {processLoginSagas} from "./login-sagas";

export function *rootSaga({history}) {
    yield* [
        ...processLoginSagas({history}),
        ...processHelloWorldSagas()
    ]
}