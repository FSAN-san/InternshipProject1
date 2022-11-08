package xyz.fmcy.adminserver.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.logging.log4j.util.Strings;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import xyz.fmcy.adminserver.mapper.*;
import xyz.fmcy.adminserver.service.AlyService;
import xyz.fmcy.adminserver.service.UserService;
import xyz.fmcy.pt.dto.UserDto;
import xyz.fmcy.pt.dto.UserRegisterMessageDto;
import xyz.fmcy.pt.pojo.*;
import xyz.fmcy.pt.vo.RegisterRequest;

import javax.annotation.Resource;
import java.sql.Timestamp;
import java.util.*;
import java.util.stream.Collectors;

/**
 * @author 付高宏
 * @date 2022/10/26 14:20
 */
@Service
public class UserServiceImpl implements UserService {
    @Resource
    private UserMapper userMapper;
    @Resource
    private PermissionsMapper permissionsMapper;
    @Resource
    private LockMapper lockMapper;
    @Resource
    private RegisterQueueMapper registerQueueMapper;

    @Resource
    private CategoryMapper categoryMapper;

    @Resource
    private UserCategoryMapper userCategoryMapper;

    @Resource
    private RedisTemplate<String, Object> redisTemplate;

    @Override
    public List<UserDto> getUsers(int page, int len) {
        return userMapper.selectPage(new Page<>(page, len), null).getRecords()
                .stream()
                .map(UserDto::new)
                .peek(u -> u.setPermission(permissionsMapper.selectById(u.getId()).getType()))
                .collect(Collectors.toList());
    }

    @Override
    public List<UserDto> getUsersByPermission(int permission, int start, int len) {
        return userMapper.getUsersByPermission(start * len, len, permission)
                .stream()
                .map(UserDto::new)
                .peek(u -> u.setPermission(permission))
                .collect(Collectors.toList());
    }

    @Override
    public int getUserNumber() {
        return userMapper.selectCount(null);
    }

    /**
     * @return -1:修改失败,0:权限不足,1:修改成功
     */
    @Override
    public int updateUserLock(int admin, int userid, boolean status) {
        Permissions permissions = permissionsMapper.selectById(admin);
        Permissions permissions1 = permissionsMapper.selectById(userid);
        if (permissions == null || permissions1 == null) {
            return -1;
        }
        if (permissions.getType() > permissions1.getType()) {
            if (status) {
                if (peekUserLock(userid).get(userid)) {
                    return 1;
                } else {
                    return lockMapper.insert(new Lock(userid)) > 0 ? 1 : -1;
                }
            } else {
                if (!peekUserLock(userid).get(userid)) {
                    return 1;
                } else {
                    return lockMapper.deleteById(userid) > 0 ? 1 : -1;
                }
            }
        } else {
            return 0;
        }
    }

    @Override
    public Map<Integer, Boolean> peekUserLock(Integer... userid) {
        if (userid == null || userid.length == 0) {
            return new HashMap<>(0);
        }
        List<Integer> locks = lockMapper.selectBatchIds(Arrays.asList(userid))
                .stream()
                .map(Lock::getUid)
                .collect(Collectors.toList());
        return Arrays.stream(userid).collect(Collectors.toMap(i -> i, locks::contains));
    }

    @Override
    public Boolean hasUserByPhone(String phone) {
        User user = new User();
        user.setPhone(phone);
        return userMapper.selectOne(new QueryWrapper<>(user)) != null;
    }

    @Override
    public UserDto getUserByPhone(String phone) {
        User user = new User();
        user.setPhone(phone);
        UserDto userDto = new UserDto(userMapper.selectOne(new QueryWrapper<>(user)));
        userDto.setPermission(permissionsMapper.selectById(userDto.getId()).getType());
        return userDto;
    }

    @Override
    public Integer register(RegisterRequest registerRequest) {
        Object o = redisTemplate.opsForValue().get(AlyService.CATEGORY_PREFIX + registerRequest.getPhone());
        if (Objects.equals(o, registerRequest.getCaptcha())) {
            RegisterMessage registerMessage = new RegisterMessage();
            registerMessage.setPhone(registerMessage.getPhone());
            registerMessage.setPassword(registerMessage.getPassword());
            registerMessage.setSubTime(new Timestamp(System.currentTimeMillis()));
            registerQueueMapper.insert(registerMessage);
            return 0;
        }
        return 1;
    }

    @Override
    public Set<Map<String, Object>> authorListByTag(String tag) {
        LambdaQueryWrapper<Category> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(!Strings.isEmpty(tag), Category::getName, tag);
        wrapper.like(Category::getName, "");
        List<Map<String, Object>> list = new ArrayList<>();
        List<Category> categories = categoryMapper.selectList(wrapper);
        if (categories.size() == 0) {
            return new HashSet<>(list);
        }
        for (Category category : categories) {
            LambdaQueryWrapper<UserCategoryMapping> wrapper1 = new LambdaQueryWrapper<>();
            wrapper1.eq(UserCategoryMapping::getCategory, category.getId());
            List<UserCategoryMapping> userCategoryMappings = userCategoryMapper.selectList(wrapper1);
            for (UserCategoryMapping userCategoryMapping : userCategoryMappings) {
                User user = userMapper.selectOne(new LambdaQueryWrapper<User>().eq(User::getId, userCategoryMapping.getUid()));
                HashMap<String, Object> map = new HashMap<>(2);
                if (lockMapper.selectById(user.getId()) == null) {
                    map.put("id", user.getId());
                    map.put("username", user.getUsername());
                    list.add(map);
                }
            }
        }
        return new HashSet<>(list);
    }

    @Override
    public IPage<UserRegisterMessageDto> getRegisterMessages(long current, String phone) {
        LambdaQueryWrapper<RegisterMessage> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(!Strings.isEmpty(phone), RegisterMessage::getPhone, phone);
        IPage<RegisterMessage> registerMessagePage = registerQueueMapper.selectPage(new Page<>(current, 8L), wrapper);
        IPage<UserRegisterMessageDto> userRegisterMessageDtoPage = new Page<>();
        userRegisterMessageDtoPage.setRecords(
                registerMessagePage.getRecords().stream().map(registerMessage -> new UserRegisterMessageDto(
                        registerMessage.getId(),
                        registerMessage.getPhone(),
                        registerMessage.getPassword(),
                        registerMessage.getSubTime()
                )).collect(Collectors.toList())
        );
        userRegisterMessageDtoPage.setPages(registerMessagePage.getPages());
        userRegisterMessageDtoPage.setCurrent(registerMessagePage.getCurrent());
        userRegisterMessageDtoPage.setSize(registerMessagePage.getSize());
        userRegisterMessageDtoPage.setTotal(registerMessagePage.getTotal());
        return userRegisterMessageDtoPage;
    }
}
