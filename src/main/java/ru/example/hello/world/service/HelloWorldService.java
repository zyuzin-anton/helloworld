package ru.example.hello.world.service;

import reactor.core.publisher.Mono;
import ru.example.hello.world.dto.HelloWorldDto;
import ru.example.hello.world.entity.Hello;

public interface HelloWorldService extends BaseService<Hello, Long> {

    Mono<HelloWorldDto> find(Long id);
}
