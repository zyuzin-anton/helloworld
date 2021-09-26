package ru.example.hello.world.controller;

import lombok.val;
import org.junit.After;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.reactive.server.WebTestClient;
import ru.example.hello.world.AppLauncher;
import ru.example.hello.world.dto.CreatedTodo;
import ru.example.hello.world.dto.DeletedTodo;
import ru.example.hello.world.dto.TodoData;
import ru.example.hello.world.dto.TodoMonth;

import java.time.LocalDateTime;
import java.util.Objects;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

@RunWith(SpringRunner.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
@SpringBootTest(classes= AppLauncher.class, webEnvironment=SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class TodoRestControllerTest {
    @Autowired
    private WebTestClient webTestClient;

    @Autowired
    private DatabaseClient databaseClient;

    @Before
    public void initData() {
        databaseClient
                .sql("insert into todo(date, description, user_id) values (parsedatetime('30-08-2021 11:00:00.069', 'dd-MM-yyyy hh:mm:ss.SS'), 'do something', 'user')")
                .then()
                .block();

        databaseClient
                .sql("insert into todo(date, description, user_id) values (parsedatetime('06-09-2021 11:00:00.069', 'dd-MM-yyyy hh:mm:ss.SS'), 'Delete', 'user')")
                .then()
                .block();
    }

    @After
    public void cleanData() {
        databaseClient
                .sql("delete from todo")
                .then().block();
    }

    @Test
    @WithMockUser
    public void getTodo() {
        val todoMonth = webTestClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/rest/todo/month")
                        .queryParam("year", "2021")
                        .queryParam("month", "9")
                        .build())
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus().isOk()
                .returnResult(TodoMonth.class)
                .getResponseBody()
                .blockFirst();

        assertNotNull(todoMonth);
        assertEquals(todoMonth.getWeeks().size(), 5);
        assertEquals(todoMonth.getWeeks().get(0).getDays().size(), 7);
        assertEquals(todoMonth.getWeeks().get(0).getDays().get(0).getDay(), "30");
    }

    @Test
    @WithMockUser
    public void postTodo() {
        val todoData = new TodoData();
        todoData.setDate(LocalDateTime.of(2021, 9, 1, 11, 0));
        todoData.setDescription("descr");
        val createdTodo = webTestClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/rest/todo")
                        .build())
                .bodyValue(todoData)
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus().isOk()
                .returnResult(CreatedTodo.class)
                .getResponseBody()
                .blockFirst();

        assertNotNull(createdTodo);
        assertEquals(createdTodo.getWeekOfMonth().longValue(), 1L);
        assertEquals(createdTodo.getDayOfWeek().longValue(), 3L);
        assertEquals(createdTodo.getTodoCell().getDescription(), "descr");
    }

    @Test
    @WithMockUser
    public void deleteTodo() {
        val todoId = (Integer) Objects
                .requireNonNull(
                        databaseClient
                                .sql("select id from todo where date = parsedatetime('06-09-2021 11:00:00.069', 'dd-MM-yyyy hh:mm:ss.SS')")
                                .fetch()
                                .one()
                                .block()
                ).get("ID");

        val deletedTodo = webTestClient.delete()
                .uri(uriBuilder -> uriBuilder
                        .path("/rest/todo")
                        .queryParam("id", todoId)
                        .build())
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus().isOk()
                .returnResult(DeletedTodo.class)
                .getResponseBody()
                .blockFirst();

        assertNotNull(deletedTodo);
        assertEquals(deletedTodo.getWeekOfMonth().longValue(), 2L);
        assertEquals(deletedTodo.getDayOfWeek().longValue(), 1L);
        assertEquals(deletedTodo.getId().intValue(), todoId.intValue());
    }
}
