package ru.example.hello.world.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DeletedTodo {
    private Long weekOfMonth;
    private Long dayOfWeek;
    private Long id;
}
