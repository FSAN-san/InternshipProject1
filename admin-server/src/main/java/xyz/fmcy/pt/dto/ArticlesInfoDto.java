package xyz.fmcy.pt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

/**
 * @author 付高宏
 * @date 2022/11/3 17:06
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArticlesInfoDto {
    private Integer id;
    private String img;
    private String title;
    private String subTitle;
    private String[] tags;
    private Timestamp date;
    private Double price;
    private String author;
}
