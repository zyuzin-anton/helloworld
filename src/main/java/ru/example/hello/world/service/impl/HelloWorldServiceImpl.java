package ru.example.hello.world.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Scheduler;
import ru.example.hello.world.dto.HelloWorldDto;
import ru.example.hello.world.entity.Hello;
import ru.example.hello.world.mapper.HelloWorldMapper;
import ru.example.hello.world.repository.HelloWorldRepository;
import ru.example.hello.world.service.HelloWorldService;

@Service
public class HelloWorldServiceImpl extends BaseServiceImpl<Hello, Long> implements HelloWorldService {

    @Autowired
    private HelloWorldRepository helloWorldRepository;

    @Autowired
    private HelloWorldMapper helloWorldMapper;

    @Autowired
    @Qualifier("jdbcScheduler")
    private Scheduler jdbcScheduler;

    @Transactional(readOnly = true)
    public Mono<HelloWorldDto> find(Long id) {
        return Mono.defer(() -> Mono.just(helloWorldRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND))))
                .subscribeOn(jdbcScheduler)
                .map(entity -> helloWorldMapper.toDto(entity));
    }
}
