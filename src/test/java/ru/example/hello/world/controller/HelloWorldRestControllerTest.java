package ru.example.hello.world.controller;

import lombok.val;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.reactive.server.WebTestClient;
import ru.example.hello.world.AppLauncher;
import ru.example.hello.world.dto.HelloWorldDto;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

@RunWith(SpringRunner.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
@SpringBootTest(classes= AppLauncher.class, webEnvironment=SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class HelloWorldRestControllerTest {

    @Autowired
    private WebTestClient webTestClient;

    @Test
    public void getHello() {
        val helloWorldDto = webTestClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/rest/hello/world")
                        .queryParam("id", "1")
                        .build())
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus().isOk()
                .returnResult(HelloWorldDto.class)
                .getResponseBody()
                .blockFirst();

        assertNotNull(helloWorldDto);
        assertEquals(helloWorldDto.getDescription(), "Hello, World!");
    }
}
