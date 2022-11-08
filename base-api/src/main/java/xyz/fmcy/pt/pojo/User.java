package xyz.fmcy.pt.pojo;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import xyz.fmcy.pt.dto.UserDto;

/**
 * @author 付高宏
 * @date 2022/10/26 13:36
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("user")
public class User implements java.io.Serializable {
    @TableId
    private Integer id;
    private String username;
    private String password;
    private String phone;

    public User(UserDto userDto){
        this.id = userDto.getId();
        this.phone = userDto.getPhone();
        this.password = userDto.getPassword();
        this.username = userDto.getUsername();
    }
}
