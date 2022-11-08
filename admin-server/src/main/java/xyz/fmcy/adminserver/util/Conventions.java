package xyz.fmcy.adminserver.util;

import java.util.Collection;

/**
 * @author 付高宏
 * @date 2022/11/3 14:20
 */
@FunctionalInterface
public interface Conventions<D, E> {
    E execute(D d, Conventions<D, E> self);

}
