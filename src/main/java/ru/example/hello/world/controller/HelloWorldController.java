package ru.example.hello.world.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import reactor.core.publisher.Mono;

@Controller
public class HelloWorldController extends BaseController {

    @GetMapping(path = "/")
    public Mono<String> index() {
        return Mono.just("index");
    }

    @GetMapping(path = "/login")
    public Mono<String> login() {
        return Mono.just("index");
    }
}
