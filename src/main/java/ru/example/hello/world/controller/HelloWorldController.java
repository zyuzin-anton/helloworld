package ru.example.hello.world.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HelloWorldController extends BaseController {

    @GetMapping(path = "/")
    public String index() {
        return "index";
    }
}
