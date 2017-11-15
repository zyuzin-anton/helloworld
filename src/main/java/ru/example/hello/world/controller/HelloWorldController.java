package ru.example.hello.world.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import ru.example.hello.world.dto.HelloWorldDto;
import ru.example.hello.world.service.HelloWorldService;

@Controller
public class HelloWorldController extends BaseController {

    @Autowired
    private HelloWorldService helloWorldService;

    @RequestMapping(path = "hello/world", method = RequestMethod.GET)
    public ModelAndView index(@RequestParam(name = "id", required = true) Long id){
        HelloWorldDto helloWorldDto = helloWorldService.find(id);

        ModelAndView modelAndView = new ModelAndView("helloworld");

        modelAndView.addObject("helloWorld", helloWorldDto);

        return modelAndView;
    }
}
