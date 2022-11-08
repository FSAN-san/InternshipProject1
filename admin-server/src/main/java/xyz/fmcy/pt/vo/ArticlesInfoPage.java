package xyz.fmcy.pt.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

/**
 * @author 付高宏
 * @date 2022/11/4 11:03
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArticlesInfoPage {
    /**
     * 页码
     */
    private long current;
    /**
     * 标题模糊查询
     */
    @Nullable
    private String title = "";
    /**
     * 标签
     */
    @Nullable
    private String[] tags = new String[0];
    /**
     * 最小价格
     */
    @Nullable
    private Double leftPrice = -1.0;
    /**
     * 最大价格
     */
    @Nullable
    private Double rightPrice = -1.0;
    /**
     * 用户id
     */
    @Nullable
    private Integer authorId = 0;
    /**
     * 是否按时间降序
     */
    @Nullable
    private Boolean dateDesc = false;
}
