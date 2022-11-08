package xyz.fmcy.pt.error;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author 付高宏
 * @date 2022/11/7 17:31
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestAttrErrorMsg {
    private Integer code;
    private String msg;
}
