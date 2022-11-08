package xyz.fmcy.adminserver.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import xyz.fmcy.pt.dto.UserDto;
import xyz.fmcy.pt.dto.UserRegisterMessageDto;
import xyz.fmcy.pt.vo.RegisterRequest;

import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * @author 付高宏
 * @date 2022/10/26 14:28
 */
public interface UserService {
    List<UserDto> getUsers(int page, int len);

    List<UserDto> getUsersByPermission(int permission, int start, int len);

    int getUserNumber();

    int updateUserLock(int admin, int userid, boolean status);

    Map<Integer,Boolean> peekUserLock(Integer ...userid);

    Boolean hasUserByPhone(String phone);

    UserDto getUserByPhone(String phone);

    Integer register(RegisterRequest registerRequest);

    Set<Map<String, Object>> authorListByTag(String tag);

    IPage<UserRegisterMessageDto> getRegisterMessages(long current,String phone);
}
