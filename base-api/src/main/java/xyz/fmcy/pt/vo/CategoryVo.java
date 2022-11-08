package xyz.fmcy.pt.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author 付高宏
 * @date 2022/11/3 11:01
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryVo {
    private Integer key;
    private String label;
    private Integer type;
    private List<CategoryVo> children;
}
