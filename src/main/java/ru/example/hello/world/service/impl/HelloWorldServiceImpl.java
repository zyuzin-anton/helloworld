package ru.example.hello.world.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.example.hello.world.dao.BaseDao;
import ru.example.hello.world.dao.DaoFactory;
import ru.example.hello.world.dto.HelloWorldDto;
import ru.example.hello.world.entity.Hello;
import ru.example.hello.world.mapper.HelloWorldMapper;
import ru.example.hello.world.service.HelloWorldService;

@Service
public class HelloWorldServiceImpl extends BaseServiceImpl<Hello, Long> implements HelloWorldService {

    @Autowired
    private DaoFactory daoFactory;

    @Autowired
    private HelloWorldMapper helloWorldMapper;

    @Transactional(readOnly = true)
    public HelloWorldDto find(Long id) {
        BaseDao<Hello, Long> helloWorldDao = daoFactory.getDaoForClass(Hello.class);

        Hello hello = helloWorldDao.find(id);

        return helloWorldMapper.map(hello, HelloWorldDto.class);
    }
}
