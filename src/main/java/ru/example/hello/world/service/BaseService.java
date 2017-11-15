package ru.example.hello.world.service;

import ru.example.hello.world.entity.BaseEntity;

import java.io.Serializable;

public interface BaseService<ENTITY extends BaseEntity, ID extends Serializable> {
}
