package xyz.fmcy.pt.dto;

import com.baomidou.mybatisplus.annotation.TableField;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * @author 付高宏
 * @date 2022/11/7 9:45
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRegisterMessageDto {
    private Integer id;
    private String phone;
    private String password;
    private Date subTime;
}
