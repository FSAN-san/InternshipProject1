package xyz.fmcy.pt.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import xyz.fmcy.pt.em.CaptchaStatus;

import java.io.Serializable;

/**
 * @author 付高宏
 * @date 2022/11/3 10:38
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CaptchaStatusVo implements Serializable {

    private CaptchaStatus captchaStatus;
    private Object data;
}
