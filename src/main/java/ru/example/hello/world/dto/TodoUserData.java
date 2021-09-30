package ru.example.hello.world.dto;

import lombok.Data;

@Data
public class TodoUserData extends TodoData {
    private String userId;
    private String username;
}
