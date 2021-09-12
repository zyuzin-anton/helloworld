[![Actions Status](https://github.com/zyuzin-anton/helloworld/workflows/Java%20CI/badge.svg)](https://github.com/zyuzin-anton/helloworld/actions)

HelloWorld project that prints "Hello, World!" message using modern technologies and tools(such as Spring-boot, FlyWay, Reactor, Actuator, Swagger, React-Redux, etc) just for fun.

### Prerequisites
* JDK8 and higher
* Maven
### or
*Docker

Run next command to start application:
```
docker-compose --profile web up --build
```
it builds the app and runs it along with keycloak server(add `127.0.0.1 keycloak` to your hosts file)

Also, you could run keycloak server separately:
```
docker-compose up
```
and then choose one of the next options to run the app
```
mvn install spring-boot:run
```
or:
```
mvn install
java -jar ./target/ru.exmaple.hello.world-1.0-SNAPSHOT.jar 
```
or if you use docker:
```
docker build -t helloworld . 
docker run --rm -it -p 127.0.0.1:8080:8080 helloworld
```

Here we have:
* Main page(http://localhost:8080)
* Health check(http://localhost:8080/actuator/health)
* Swagger UI(http://localhost:8080/swagger-ui/)

Also you could visit website to check the app in work: https://shabrack-helloworld.herokuapp.com.