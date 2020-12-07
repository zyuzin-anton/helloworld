package ru.example.hello.world.repository;

import org.springframework.data.r2dbc.repository.R2dbcRepository;
import ru.example.hello.world.entity.BaseEntity;

public interface BaseRepository<T extends BaseEntity> extends R2dbcRepository<T, Long> {
}
