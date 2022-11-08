package xyz.fmcy.pt.pojo;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * @author 付高宏
 * @date 2022/11/3 16:23
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("register_queue")
public class RegisterMessage {
    private Integer id;
    private String phone;
    private String password;
    @TableField("sub_time")
    private Date subTime;
    private Integer status;
}
