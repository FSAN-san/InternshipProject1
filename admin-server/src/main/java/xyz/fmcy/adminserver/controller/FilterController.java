package xyz.fmcy.adminserver.controller;

import io.github.yedaxia.apidocs.Ignore;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * @author 付高宏
 * @date 2022/11/8 8:52
 */
@Ignore
@RestController
@RequestMapping("/filter")
public class FilterController {

    public static final String ERROR = "error";

    @RequestMapping("/err")
    public Object getErrMsg(HttpServletRequest request) {
        return request.getAttribute(ERROR);
    }
}
