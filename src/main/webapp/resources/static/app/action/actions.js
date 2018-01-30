import axios from 'axios';

export const GANTT_STARTED = 'GANTT_STARTED'
export const GANTT_FAILED = 'GANTT_FAILED'

function ganttStarted(data) {
    return {
        type: GANTT_STARTED,
        tasks: data
    }
}

function ganttFailed() {
    return {
        type: GANTT_FAILED
    }
}

export function initGantt() {
    return dispatch => {
        axios.get(
            'rest/diagram/data'
        ).then(result => {
            dispatch(ganttStarted(result.data));
        }).catch(result => {
            dispatch(ganttFailed());
        });
    }
}