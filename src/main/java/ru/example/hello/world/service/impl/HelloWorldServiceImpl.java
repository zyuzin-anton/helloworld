package ru.example.hello.world.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;
import ru.example.hello.world.dto.HelloWorldDto;
import ru.example.hello.world.entity.Hello;
import ru.example.hello.world.mapper.HelloWorldMapper;
import ru.example.hello.world.repository.HelloWorldRepository;
import ru.example.hello.world.service.HelloWorldService;

@Service
@AllArgsConstructor
public class HelloWorldServiceImpl extends BaseServiceImpl<Hello, Long> implements HelloWorldService {

    private final HelloWorldRepository helloWorldRepository;

    private final HelloWorldMapper helloWorldMapper;

    @Transactional(readOnly = true)
    public Mono<HelloWorldDto> find(Long id) {
        return helloWorldRepository
                .findById(id)
                .map(helloWorldMapper::toDto)
                .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)));
    }
}
