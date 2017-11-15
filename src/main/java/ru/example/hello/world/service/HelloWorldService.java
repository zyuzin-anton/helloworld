package ru.example.hello.world.service;

import ru.example.hello.world.dto.HelloWorldDto;
import ru.example.hello.world.entity.Hello;

public interface HelloWorldService extends BaseService<Hello, Long> {

    HelloWorldDto find(Long id);
}
