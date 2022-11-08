package xyz.fmcy.pt.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @author 付高宏
 * @date 2022/11/4 10:55
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArticlesContent implements Serializable {
    private String id;
    private String content;
}
