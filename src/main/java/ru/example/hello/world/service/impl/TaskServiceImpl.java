package ru.example.hello.world.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.example.hello.world.dao.BaseDao;
import ru.example.hello.world.dao.DaoFactory;
import ru.example.hello.world.dto.TaskDto;
import ru.example.hello.world.entity.Task;
import ru.example.hello.world.mapper.TaskMapper;
import ru.example.hello.world.service.TaskService;

import java.util.List;

@Service
public class TaskServiceImpl extends BaseServiceImpl<Task, Long> implements TaskService {

    @Autowired
    private DaoFactory daoFactory;

    @Autowired
    private TaskMapper taskMapper;

    @Override
    @Transactional(readOnly = true)
    public List<TaskDto> findAll() {
        BaseDao<Task, Long> baseDao = daoFactory.getDaoForClass(Task.class);

        List<Task> taskList = baseDao.findAll();

        return taskMapper.mapAsList(taskList, TaskDto.class);
    }
}
