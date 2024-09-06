FROM openjdk:8-alpine
ADD admin-service/target/admin-service-0.0.1-SNAPSHOT.jar .
CMD ["java","-jar","admin-service-0.0.1-SNAPSHOT.jar"]

FROM openjdk:8-alpine
ADD authentication-server/target/authentication-server-0.0.1-SNAPSHOT.jar .
CMD ["java","-jar","authentication-server-0.0.1-SNAPSHOT.jar"]

FROM openjdk:8-alpine
ADD resource-server/target/resource-server-0.0.1-SNAPSHOT.jar .
CMD ["java","-jar","resource-server-0.0.1-SNAPSHOT.jar"]

FROM openjdk:8-alpine
ADD edge-service/target/edge-service-0.0.1-SNAPSHOT.jar .
CMD ["java","-jar","edge-service-0.0.1-SNAPSHOT.jar"]

FROM openjdk:8-alpine
ADD admin-website/target/admin-website-0.0.1-SNAPSHOT.jar .
CMD ["java","-jar","admin-website-0.0.1-SNAPSHOT.jar"]