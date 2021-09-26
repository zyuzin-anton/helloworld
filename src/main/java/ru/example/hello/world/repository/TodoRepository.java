package ru.example.hello.world.repository;

import org.springframework.data.r2dbc.repository.Modifying;
import org.springframework.data.r2dbc.repository.Query;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import ru.example.hello.world.entity.TodoEntity;

import java.time.LocalDate;

public interface TodoRepository extends BaseRepository<TodoEntity> {

    Flux<TodoEntity> findByDateBetweenAndUserIdAndIsDeletedFalse(LocalDate startDate, LocalDate endDate, String userId);

    @Modifying
    @Query("update todo set is_deleted = true where id = $1")
    Mono<Integer> deleteTodo(Long id);
}
