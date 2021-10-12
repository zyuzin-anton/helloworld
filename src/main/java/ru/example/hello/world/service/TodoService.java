package ru.example.hello.world.service;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import ru.example.hello.world.dto.CreatedTodo;
import ru.example.hello.world.dto.DeletedTodo;
import ru.example.hello.world.dto.TodoData;
import ru.example.hello.world.dto.TodoMonth;
import ru.example.hello.world.dto.TodoUserData;

import java.time.LocalDateTime;

public interface TodoService {
    Mono<TodoMonth> findMonthlyTodo(int year, int month, String offset, String userId);
    Mono<CreatedTodo> createTodo(TodoData todoData, String userId, String username);
    Mono<DeletedTodo> deleteTodo(Long id, String offset);
    Flux<TodoUserData> findTodoInRateRange(LocalDateTime startDate, LocalDateTime endDate);
    Mono<TodoUserData> findNearestTodo(LocalDateTime dateTime, String username);
}
