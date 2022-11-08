package xyz.fmcy.adminserver.controller;

import io.github.yedaxia.apidocs.Ignore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import xyz.fmcy.adminserver.service.AlyService;

import javax.annotation.Resource;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;

/**
 * @author 付高宏
 * @date 2022/11/2 15:32
 */
@Ignore
@Controller
public class DemoController {

    @Resource
    private AlyService alyService;

    @Value("${aliyu.oss.app.dirs.test-dir}")
    private String testDir;

    @Ignore
    @GetMapping("/demo")
    @ResponseBody
    public String test1() {
        File file = new File("0101");
        try (Writer writer = new FileWriter(file)) {
            writer.append("Hello World");
            writer.flush();
            alyService.uploadFile(testDir, "0101.txt", file);
        } catch (IOException e) {
            return "false";
        }
        return "true";
    }
}
