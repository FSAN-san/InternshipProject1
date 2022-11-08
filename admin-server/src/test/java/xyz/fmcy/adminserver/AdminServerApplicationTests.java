package xyz.fmcy.adminserver;

import io.github.yedaxia.apidocs.Docs;
import io.github.yedaxia.apidocs.DocsConfig;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
class AdminServerApplicationTests {

    @Test
    void contextLoads() {
        DocsConfig config = new DocsConfig();
        config.setProjectPath("C:\\Users\\付高宏\\IdeaProjects\\pt\\admin-server\\src"); // 项目根目录
        config.setProjectName("pt"); // 项目名称
        config.setApiVersion("V1.0");       // 声明该API的版本
        config.setDocsPath("C:\\Users\\付高宏\\Desktop"); // 生成API 文档所在目录
        config.setAutoGenerate(Boolean.TRUE);  // 配置自动生成
        Docs.buildHtmlDocs(config); // 执行生成文档
    }

}
