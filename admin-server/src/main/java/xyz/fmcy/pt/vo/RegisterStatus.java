package xyz.fmcy.pt.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @author 付高宏
 * @date 2022/11/3 10:22
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterStatus implements Serializable {
    private Integer code;
    private String msg;
}
