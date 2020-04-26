一、简介：
    中文名：麦文。
    Maven项目对象模型(POM)，可以通过一小段描述信息来管理项目的构建，报告和文档的项目管理工具软件。
    Maven 除了以程序构建能力为特色之外，还提供高级项目管理工具。由于 Maven 的缺省构建规则有较高的可重用性，
    所以常常用两三行 Maven 构建脚本就可以构建简单的项目。由于 Maven 的面向项目的方法，许多 Apache Jakarta 项目发文时使用 Maven，
    而且公司项目采用 Maven 的比例在持续增长。
    Maven这个单词来自于意第绪语（犹太语），意为知识的积累，最初在Jakata Turbine项目中用来简化构建过程。
    当时有一些项目（有各自Ant build文件），仅有细微的差别，而JAR文件都由CVS来维护。于是希望有一种标准化的方式构建项目，
    一个清晰的方式定义项目的组成，一个容易的方式发布项目的信息，以及一种简单的方式在多个项目中共享JARs。
二、安装：
    
三、使用：
    
    2、官网：
        maven.apache.org
    3、maven中央仓库查询站点：
        http://www.mvnrepository.com/
        https://www.cnblogs.com/fysola/p/6957120.html
四、常用命令（以下命令是在项目根目录下执行）：
    1、compile：编译项目
        F:\FrontendProjects\vue-warehouse>mvn compile
    2、test：测试
        F:\FrontendProjects\vue-warehouse>mvn test
    3、clean：删除target目录。
        F:\FrontendProjects\vue-warehouse>mvn clean
    4、package：打包，如jar包或war包
        F:\FrontendProjects\vue-warehouse>mvn package
    5、install：安装jar包到本地仓库。
        F:\FrontendProjects\vue-warehouse>mvn install        

