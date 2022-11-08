package xyz.fmcy.pt.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import xyz.fmcy.pt.dto.UserDto;
import xyz.fmcy.pt.pojo.User;

/**
 * @author 付高宏
 * @date 2022/10/26 13:58
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserVo implements java.io.Serializable{
    private Integer id;
    private String username;
    private Integer permission;
    private String phone;
    private Boolean lock;

    public UserVo(User user){
        this.id = user.getId();
        this.phone = user.getPhone();
        this.username = user.getUsername();
    }

    public UserVo(UserDto userDto){
        this.id = userDto.getId();
        this.phone = userDto.getPhone();
        this.permission = userDto.getPermission();
        this.username = userDto.getUsername();
    }
}
