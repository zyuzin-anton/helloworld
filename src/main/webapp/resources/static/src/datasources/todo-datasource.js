import { call } from 'redux-saga/effects'
import { one } from "../utils";

export function *getTodoList({year, month}) {
    return yield call(one, 'get', `/rest/todo/month?year=${year}&month=${month}`);
}

export function *postTodo(todoData) {
    return yield call(one, 'post', '/rest/todo', todoData);
}

export function *deleteTodo(todoId) {
    return yield call(one, 'delete', `/rest/todo?id=${todoId}`)
}