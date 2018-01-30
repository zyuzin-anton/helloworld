package ru.example.hello.world.mapper;

import ma.glasnost.orika.MappingContext;
import org.springframework.stereotype.Component;
import ru.example.hello.world.dto.TaskDto;
import ru.example.hello.world.entity.Task;

import java.util.Date;

@Component
public class TaskMapper extends BaseMapperAdapter<Task, TaskDto> {

    public TaskMapper() {
    }

    @Override
    protected void mapAtoB(Task task, TaskDto taskDto, MappingContext context) {
        super.mapAtoB(task, taskDto, context);

        taskDto.setId(task.getId());
        taskDto.setText(task.getName());
        taskDto.setDuration(task.getDuration());
        taskDto.setStartDate(task.getStartDate());

        Date currentDate = new Date();

        if (currentDate.getTime() > taskDto.getStartDate().getTime()) {
            Double progress = ( currentDate.getTime() - taskDto.getStartDate().getTime()) / (1000.d * 60.d * 60.d * 24.d);
            taskDto.setProgress(progress > 1.d ? 1.d : progress);
        } else {
            taskDto.setProgress(0.d);
        }
    }
}
