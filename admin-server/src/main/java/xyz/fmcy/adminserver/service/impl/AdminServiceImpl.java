package xyz.fmcy.adminserver.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import xyz.fmcy.adminserver.mapper.PermissionsMapper;
import xyz.fmcy.adminserver.mapper.UserMapper;
import xyz.fmcy.adminserver.service.AlyService;
import xyz.fmcy.adminserver.service.AdminService;
import xyz.fmcy.pt.dto.UserDto;
import xyz.fmcy.pt.vo.LoginStatus;
import xyz.fmcy.pt.pojo.User;

import javax.annotation.Resource;

/**
 * @author 付高宏
 * @date 2022/10/31 10:28
 */
@Service
public class AdminServiceImpl implements AdminService {

    @Resource
    private UserMapper userMapper;

    @Resource
    private PermissionsMapper permissionsMapper;

    @Resource
    private RedisTemplate<String,Object> redisTemplate;


    public LoginStatus login(String phone, String password) {
        User user = new User();
        user.setPhone(phone);
        User userByPhone = userMapper.selectOne(new QueryWrapper<>(user));
        if (userByPhone != null) {
            //无权限
            Integer type = permissionsMapper.selectById(userByPhone.getId()).getType();
            if (type < 2) {
                return LoginStatus.getInstance(xyz.fmcy.pt.em.LoginStatus.LOGIN_STATUS_3);
            }
            //登录成功
            if (userByPhone.getPassword().equals(password)) {
                LoginStatus instance = LoginStatus.getInstance(xyz.fmcy.pt.em.LoginStatus.LOGIN_STATUS_0);
                UserDto userDto = new UserDto(userByPhone);
                userDto.setPermission(type);
                instance.setData(userDto);
                return instance;
            }
            //密码错误
            return LoginStatus.getInstance(xyz.fmcy.pt.em.LoginStatus.LOGIN_STATUS_2);
        }
        //找不到用户
        return LoginStatus.getInstance(xyz.fmcy.pt.em.LoginStatus.LOGIN_STATUS_1);
    }

    @Override
    public LoginStatus checkTheCaptchaAndLogin(String phone, String password,String captcha) {
        Object redisCaptcha = redisTemplate.opsForValue().get(AlyService.CATEGORY_PREFIX + phone);
        if (redisCaptcha != null) {
            if (redisCaptcha.equals(captcha)) {
                return this.login(phone, password);
            } else {
                return LoginStatus.getInstance(xyz.fmcy.pt.em.LoginStatus.LOGIN_STATUS_4);
            }
        } else {
            return LoginStatus.getInstance(xyz.fmcy.pt.em.LoginStatus.LOGIN_STATUS_5);
        }

    }
}
