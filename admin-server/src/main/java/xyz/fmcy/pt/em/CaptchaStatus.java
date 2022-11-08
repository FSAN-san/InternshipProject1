package xyz.fmcy.pt.em;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;

/**
 * @author 付高宏
 * @date 2022/11/3 10:51
 */
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
@Getter
public enum CaptchaStatus {
    /**
     * 获取成功
     */
    CAPTCHA_STATUS_0(0,"获取成功"),
    /**
     * 获取失败
     */
    CAPTCHA_STATUS_1(1,"获取失败");
    private final Integer code;
    private final String status;
    CaptchaStatus(Integer code, String status) {
        this.code = code;
        this.status = status;
    }
}
