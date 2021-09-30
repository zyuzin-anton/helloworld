package ru.example.hello.world.dto;

import lombok.Builder;
import lombok.Data;

import java.time.ZonedDateTime;

@Data
@Builder
public class TodoCell {
    private Long id;
    private ZonedDateTime time;
    private String description;
}
