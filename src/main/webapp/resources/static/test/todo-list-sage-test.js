import { rootSaga } from '../src/redux/sagas'
import { call } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import { one } from '../src/utils'
import { todoReducer } from '../src/redux/reducers'
import chai from 'chai'
import { todoListRequested } from '../src/redux/actions'
import {createTodo, deleteTodo} from "../src/redux/actions/hello-world-actions";

it('should get todo list', async () => {
    const saga = expectSaga(rootSaga, { history: { push(route) {console.log('pushed: ', route)} } })
        .provide([
            [call(one, "get", "/rest/todo/month?year=2021&month=9"), { data: todoMonth }]
        ])
        .withReducer(todoReducer);

    const result = await saga.dispatch(todoListRequested(2021, 9)).run();

    chai.expect(result.storeState.todoMonth.weeks[0].days[0].day).to.equal('30');
});

it('should create todo', async () => {
    let date = new Date();
    date.setFullYear(2021, 9, 1);

    const time = new Date();
    time.setHours(11, 0);
    const description = "descr";
    date.setHours(11, 0, 0, 0);

    const todoData = {date, description};

    const saga = expectSaga(rootSaga, { history: { push(route) {console.log('pushed: ', route)} } })
        .provide([
            [call(one, 'post', '/rest/todo', todoData), {data: {weekOfMonth: 1, dayOfWeek: 3, todoCell: {time: time, description: description}}}]
        ])
        .withReducer(todoReducer)
        .withState({todoMonth});

    const result = await saga.dispatch(createTodo(date, description)).run();

    chai.expect(result.storeState.todoMonth.weeks[0].days[2].todoCells[0].description).to.equal(description);
});

it('should delete todo', async () => {
    const todoId = 3;
    const saga = expectSaga(rootSaga, { history: { push(route) {console.log('pushed: ', route)} } })
        .provide([
            [call(one, "delete", "/rest/todo?id=3"), {data: {weekOfMonth: 2, dayOfWeek: 1, id: todoId}}]
        ])
        .withReducer(todoReducer).
        withState({todoMonth});

    const result = await saga.dispatch(deleteTodo(todoId)).run();

    chai.expect(result.storeState.todoMonth.weeks[1].days[0].todoCells.length).to.equal(1);
    chai.expect(result.storeState.todoMonth.weeks[1].days[0].todoCells[0].description).to.equal("Leave");
});

let date = new Date();
date.setHours(11, 0);
let oneMoreDate = new Date();
oneMoreDate.setHours(12, 0);

const todoMonth = {weeks: [
        {days: [
                {day: '30', todoCells: [{id: 1, time: date, description: "qwe"}, {id: 2, time: oneMoreDate, description: "qwe!"}]}, {day: '31'}, {day: '1'}, {day: '2'}, {day: '3'}, {day: '4'}, {day: '5'}
            ]},
        {days: [
                {day: '6', todoCells: [{id: 3, time: date, description: "Delete"}, {id: 2, time: oneMoreDate, description: "Leave"}]}, {day: '7'}, {day: '8'}, {day: '8'}, {day: '10'}, {day: '11'}, {day: '12'}
            ]},
        {days: [
                {day: '13'}, {day: '14'}, {day: '15', todoCells: [{time: date, description: "qwe"}, {time: oneMoreDate, description: "qwe!"}]}, {day: '16'}, {day: '17'}, {day: '18'}, {day: '19'}
            ]},
        {days: [
                {day: '20'}, {day: '21'}, {day: '22'}, {day: '23'}, {day: '24'}, {day: '25'}, {day: '26'}
            ]},
        {days: [
                {day: '27'}, {day: '28'}, {day: '29'}, {day: '30'}, {day: '1'}, {day: '2'}, {day: '3'}
            ]}
    ]};