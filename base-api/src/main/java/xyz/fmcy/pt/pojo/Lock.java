package xyz.fmcy.pt.pojo;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author 付高宏
 * @date 2022/11/2 9:53
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("`lock`")
public class Lock {
    @TableId
    private Integer uid;
}
