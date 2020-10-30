package ru.example.hello.world.query;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.example.hello.world.dto.HelloWorldDto;
import ru.example.hello.world.service.HelloWorldService;

import java.util.concurrent.Future;

@Component
public class HelloWorldQuery implements GraphQLQueryResolver {
    @Autowired
    private HelloWorldService helloWorldService;

    public Future<HelloWorldDto> getHelloWorld(Long id) {
        return helloWorldService.find(id).toFuture();
    }
}
