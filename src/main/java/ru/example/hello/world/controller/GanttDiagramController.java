package ru.example.hello.world.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ru.example.hello.world.dto.DiagramData;
import ru.example.hello.world.dto.LinkDto;
import ru.example.hello.world.dto.TaskDto;
import ru.example.hello.world.service.LinkService;
import ru.example.hello.world.service.TaskService;

import java.util.List;

@RestController
public class GanttDiagramController extends BaseController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private LinkService linkService;

    @RequestMapping(path = "rest/diagram/data", method = RequestMethod.GET)
    public DiagramData getDigramData() {
        List<TaskDto> taskDtos = taskService.findAll();
        List<LinkDto> linkDtos = linkService.findAll();

        return new DiagramData(taskDtos, linkDtos);
    }
}
