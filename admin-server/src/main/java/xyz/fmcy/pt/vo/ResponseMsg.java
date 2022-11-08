package xyz.fmcy.pt.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

/**
 * @author 付高宏
 * @date 2022/11/4 14:17
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseMsg<T> {
    private Integer code;
    private String msg;
    private Timestamp time;
    private T data;
}
