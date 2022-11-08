package xyz.fmcy.pt.em;

/**
 * @author 付高宏
 * @date 2022/11/2 16:07
 */
public enum UserPermission {
    SUPER_ADMIN(3, "超级管理员"),
    SYSTEM_ADMIN(2, "系统管理员"),
    USER(1, "注册用户");
    private final Integer code;
    private final String name;

    UserPermission(Integer code, String name) {
        this.code = code;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public Integer getCode() {
        return code;
    }
}
