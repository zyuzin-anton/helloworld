package ru.example.hello.world.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class TodoMonth {
    private List<TodoWeek> weeks = new ArrayList<>();
}
