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
    private Long current;
    @Nullable
    private String title = "";
    @Nullable
    private String[] tags = new String[0];
    @Nullable
    private Double leftPrice = -1.0;
    @Nullable
    private Double rightPrice = -1.0;
    @Nullable
    private Integer authorId = 0;
    @Nullable
    private Boolean dateDesc = false;
}
