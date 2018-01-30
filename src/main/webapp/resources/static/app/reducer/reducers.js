import { combineReducers } from 'redux'
import {
  GANTT_STARTED,
  GANTT_FAILED
} from '../action/actions'

function processGantt(state = { tasks: null }, action) {
    switch(action.type) {
        case GANTT_STARTED:
            return {
                tasks: action.tasks,
                errors: false
            };
         case GANTT_FAILED:
            return {
                errors: true
            }

        default:
            return state;
    }
}

const rootReducer = combineReducers({
  processGantt
})

export default rootReducer