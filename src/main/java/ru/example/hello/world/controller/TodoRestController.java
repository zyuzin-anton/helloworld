package ru.example.hello.world.controller;

import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
import ru.example.hello.world.dto.CreatedTodo;
import ru.example.hello.world.dto.DeletedTodo;
import ru.example.hello.world.dto.TodoData;
import ru.example.hello.world.dto.TodoMonth;
import ru.example.hello.world.service.TodoService;

import java.security.Principal;

@RestController
@AllArgsConstructor
@RequestMapping("/rest/todo")
public class TodoRestController extends BaseController {

    private final TodoService todoService;

    @GetMapping("/month")
    @PreAuthorize("hasRole('USER')")
    public Mono<TodoMonth> getTodoMonth(
            @RequestParam(name = "year") Long year,
            @RequestParam(name = "month") Long month,
            Principal principal
    ) {
        return todoService.findMonthlyTodo(year.intValue(), month.intValue(), principal.getName());
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public Mono<CreatedTodo> postTodo(@RequestBody TodoData todoData, Principal principal) {
        return todoService.createTodo(todoData, principal.getName());
    }

    @DeleteMapping
    @PreAuthorize("hasRole('USER')")
    public Mono<DeletedTodo> deleteTodo(@RequestParam(name = "id") Long id) {
        return todoService.deleteTodo(id);
    }
}
