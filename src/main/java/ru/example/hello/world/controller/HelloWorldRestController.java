package ru.example.hello.world.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.example.hello.world.dto.HelloWorldDto;
import ru.example.hello.world.service.HelloWorldService;

@RestController
public class HelloWorldRestController {

    @Autowired
    private HelloWorldService helloWorldService;

    @GetMapping(path = "rest/hello/world")
    public HelloWorldDto helloWorld(@RequestParam(name = "id") Long id) {
        return helloWorldService.find(id);
    }
}
