package xyz.fmcy.pt.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author 付高宏
 * @date 2022/11/4 14:17
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseMsg<T> {
    private Integer code;
    private T data;
}
