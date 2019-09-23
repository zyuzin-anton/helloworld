package ru.example.hello.world.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpServerErrorException;
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
    public HelloWorldDto find(Long id) {
        Hello hello = helloWorldRepository.findById(id).orElseThrow(() -> new HttpServerErrorException(HttpStatus.NOT_FOUND));

        return helloWorldMapper.toDto(hello);
    }
}
