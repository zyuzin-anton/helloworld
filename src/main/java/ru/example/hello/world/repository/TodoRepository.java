package ru.example.hello.world.repository;

import org.springframework.data.r2dbc.repository.Modifying;
import org.springframework.data.r2dbc.repository.Query;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import ru.example.hello.world.entity.TodoEntity;

import java.time.LocalDateTime;

public interface TodoRepository extends BaseRepository<TodoEntity> {

    Flux<TodoEntity> findByDateBetweenAndUserIdAndIsDeletedFalse(LocalDateTime startDate, LocalDateTime endDate, String userId);

    @Modifying
    @Query("update todo set is_deleted = true where id = $1")
    Mono<Integer> deleteTodo(Long id);

    Flux<TodoEntity> findByDateBetweenAndIsDeletedFalse(LocalDateTime startDate, LocalDateTime endDate);

    Mono<TodoEntity> findFirstByDateAfterAndUsernameEqualsAndIsDeletedFalseOrderByDateAsc(LocalDateTime dateTime, String username);
}
