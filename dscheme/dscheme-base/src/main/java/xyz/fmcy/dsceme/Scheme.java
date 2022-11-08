package xyz.fmcy.dsceme;

/**
 * @author 付高宏
 * @date 2022/11/4 10:45
 */
public interface Scheme<D> {
    boolean examine(D data);
}
