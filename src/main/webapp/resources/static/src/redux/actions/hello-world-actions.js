import {
    HELLO_WORLD_MESSAGE_REQUESTED,
    HELLO_WORLD_MESSAGE_OK,
    LOGIN_REQUESTED,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGIN_REFRESH_TOKEN,
    REFRESH_SUCCESS,
    LOGOUT,
    LOGIN_ERROR,
    DRAWER_CLOSE,
    DRAWER_OPEN,
    TODO_LIST_REQUESTED,
    TODO_LIST_OK,
    TODO_CREATION_DIALOG_OPEN,
    TODO_CREATION_DIALOG_CLOSE,
    CREATE_TODO,
    TODO_CREATED_OK,
    DELETE_TODO,
    TODO_DELETE_OK,
    NEXT_TODO_MONTH_HIDE,
    NEXT_TODO_MONTH_SHOW,
    PREV_TODO_MONTH_SHOW,
    PREV_TODO_MONTH_HIDE,
    CHANGE_TODO_DATE_HIDE,
    CHANGE_TODO_DATE_SHOW,
    ERROR_MESSAGE_CLOSE,
    ERROR_MESSAGE_SHOW
} from '../action-types'

export function helloWorldMessageRequested() {
    return {
        type: HELLO_WORLD_MESSAGE_REQUESTED
    }
}

export function helloWorldMessageOk({description}) {
    return {
        type: HELLO_WORLD_MESSAGE_OK,
        message: description
    }
}

export function loginRequested(login, password) {
    return {
        type: LOGIN_REQUESTED,
        login,
        password
    }
}

export function loginSuccess(token) {
    return {
        type: LOGIN_SUCCESS,
        token
    }
}

export function loginFailed(error) {
    return {
        type: LOGIN_FAILED,
        error
    }
}

export function loginRefreshToken(token) {
    return {
        type: LOGIN_REFRESH_TOKEN,
        token
    }
}

export function refreshSuccess() {
    return {
        type: REFRESH_SUCCESS
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
}

export function loginError(errorMessage) {
    return {
        type: LOGIN_ERROR,
        errorMessage
    }
}

export function handleDrawerOpen() {
    return {
        type: DRAWER_OPEN
    }
}

export function handleDrawerClose() {
    return {
        type: DRAWER_CLOSE
    }
}

export function todoListRequested(year, month) {
    return {
        type: TODO_LIST_REQUESTED,
        year,
        month
    }
}

export function todoListOk(todoMonth, {year, month}) {
    return {
        type: TODO_LIST_OK,
        todoMonth,
        year,
        month
    }
}

export function todoCreationDialogOpen(day) {
    return {
        type: TODO_CREATION_DIALOG_OPEN,
        day
    }
}

export function todoCreationDialogClose() {
    return {
        type: TODO_CREATION_DIALOG_CLOSE
    }
}

export function createTodo(date, description) {
    return {
        type: CREATE_TODO,
        todoData: {
            date,
            description
        }
    }
}

export function todoCreatedOk(createdTodo) {
    return {
        type: TODO_CREATED_OK,
        createdTodo
    }
}

export function deleteTodo(todoId) {
    return {
        type: DELETE_TODO,
        todoId
    }
}

export function todoDeletedOk(deletedTodo) {
    return {
        type: TODO_DELETE_OK,
        deletedTodo
    }
}

export function nextTodoMonthHide() {
    return {
        type: NEXT_TODO_MONTH_HIDE
    }
}

export function nextTodoMonthShow() {
    return {
        type: NEXT_TODO_MONTH_SHOW
    }
}

export function prevTodoMonthHide() {
    return {
        type: PREV_TODO_MONTH_HIDE
    }
}

export function prevTodoMonthShow() {
    return {
        type: PREV_TODO_MONTH_SHOW
    }
}

export function changeTodoDateHide() {
    return {
        type: CHANGE_TODO_DATE_HIDE
    }
}

export function changeTodoDateShow() {
    return {
        type: CHANGE_TODO_DATE_SHOW
    }
}

export function errorMessageClose() {
    return {
        type: ERROR_MESSAGE_CLOSE
    }
}

export function errorMessageShow(error) {
    return {
        type: ERROR_MESSAGE_SHOW,
        error
    }
}