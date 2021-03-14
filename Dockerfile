### 基础镜像，使用alpine操作系统，openjkd使用8u201
FROM java:8

#应用构建成功后的jar文件被复制到镜像内，名字也改成了app.jar
ADD target/jpos-train-0.0.1-SNAPSHOT.jar app.jar

#暴露8080端口
EXPOSE 9091

#启动容器时的进程
ENTRYPOINT ["java","-jar","/app.jar"]
