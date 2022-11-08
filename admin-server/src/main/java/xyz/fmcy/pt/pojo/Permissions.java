package xyz.fmcy.pt.pojo;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author 付高宏
 * @date 2022/10/26 13:38
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName("permissions")
public class Permissions implements java.io.Serializable {
    @TableId
    private Integer uid;
    private Integer type;
}
