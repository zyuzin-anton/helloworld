package ru.example.hello.world.service.impl;

import ru.example.hello.world.entity.BaseEntity;
import ru.example.hello.world.service.BaseService;

import java.io.Serializable;

public abstract class BaseServiceImpl<ENTITY extends BaseEntity, ID extends Serializable> implements BaseService<ENTITY, ID> {
}
