package xyz.fmcy.pt.pojo;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

/**
 * @author 付高宏
 * @date 2022/11/3 16:57
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName("articles_list")
public class ArticlesInfo {
    private Integer id;
    private String img;
    private String title;
    @TableField("sub_title")
    private String subTitle;
    private String tag;
    private Timestamp date;
    private Integer major;
    private Double price;
    private Integer author;
}
