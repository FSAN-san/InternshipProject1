package xyz.fmcy.pt.pojo;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @author 付高宏
 * @date 2022/11/3 9:46
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("opus")
public class OpusLink implements Serializable {
    @TableId
    private Integer id;
    private String link;
    @TableField("author_id")
    private Integer authorId;
}
