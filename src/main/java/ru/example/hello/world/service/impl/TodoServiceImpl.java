package ru.example.hello.world.service.impl;

import lombok.AllArgsConstructor;
import lombok.val;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;
import ru.example.hello.world.dto.CreatedTodo;
import ru.example.hello.world.dto.DeletedTodo;
import ru.example.hello.world.dto.TodoData;
import ru.example.hello.world.dto.TodoMonth;
import ru.example.hello.world.mapper.TodoMapper;
import ru.example.hello.world.repository.TodoRepository;
import ru.example.hello.world.service.TodoService;

import java.time.LocalDate;

@Service
@AllArgsConstructor
public class TodoServiceImpl implements TodoService {

    private TodoRepository todoRepository;
    private TodoMapper todoMapper;

    @Override
    @Transactional(readOnly = true)
    public Mono<TodoMonth> findMonthlyTodo(int year, int month, String userId) {
        val startDate = startDate(year, month);
        val endDate = endDate(year, month);
        return todoRepository.findByDateBetweenAndUserIdAndIsDeletedFalse(startDate, endDate, userId)
                .collectList()
                .map(todoEntities -> todoMapper.toTodoMonth(todoEntities, startDate, endDate));
    }

    @Override
    @Transactional
    public Mono<CreatedTodo> createTodo(TodoData todoData, String userId) {
        return todoRepository.save(todoMapper.toTodoEntity(todoData, userId)).map(todoMapper::toCreatedTodo);
    }

    @Override
    @Transactional
    public Mono<DeletedTodo> deleteTodo(Long id) {
        return todoRepository.deleteTodo(id).flatMap(row -> todoRepository.findById(id)).map(todoMapper::toDeletedTodo);
    }

    private LocalDate startDate(int year, int mont) {
        val firstDate = LocalDate.of(year, mont, 1);
        return firstDate.minusDays(firstDate.getDayOfWeek().getValue() - 1);
    }

    private LocalDate endDate(int year, int mont) {
        val lastDate = LocalDate.of(year, mont, 1).plusMonths(1).minusDays(1);
        return lastDate.plusDays(7 - lastDate.getDayOfWeek().getValue());
    }
}
