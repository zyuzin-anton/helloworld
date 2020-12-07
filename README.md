HelloWorld project that prints "Hello, World!" message using modern technologies and tools(such as Spring-boot, FlyWay, Reactor, Actuator, Swagger, GraphQL, React-Redux, etc) just for fun.

###Prerequisites
* JDK8 and higher
* Maven

Run next command to start application:
```
mvn install spring-boot:run
```

Here we have:
* Main page(http://localhost:8080)
* Health check(http://localhost:8080/actuator/health)
* Swagger UI(http://localhost:8080/swagger-ui.html)
* GraphQl UI(http://localhost:8080/graphiql)