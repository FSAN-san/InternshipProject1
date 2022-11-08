package xyz.fmcy.pt.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author 付高宏
 * @date 2022/10/27 16:14
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TableDataList<T> {
    private Integer code;
    private String msg;
    private Integer count;
    private Object data;
}
