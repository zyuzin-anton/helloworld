package ru.example.hello.world.repository;

import org.springframework.data.repository.CrudRepository;
import ru.example.hello.world.entity.BaseEntity;

public interface BaseRepository<T extends BaseEntity> extends CrudRepository<T, Long> {
}
