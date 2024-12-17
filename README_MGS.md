Apache ServiceComb Fence是一个实现Open API规范的RPC框架，提供了配置管理、服务发现、动态路由、可观察性和服务治理功能，包含Java Chassis 3最佳实践的应用开发脚手架，可以帮助开发者快速构建包含微服务后端、微服务前端和基础原子服务的项目工程，Apache ServiceComb Fence项目遵循约定优于配置原则，定义了日志配置、Web配置、路由配置、代码结构等相关规范，以更加简洁的实现可观测性、过载防护等功能。

* 源码地址：https://github.com/apache/servicecomb-java-chassis
* 官网主页：https://servicecomb.apache.org/
* 主要开发语言：JAVA
* LICENSE：Apache 2.0
* 维护者：Apache ServiceComb PMC
* 项目数据：Fork 819, Star 1.9K, Contributor 136，最近一次提交：2024-12-12
* star历史（https://star-history.com/）:
  ![star历史](https://bbs-img.huaweicloud.com/blogs/img/20241215/1734256939140649317.png 'star历史')

**而本开源体验项目**在开源For Huawei项目[Open Source for Huawei](https://gitcode.com/HuaweiCloudDeveloper/OpenSourceForHuaweiDemoJava.git)(基于Apache ServiceComb Fence)
基础上进行接口开发，熟悉云原生应用的开发和部署，具体可以参考查看For Huawei项目[Wiki](https://gitcode.com/HuaweiCloudDeveloper/OpenSourceForHuaweiWiki)

开源For Huawei主要由如下几个微服务组成:
* edge-service: 微服务网关
* authentication-server: 认证服务
* resource-server: 资源服务
* admin-service: 微服务管理服务
* admin-website: 管理服务前端
# 开发前准备
* 安装开发工具IDE、JDK17、MAVEN、GIT、ZOOKEEPER等(省略)、
* Fork开源For Huawei项目[Open Source for Huawei](https://gitcode.com/HuaweiCloudDeveloper/OpenSourceForHuaweiDemoJava.git)到自己仓库，并建立分支
* 开发数据库: 本地Mysql或华为云GaussDB(推荐)
# 需求开发
* 下载源码并导入:
  ```
  git clone https://gitcode.com/xxxx/OpenSourceForHuaweiDemoJava.git
  mvn clean install
  ```
* 需求
  * 在resource-server中，集成MyBatis，并参考MyBatis的指南，开发一个数据库访问的示例，完成数据库的增、改、查操作;
  * 在resource-server中，开发一个REST服务，分别调用上述步骤中的增、改、查操作。
  * 项目架构如下图
    ![架构图](https://bbs-img.huaweicloud.com/blogs/img/20241215/1734257023068899275.png '架构图')
* 执行脚本和实现需求
  * authentication-server依赖数据库，找到 src/resource/sql/user.sql，在数据库执行该初始化脚本
  * 分析需求新增T_USER_TEST表
    ```
    CREATE TABLE T_USER_TEST (
       ID SERIAL NOT NULL,
       USER_NAME VARCHAR(64) NOT NULL,
       AGE TINYINT NOT NULL,
       PRIMARY KEY (ID)
    );
    ```
  * 在resource-server增加依赖(可不添加mysql)
    ```
       <dependency>
          <groupId>mysql</groupId>
          <artifactId>mysql-connector-java</artifactId>
          <version>8.0.33</version>
        </dependency>
      
        <dependency>
          <groupId>org.opengauss</groupId>
          <artifactId>opengauss-jdbc</artifactId>
          <version>5.1.0-og</version>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.22</version>
            <scope>provided</scope>
        </dependency>
    ```
  * resource-server\src\main\java\org\apache\servicecomb\fence\entity下创建实体User
      ```
        @Data
        public class User implements Serializable {
           private Long id;
           private String userName;
           private int age;
        }
      ```
  * resource-server\src\main\java\org\apache\servicecomb\fence\mapper下新建Mapper
      ```
        @Mapper
        public interface IUserMapper {
    
            @Insert("INSERT INTTO T_USER_TEST(USER_NAME, AGE) VALUES (#{userName}, #{age})")
            @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
            int save(User user);

            @Update("UPDATE T_USER_TEST SET USER_NAME = #{userName},age = #{age} WHERE id = #{id}")
            int update(User user);

            @Select("SELECT * FROM T_USER_TEST WHERE ID = #{id}")
            @Results(@Result(property = "userName", column = "USER_NAME"))
            User queryById(long id);
        }
      ```
  * resource-server-api\src\main\java\org\apache\servicecomb\fence\api\resource下新建UserService接口
      ```
        @RequestMapping(path = "/v1/user/method")
        public interface UserService {
    
            @RequestMapping(path = "/add", produces = MediaType.APPLICATION_JSON_VALUE)
            long addUser(@RequestParam(name = "userName") String userName, @RequestParam(name = "age") int age);
  
            @RequestMapping(path = "/update", produces = MediaType.APPLICATION_JSON_VALUE)
            boolean updateUser(@RequestParam(name = "id") long id, String userName, int age);
  
            @RequestMapping("/query/{id}")
            @ResponseBody
            String queryUser(@PathVariable long id);
        }
      ```
  * resource-server\src\main\java\org\apache\servicecomb\fence\resource下新建Endpoint实现
      ```
        @RestSchema(schemaId = "UserEndpoint", schemaInterface = UserService.class)
        public class UserEndpoint implements UserService {

        @Autowired
        IUserStoreService storeService;

        @Override
        public long addUser(String userName, int age) {
            User user = new User();
            user.setUserName(userName);
            user.setAge(age);
            long count = storeService.addUser(user);
            return count == 1 ? user.getId() : 0;
        }

        @Override
        public boolean updateUser(long id, String userName, int age) {
            User user = new User();
            user.setId(id);
            user.setUserName(userName);
            user.setAge(age);
            return storeService.updateUser(user);
        }

        @Override
        public String queryUser(long id) {
            User user = storeService.queryUser(id);
            return user == null ? "" : user.toString();
        }
      } 
      ```
  * resource-server中yaml文件中增加配置
      ```
        spring:
           datasource:
              url: ${DB_URL:jdbc:opengauss://ip:8000/数据库名称?currentSchema=Schema名称}
              username: ${DB_USERNAME:root}
              password: ${DB_PASSWORD:root}
              driver-class-name: org.opengauss.Driver
        mybatis:
           configuration:
              log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
              map-underscore-to-camel-case: true
      ```
* 本地测试满足需求后提交代码仓库
    ```
    git commit -m "commit"
    git push
    ```
# 服务部署验证
* 准备华为云服务器资源 参考[资源开通和规格信息](https://gitcode.com/HuaweiCloudDeveloper/OpenSourceForHuaweiWiki/blob/main/zh_CN/docs/resource-versions.md)购买
* 流水线CodeArts打包构建推送镜像部署应用[华为云部署示例项目](https://gitcode.com/HuaweiCloudDeveloper/OpenSourceForHuaweiWiki/blob/main/zh_CN/docs/cicd-pipeline.md)
* 验证: 在edge-service部署后的负载均衡查看ip地址,浏览器打开 http://ip地址:9090/ui/admin/
  * ![主页地址](https://bbs-img.huaweicloud.com/blogs/img/20241217/1734418433274301128.png)
  * ![测试Api地址](https://bbs-img.huaweicloud.com/blogs/img/20241217/1734418495841959740.png)
* 本次开发增加三个接口:
  * http://xxxx:9090/api/resource/v1/user/method/add
  * http://xxxx:9090/api/resource/v1/user/method/update
  * http://xxxx:9090/api/resource/v1/user/method/query/{id}

