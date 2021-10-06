package ru.example.hello.world.mapper;

import lombok.val;
import lombok.var;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import ru.example.hello.world.dto.CreatedTodo;
import ru.example.hello.world.dto.DeletedTodo;
import ru.example.hello.world.dto.TodoCell;
import ru.example.hello.world.dto.TodoData;
import ru.example.hello.world.dto.TodoDay;
import ru.example.hello.world.dto.TodoMonth;
import ru.example.hello.world.dto.TodoUserData;
import ru.example.hello.world.dto.TodoWeek;
import ru.example.hello.world.entity.TodoEntity;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.WeekFields;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface TodoMapper {


    @Mappings({
            @Mapping(target = "description", source = "todoData.description"),
            @Mapping(target = "date", source = "todoData.date"),
            @Mapping(target = "userId", source = "userId"),
            @Mapping(target = "username", source = "username")
    })
    TodoEntity toTodoEntity(TodoData todoData, String userId, String username);

    TodoUserData toTodoData(TodoEntity todoEntity);

    default CreatedTodo toCreatedTodo(TodoEntity todoEntity) {
        val weekFields = WeekFields.of(DayOfWeek.MONDAY, 1);
        val weekOfMonth = weekFields.weekOfMonth();
        return CreatedTodo.builder()
                .weekOfMonth((long) todoEntity.getDate().get(weekOfMonth))
                .dayOfWeek((long) todoEntity.getDate().getDayOfWeek().getValue())
                .todoCell(toTodoCell(todoEntity))
            .build();
    }

    default DeletedTodo toDeletedTodo(TodoEntity todoEntity) {
        val weekFields = WeekFields.of(DayOfWeek.MONDAY, 1);
        val weekOfMonth = weekFields.weekOfMonth();
        return DeletedTodo.builder()
                .weekOfMonth((long) todoEntity.getDate().get(weekOfMonth))
                .dayOfWeek((long) todoEntity.getDate().getDayOfWeek().getValue())
                .id(todoEntity.getId())
            .build();
    }

    default TodoMonth toTodoMonth(List<TodoEntity> todoEntities, LocalDate startDate, LocalDate endDate) {
        val todoMonth = new TodoMonth();
        var currentWeek = new TodoWeek();
        val nextDayAfterEndDate = endDate.plusDays(1);
        for (LocalDate currentDate = startDate; currentDate.isBefore(nextDayAfterEndDate); currentDate = currentDate.plusDays(1)) {
            final LocalDate finalCurrentDate = currentDate;
            val todoDay = new TodoDay();
            todoDay.setDay(String.format("%d", currentDate.getDayOfMonth()));
            todoDay.setMonth((long) currentDate.getMonthValue());
            todoDay.setYear((long) currentDate.getYear());
            todoDay.setTodoCells(todoEntities
                    .stream()
                    .filter(todoEntity ->
                            todoEntity
                                    .getDate()
                                    .withZoneSameInstant(ZoneId.systemDefault())
                                    .toLocalDate()
                                    .isEqual(finalCurrentDate)
                    )
                    .map(this::toTodoCell)
                    .collect(Collectors.toList())
            );

            currentWeek.getDays().add(todoDay);

            if (finalCurrentDate.getDayOfWeek().getValue() >= 7) {
                todoMonth.getWeeks().add(currentWeek);
                currentWeek = new TodoWeek();
            }
        }
        return todoMonth;
    }

    default TodoCell toTodoCell(TodoEntity todoEntity) {
        return TodoCell
                .builder()
                .id(todoEntity.getId())
                .time(todoEntity.getDate())
                .description(todoEntity.getDescription())
            .build();
    }
}
