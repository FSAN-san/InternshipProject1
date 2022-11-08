package xyz.fmcy.pt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import xyz.fmcy.pt.pojo.User;
import xyz.fmcy.pt.vo.UserVo;

/**
 * @author 付高宏
 * @date 2022/10/26 13:55
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto implements java.io.Serializable {
    private Integer id;
    private String username;
    private String password;
    private String phone;
    private Integer permission;

    public UserDto(User user){
        this.id = user.getId();
        this.phone = user.getPhone();
        this.password = user.getPassword();
        this.username = user.getUsername();
    }

    public UserDto(UserVo userVo){
        this.id = userVo.getId();
        this.phone = userVo.getPhone();
        this.permission = userVo.getPermission();
        this.username = userVo.getUsername();
    }
}
