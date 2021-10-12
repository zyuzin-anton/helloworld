package ru.example.hello.world.service.impl;

import lombok.AllArgsConstructor;
import lombok.val;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import ru.example.hello.world.dto.CreatedTodo;
import ru.example.hello.world.dto.DeletedTodo;
import ru.example.hello.world.dto.TodoData;
import ru.example.hello.world.dto.TodoMonth;
import ru.example.hello.world.dto.TodoUserData;
import ru.example.hello.world.mapper.TodoMapper;
import ru.example.hello.world.repository.TodoRepository;
import ru.example.hello.world.service.TodoService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

@Service
@AllArgsConstructor
public class TodoServiceImpl implements TodoService {

    private TodoRepository todoRepository;
    private TodoMapper todoMapper;

    @Override
    @Transactional(readOnly = true)
    public Mono<TodoMonth> findMonthlyTodo(int year, int month, String offset, String userId) {
        val startDate = startDate(year, month);
        val endDate = endDate(year, month);
        val zoneOffset = ZoneOffset.from(DateTimeFormatter.ofPattern("XXX").parse(offset));
        return todoRepository.findByDateBetweenAndUserIdAndIsDeletedFalse(applyOffset(startDate, zoneOffset), applyOffset(endDate.plusDays(1), zoneOffset), userId)
                .collectList()
                .map(todoEntities -> todoMapper.toTodoMonth(todoEntities, startDate, endDate, zoneOffset));
    }

    @Override
    @Transactional
    public Mono<CreatedTodo> createTodo(TodoData todoData, String userId, String username) {
        return todoRepository.save(todoMapper.toTodoEntity(todoData, userId, username)).map(todoMapper::toCreatedTodo);
    }

    @Override
    @Transactional
    public Mono<DeletedTodo> deleteTodo(Long id, String offset) {
        val zoneOffset = ZoneOffset.from(DateTimeFormatter.ofPattern("XXX").parse(offset));
        return todoRepository
                .deleteTodo(id)
                .flatMap(row -> todoRepository.findById(id))
                .map(todoEntity -> todoMapper.toDeletedTodo(todoEntity, zoneOffset));
    }

    @Override
    public Flux<TodoUserData> findTodoInRateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return todoRepository.findByDateBetweenAndIsDeletedFalse(startDate, endDate).map(todoMapper::toTodoData);
    }

    @Override
    public Mono<TodoUserData> findNearestTodo(LocalDateTime dateTime, String username) {
        return todoRepository.findFirstByDateAfterAndUsernameEqualsAndIsDeletedFalseOrderByDateAsc(dateTime, username)
                .map(todoMapper::toTodoData);
    }

    private LocalDate startDate(int year, int mont) {
        val firstDate = LocalDate.of(year, mont, 1);
        return firstDate.minusDays(firstDate.getDayOfWeek().getValue() - 1);
    }

    private LocalDate endDate(int year, int mont) {
        val lastDate = LocalDate.of(year, mont, 1).plusMonths(1).minusDays(1);
        return lastDate.plusDays(7 - lastDate.getDayOfWeek().getValue());
    }

    private LocalDateTime applyOffset(LocalDate date, ZoneOffset offset) {
        return date.atStartOfDay().minusSeconds(offset.getTotalSeconds());
    }
}
