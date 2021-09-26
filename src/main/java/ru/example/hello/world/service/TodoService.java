package ru.example.hello.world.service;

import reactor.core.publisher.Mono;
import ru.example.hello.world.dto.CreatedTodo;
import ru.example.hello.world.dto.DeletedTodo;
import ru.example.hello.world.dto.TodoData;
import ru.example.hello.world.dto.TodoMonth;

public interface TodoService {
    Mono<TodoMonth> findMonthlyTodo(int year, int month, String userId);
    Mono<CreatedTodo> createTodo(TodoData todoData, String userId);
    Mono<DeletedTodo> deleteTodo(Long id);
}
