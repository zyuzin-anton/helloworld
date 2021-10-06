package ru.example.hello.world.dto;

import lombok.Data;
import java.util.ArrayList;
import java.util.List;

@Data
public class TodoDay {
    private String day;
    private Long month;
    private Long year;
    private List<TodoCell> todoCells = new ArrayList<>();
}
