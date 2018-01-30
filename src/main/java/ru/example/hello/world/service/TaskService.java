package ru.example.hello.world.service;

import ru.example.hello.world.dto.TaskDto;
import ru.example.hello.world.entity.Task;

import java.util.List;

public interface TaskService extends BaseService<Task, Long> {

    List<TaskDto> findAll();
}
