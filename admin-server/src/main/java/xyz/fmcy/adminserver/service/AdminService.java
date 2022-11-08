package xyz.fmcy.adminserver.service;

import xyz.fmcy.pt.vo.LoginStatus;
import xyz.fmcy.pt.vo.RegisterStatus;

/**
 * @author 付高宏
 * @date 2022/10/31 10:27
 */
public interface AdminService {

    /**
     * 管理员登录校验验证码并登录
     * @param phone 手机号
     * @param password 密码
     * @param captcha 验证码
     * @return 登录状态信息
     */
    LoginStatus checkTheCaptchaAndLogin(String phone, String password,String captcha);


}
