import {CREATE_TODO, DELETE_TODO, TODO_LIST_REQUESTED} from "../action-types";
import { takeLatest } from 'redux-saga/effects'
import {getOrProcessError} from "../../utils";
import {deleteTodo, getTodoList, postTodo} from "../../datasources/todo-datasource";
import {
    todoCreatedFail,
    todoCreatedOk,
    todoDeletedFail,
    todoDeletedOk,
    todoListFail,
    todoListOk
} from "../actions/hello-world-actions";

export function processTodoSagas() {
    return [
        takeLatest(TODO_LIST_REQUESTED, handleFetchTodoList),
        takeLatest(CREATE_TODO, handleCreateTodo),
        takeLatest(DELETE_TODO, handleDeleteTodo)
    ]
}

function *handleFetchTodoList({year, month}) {
    yield *getOrProcessError(getTodoList, todoListOk, todoListFail, {year, month})
}

function *handleCreateTodo({todoData}) {
    yield *getOrProcessError(postTodo, todoCreatedOk, todoCreatedFail, todoData)
}

function *handleDeleteTodo({todoId}) {
    yield *getOrProcessError(deleteTodo, todoDeletedOk, todoDeletedFail, todoId)
}