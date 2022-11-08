package xyz.fmcy.pt.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author 付高宏
 * @date 2022/11/2 17:11
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginStatus {
    private Integer code;
    private String msg;
    private Object data;

    public static LoginStatus getInstance(xyz.fmcy.pt.em.LoginStatus loginStatus) {
        LoginStatus status = new LoginStatus();
        status.setCode(loginStatus.code);
        status.setMsg(loginStatus.msg);
        return status;
    }
}
