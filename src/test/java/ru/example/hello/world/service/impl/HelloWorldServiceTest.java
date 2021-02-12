package ru.example.hello.world.service.impl;

import lombok.val;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;
import ru.example.hello.world.dto.HelloWorldDto;
import ru.example.hello.world.entity.Hello;
import ru.example.hello.world.mapper.HelloWorldMapper;
import ru.example.hello.world.repository.HelloWorldRepository;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class HelloWorldServiceTest {

    @Mock
    private HelloWorldRepository helloWorldRepository;

    @Mock
    private HelloWorldMapper helloWorldMapper;

    @InjectMocks
    private HelloWorldServiceImpl helloWorldService;

    private Long existedId = 1L;
    private Long nonExistedId = 2L;
    private String description = "Hello, World!";

    @Before
    public void init() {
        val helloMock = Mono.just(Mockito.mock(Hello.class));
        when(helloWorldRepository.findById(nonExistedId)).thenReturn(Mono.empty());
        when(helloWorldRepository.findById(existedId)).thenReturn(helloMock);

        val helloWorldDtoMock = Mockito.mock(HelloWorldDto.class);
        when(helloWorldDtoMock.getDescription()).thenReturn(description);

        when(helloWorldMapper.toDto(helloMock.block())).thenReturn(helloWorldDtoMock);
    }

    @Test
    public void successFind() {
        val result = helloWorldService.find(existedId);

        assertEquals(result.block().getDescription(), description);
    }

    @Test(expected = ResponseStatusException.class)
    public void failFind() {
        val result = helloWorldService.find(nonExistedId);

        result.block();
    }
}
