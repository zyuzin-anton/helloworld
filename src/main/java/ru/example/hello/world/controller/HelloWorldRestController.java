package ru.example.hello.world.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import reactor.core.publisher.Mono;
import ru.example.hello.world.dto.HelloWorldDto;
import ru.example.hello.world.service.HelloWorldService;

@RestController
@AllArgsConstructor
public class HelloWorldRestController {

    private HelloWorldService helloWorldService;

    @GetMapping(path = "rest/hello/world")
    public Mono<HelloWorldDto> helloWorld(@RequestParam(name = "id") Long id) {
        return helloWorldService.find(id);
    }
}
