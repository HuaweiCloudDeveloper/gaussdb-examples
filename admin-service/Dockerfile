FROM openjdk:8-jdk-alpine
VOLUME /tmp /logs
ADD admin-service-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8003
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]