package xyz.fmcy.adminserver.controller;

import org.springframework.web.bind.annotation.*;
import xyz.fmcy.adminserver.service.UserService;
import xyz.fmcy.pt.em.CaptchaStatus;
import xyz.fmcy.pt.vo.CaptchaStatusVo;
import xyz.fmcy.pt.vo.RegisterRequest;
import xyz.fmcy.pt.vo.RegisterStatus;

import javax.annotation.Resource;

/**
 * 模块-用户
 * @author 付高宏
 * @date 2022/11/3 16:13
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Resource
    private UserService userService;

    /**
     * 用户注册获取验证码
     * @param phone 手机号
     */
    @GetMapping("/register/captcha")
    @ResponseBody
    public CaptchaStatusVo register(String phone) {
        CaptchaStatusVo captchaStatus = new CaptchaStatusVo();
        if (userService.hasUserByPhone(phone)) {
            captchaStatus.setCaptchaStatus(CaptchaStatus.CAPTCHA_STATUS_1);
            captchaStatus.setData("手机号已被注册");
        }else {
            captchaStatus.setCaptchaStatus(CaptchaStatus.CAPTCHA_STATUS_0);
        }
        return captchaStatus;
    }

    /**
     * 用户注册申请
     * @param registerRequest 注册请求
     */
    @PostMapping("/register")
    @ResponseBody
    public RegisterStatus register(RegisterRequest registerRequest) {
        RegisterStatus registerStatus = new RegisterStatus();
        registerStatus.setCode(userService.register(registerRequest));
        return registerStatus;
    }
}
