package xyz.fmcy.adminserver.filter.format;

/**
 * @author 付高宏
 * @date 2022/11/7 11:08
 */
@FunctionalInterface
public interface FormatRule<T> {
    /**
     * 审查元素 data 是否符合规则
     * @param data 数据
     * @return true or false 符合规则返回true,反之返回false
     */
    boolean examine(T data);
}
