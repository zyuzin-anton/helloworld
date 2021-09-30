package ru.example.hello.world.dto;

import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class TodoData {
    private ZonedDateTime date;
    private String description;
}
