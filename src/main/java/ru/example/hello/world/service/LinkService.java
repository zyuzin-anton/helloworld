package ru.example.hello.world.service;

import ru.example.hello.world.dto.LinkDto;
import ru.example.hello.world.entity.Link;

import java.util.List;

public interface LinkService extends BaseService<Link, Long> {

    List<LinkDto> findAll();
}
