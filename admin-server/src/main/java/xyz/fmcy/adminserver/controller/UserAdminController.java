package xyz.fmcy.adminserver.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import xyz.fmcy.adminserver.service.CategoryService;
import xyz.fmcy.adminserver.service.UserService;
import xyz.fmcy.pt.dto.UserDto;
import xyz.fmcy.pt.dto.UserRegisterMessageDto;
import xyz.fmcy.pt.vo.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 管理员-用户管理
 * @author 付高宏
 * @date 2022/10/26 14:10
 */
@Controller
@RequestMapping("/admin")
public class UserAdminController {

    @Resource
    private UserService userService;

    @Resource
    private CategoryService categoryService;

    /**
     * 用户数据
     * @param current 页码
     * @param limit 数量
     */
    @GetMapping("/user/data")
    @ResponseBody
    public TableDataList<UserVo> getUsersData(int current, int limit) {
        List<UserVo> collect = userService.getUsers(current, limit)
                .stream()
                .map(UserVo::new).collect(Collectors.toList());
        Map<Integer, Boolean> lockMap = userService.peekUserLock(collect.stream().map(UserVo::getId).toArray(Integer[]::new));
        collect.forEach(userVo -> userVo.setLock(lockMap.get(userVo.getId())));
        int size = collect.size();
        return new TableDataList<>(
                200,
                size > 0 ? "查询成功" + size + "条数据" : "查询失败",
                userService.getUserNumber(),
                new Timestamp(System.currentTimeMillis()),
                collect
        );
    }

    /**
     * 将一个用户加入黑名单
     * @param userid 用户id
     */
    @PostMapping("/user/lock")
    @ResponseBody
    public Integer addLock(Integer userid, HttpSession session) {
        UserDto admin = (UserDto) session.getAttribute("admin");
        return userService.updateUserLock(admin.getId(), userid, true);
    }

    /**
     * 将一个用户移出黑名单
     * @param userid 用户id
     */
    @PostMapping("/user/rmLock")
    @ResponseBody
    public Integer rmLock(Integer userid, HttpSession session) {
        UserDto admin = (UserDto) session.getAttribute("admin");
        return userService.updateUserLock(admin.getId(), userid, false);
    }

    /**
     * 用户注册请求
     * @param selector 搜索方案
     */
    @GetMapping("/user/registers/get")
    @ResponseBody
    public PageDataVo<UserRegisterMessageDto> getUserRegisterRequest(UserRegistersSelector selector) {
        PageDataVo<UserRegisterMessageDto> pageDataVo = new PageDataVo<>();
        if (selector != null) {
            IPage<UserRegisterMessageDto> registerMessages = userService.getRegisterMessages(selector.getCurrent(), selector.getPhone());
            pageDataVo.setData(registerMessages);
        }
        pageDataVo.setCode(200);
        return pageDataVo;
    }

}
