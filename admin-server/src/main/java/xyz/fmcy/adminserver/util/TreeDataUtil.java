package xyz.fmcy.adminserver.util;

import java.util.Collection;


/**
 * @author 付高宏
 * @date 2022/11/3 14:17
 */
public class TreeDataUtil {
    public static <D, E, T extends Collection<E>> T nodeSearch(Collection<D> ds, T targetContainer, Conventions<D, E> conventions) {
        for (D d : ds) {
            E execute = conventions.execute(d, conventions);
            targetContainer.add(execute);
        }
        return targetContainer;
    }
}
