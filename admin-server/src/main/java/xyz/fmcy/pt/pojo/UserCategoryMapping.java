package xyz.fmcy.pt.pojo;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @author 付高宏
 * @date 2022/11/4 13:52
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName("user_category_mapping")
public class UserCategoryMapping implements Serializable {
    private Integer uid;
    private Integer category;
}
