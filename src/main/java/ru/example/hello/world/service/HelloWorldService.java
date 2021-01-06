package ru.example.hello.world.service;

import reactor.core.publisher.Mono;
import ru.example.hello.world.dto.HelloWorldDto;

public interface HelloWorldService {

    Mono<HelloWorldDto> find(Long id);
}
