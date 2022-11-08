package xyz.fmcy.adminserver.controller;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import xyz.fmcy.adminserver.service.AlyService;
import xyz.fmcy.adminserver.service.AdminService;
import xyz.fmcy.adminserver.service.UserService;
import xyz.fmcy.pt.em.CaptchaStatus;
import xyz.fmcy.pt.vo.CaptchaStatusVo;
import xyz.fmcy.pt.vo.LoginStatus;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.Objects;

/**
 * 模块-管理员
 * @author 付高宏
 * @date 2022/10/31 11:30
 */
@Controller
@RequestMapping("/admin")
public class AdminController {
    @Resource
    private RedisTemplate<String, Object> redisTemplate;
    @Resource
    private AdminService adminService;
    @Resource
    private UserService userService;
    @Resource
    private AlyService alyService;

    /**
     * 获取登录验证码
     * @param phone 手机号
     */
    @GetMapping("/login/captcha")
    @ResponseBody
    public CaptchaStatusVo login(String phone) {
        CaptchaStatusVo captchaStatus = new CaptchaStatusVo();
        if (!userService.hasUserByPhone(phone)) {
            captchaStatus.setCaptchaStatus(CaptchaStatus.CAPTCHA_STATUS_1);
            captchaStatus.setData("手机号未注册");
        }else {
            captchaStatus.setCaptchaStatus(CaptchaStatus.CAPTCHA_STATUS_0);
            captchaStatus.setData(alyService.loginSms(phone));
        }
        return captchaStatus;
    }

    /**
     * 管理员登录
     * @param phone 手机号
     * @param password 密码
     * @param captcha 验证码
     */
    @PostMapping("/login")
    @ResponseBody
    public LoginStatus login(String phone, String password, String captcha, HttpSession session) {
        LoginStatus status = adminService.checkTheCaptchaAndLogin(phone, password, captcha);
        if (Objects.equals(status.getCode(), xyz.fmcy.pt.em.LoginStatus.LOGIN_STATUS_0.code)) {
            session.setAttribute("admin", status.getData());
        }
        return status;
    }


}
