# build
FROM maven
WORKDIR /usr/src/app
COPY pom.xml .
RUN mvn -B -e -C -T 1C org.apache.maven.plugins:maven-dependency-plugin:3.1.1:go-offline
COPY . .
RUN mvn -B -e -o -T 1C verify

# package without maven
FROM openjdk
COPY --from=0 /usr/src/app/target/*.jar ./
CMD ["sh", "-c", "java -jar ./ru.exmaple.hello.world-1.0-SNAPSHOT.jar"]