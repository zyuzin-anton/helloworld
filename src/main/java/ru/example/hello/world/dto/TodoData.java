package ru.example.hello.world.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TodoData {
    private LocalDateTime date;
    private String description;
}
