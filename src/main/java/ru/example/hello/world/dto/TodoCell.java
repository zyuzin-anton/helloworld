package ru.example.hello.world.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TodoCell {
    private Long id;
    private String time;
    private String description;
}
