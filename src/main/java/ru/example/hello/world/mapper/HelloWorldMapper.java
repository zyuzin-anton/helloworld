package ru.example.hello.world.mapper;

import org.mapstruct.Mapper;
import ru.example.hello.world.dto.HelloWorldDto;
import ru.example.hello.world.entity.Hello;

@Mapper(componentModel = "spring")
public interface HelloWorldMapper {
    HelloWorldDto toDto(Hello hello);
}
