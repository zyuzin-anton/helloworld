package ru.example.hello.world.mapper;

import ma.glasnost.orika.MappingContext;
import org.springframework.stereotype.Component;
import ru.example.hello.world.dto.HelloWorldDto;
import ru.example.hello.world.entity.Hello;

@Component
public class HelloWorldMapper extends BaseMapperAdapter<Hello, HelloWorldDto> {

    public HelloWorldMapper() {
    }

    @Override
    protected void mapAtoB(Hello hello, HelloWorldDto helloWorldDto, MappingContext context) {
        helloWorldDto.setDescription(hello.getDescription());
    }
}
