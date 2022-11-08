package xyz.fmcy.pt.vo;

import com.baomidou.mybatisplus.core.metadata.IPage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author 付高宏
 * @date 2022/11/4 12:41
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageDataVo<T> {
    private Integer code;
    private IPage<T> data;
}
