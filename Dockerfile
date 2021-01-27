# build
FROM maven
WORKDIR /usr/src/app
COPY . .
RUN mvn clean install

# package without maven
FROM openjdk
COPY --from=0 /usr/src/app/target/*.jar ./
CMD ["sh", "-c", "java -Dserver.port=$PORT -Xmx300m -Xss512k -XX:CICompilerCount=2 -Dfile.encoding=UTF-8 -XX:+UseContainerSupport -jar ./ru.exmaple.hello.world-1.0-SNAPSHOT.jar"]