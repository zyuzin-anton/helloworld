package ru.example.hello.world.controller;

import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import reactor.core.publisher.Mono;
import ru.example.hello.world.dto.HelloWorldDto;
import ru.example.hello.world.service.HelloWorldService;

@RestController
@AllArgsConstructor
public class HelloWorldRestController extends BaseController {

    private final HelloWorldService helloWorldService;

    @GetMapping(path = "/rest/hello/world")
    @PreAuthorize("hasRole('USER')")
    public Mono<HelloWorldDto> helloWorld(@RequestParam(name = "id") Long id) {
        return helloWorldService.find(id);
    }
}
