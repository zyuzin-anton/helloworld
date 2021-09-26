import {
    CHANGE_TODO_DATE_HIDE, CHANGE_TODO_DATE_SHOW,
    NEXT_TODO_MONTH_HIDE, NEXT_TODO_MONTH_SHOW, PREV_TODO_MONTH_HIDE, PREV_TODO_MONTH_SHOW,
    TODO_CREATED_FAIL,
    TODO_CREATED_OK,
    TODO_CREATION_DIALOG_CLOSE,
    TODO_CREATION_DIALOG_OPEN, TODO_DELETE_FAIL, TODO_DELETE_OK, TODO_ERROR_MESSAGE_CLOSE,
    TODO_LIST_FAIL,
    TODO_LIST_OK
} from "../action-types";

const defaultState = {
    todoMonth: {},
    error: null,
    loading: true,
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    show: true,
    showDirection: 'up',
    todoCreationDialog: {
        open: false,
        date: null,
        time: null
    }
};

export function todoReducer(state = defaultState, action) {
    switch (action.type) {
        case TODO_LIST_OK: return todoListOk(state, action);
        case TODO_LIST_FAIL: return todoListFail(state, action);
        case TODO_CREATION_DIALOG_OPEN: return handleTodoCreationDialogOpen(state, action.day, true);
        case TODO_CREATION_DIALOG_CLOSE: return handleTodoCreationDialogOpen(state, null, false);
        case TODO_CREATED_OK: return handleTodoCreatedOk(state, action.createdTodo);
        case TODO_CREATED_FAIL: return handleTodoCreatedFail(state, action.error);
        case TODO_DELETE_OK: return handleTodoDeletedOk(state, action.deletedTodo);
        case TODO_DELETE_FAIL: return handleTodoDeletedFail(state, action.error);
        case TODO_ERROR_MESSAGE_CLOSE: return handleTodoErrorMessageCLose(state);
        case NEXT_TODO_MONTH_HIDE: return handleNextTodoMonthHide(state);
        case NEXT_TODO_MONTH_SHOW: return handleNextTodoMonthShow(state);
        case PREV_TODO_MONTH_HIDE: return handlePrevTodoMonthHide(state);
        case PREV_TODO_MONTH_SHOW: return handlePrevTodoMonthShow(state);
        case CHANGE_TODO_DATE_HIDE: return handleChangeTodoMonth(state, false);
        case CHANGE_TODO_DATE_SHOW: return handleChangeTodoMonth(state, true);
        default: return state
    }
}

function todoListOk({todoCreationDialog, show, showDirection}, {todoMonth, year, month}) {
    return {
        todoMonth,
        error: null,
        loading: false,
        year,
        month,
        todoCreationDialog,
        show,
        showDirection
    }
}

function todoListFail({year, month, todoCreationDialog}, {error}) {
    return {
        todoMonth: null,
        error,
        loading: false,
        year,
        month,
        todoCreationDialog,
        show: true,
        showDirection: 'up'
    };
}

function handleTodoCreationDialogOpen(state, day, open) {
    return {
        ...state,
        todoCreationDialog: {
            open,
            date: open ? new Date(state.year, state.month - 1, day) : null
        }
    }
}

function handleTodoCreatedOk(state, createdTodo) {
    let newState = {
        ...state, error: null
    };
    const todoForDay = newState.todoMonth.weeks[createdTodo.weekOfMonth-1].days[createdTodo.dayOfWeek-1];
    if (!todoForDay.todoCells) {
        todoForDay.todoCells = []
    }
    todoForDay.todoCells.push(createdTodo.todoCell);
    return newState;
}

function handleTodoCreatedFail(state, error) {
    return {...state, error}
}

function handleTodoDeletedOk(state, deletedTodo) {
    let newState = {
        ...state, error: null
    };
    const todoForDay = newState.todoMonth.weeks[deletedTodo.weekOfMonth-1].days[deletedTodo.dayOfWeek-1];
    if (!todoForDay.todoCells) {
        todoForDay.todoCells = []
    }
    todoForDay.todoCells = todoForDay.todoCells.filter((todoCell, index, arr) => todoCell.id !== deletedTodo.id);
    return newState;
}

function handleTodoDeletedFail(state, error) {
    console.log("handleTodoDeletedFail", error);
    return {...state, error}
}

function handleTodoErrorMessageCLose(state) {
    return {...state, error: null}
}

function handleNextTodoMonthHide(state) {
    return {...state, show: false, showDirection: 'up'}
}

function handleNextTodoMonthShow(state) {
    return {...state, show: true, showDirection: 'down'}
}

function handlePrevTodoMonthHide(state) {
    return {...state, show: false, showDirection: 'down'}
}

function handlePrevTodoMonthShow(state) {
    return {...state, show: true, showDirection: 'up'}
}

function handleChangeTodoMonth(state, show) {
    return {...state, show: show}
}