package ru.example.hello.world.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.example.hello.world.dto.HelloWorldDto;
import ru.example.hello.world.service.HelloWorldService;

@RestController
public class HelloWorldRestController {

    @Autowired
    private HelloWorldService helloWorldService;

    @RequestMapping(path = "rest/hello/world",method = RequestMethod.GET)
    public String helloWorld(@RequestParam(name = "id", required = true) Long id) {
        HelloWorldDto helloWorldDto = helloWorldService.find(id);

        return helloWorldDto.getDescription();
    }
}
