package xyz.fmcy.adminserver.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;
import xyz.fmcy.pt.pojo.User;

import java.util.List;

/**
 * @author 付高宏
 * @date 2022/10/26 14:14
 */
public interface UserMapper extends BaseMapper<User> {
    List<User> getUsersByPermission(@Param("start") int start, @Param("len") int len, @Param("permission") int permission);
}
