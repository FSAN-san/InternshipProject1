package xyz.fmcy.pt.em;

/**
 * @author 付高宏
 * @date 2022/11/2 17:14
 */
public enum LoginStatus implements java.io.Serializable{
    /**
     * 登陆成功
     */
    LOGIN_STATUS_0(0, "登录成功"),
    /**
     * 找不到用户
     */
    LOGIN_STATUS_1(1, "找不到用户"),
    /**
     * 密码错误
     */
    LOGIN_STATUS_2(2, "密码错误"),
    /**
     * 无权限
     */
    LOGIN_STATUS_3(3, "无权限"),
    /**
     * 验证码有误
     */
    LOGIN_STATUS_4(4, "验证码有误"),
    /**
     * 请先获取验证码
     */
    LOGIN_STATUS_5(5, "请先获取验证码");
    public final Integer code;
    public final String msg;

    LoginStatus(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public Integer getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }

    @Override
    public String toString() {
        return "LoginStatus{" +
                "code=" + code +
                ", msg='" + msg + '\'' +
                '}';
    }
}