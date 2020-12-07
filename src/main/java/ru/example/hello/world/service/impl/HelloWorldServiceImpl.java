package ru.example.hello.world.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;
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

    @Transactional(readOnly = true)
    public Mono<HelloWorldDto> find(Long id) {
        return helloWorldRepository.findById(id).map(entity -> helloWorldMapper.toDto(entity));
    }
}
