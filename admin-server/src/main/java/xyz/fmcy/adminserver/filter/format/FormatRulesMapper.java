package xyz.fmcy.adminserver.filter.format;

import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author 付高宏
 * @date 2022/11/7 11:19
 */
@Component
public class FormatRulesMapper {

    private final Map<String, FormatRule<?>> rulesMap;

    public FormatRulesMapper() {
        this.rulesMap = new ConcurrentHashMap<>();
    }

    public void addRule(String name, FormatRule<?> formatRule) {
        rulesMap.put(name, formatRule);
    }

    @SuppressWarnings("unchecked")
    public FormatRule<Object> getRule(String name) {
        return (FormatRule<Object>) rulesMap.get(name);
    }

    /**
     *
     * @param name 指定名称
     * @param clazz 指定被审查对象类名
     */
    @SuppressWarnings("unchecked")
    public <T> FormatRule<T> getRule(String name, Class<T> clazz) {
        return (FormatRule<T>) rulesMap.get(name);
    }

    @Override
    public String toString() {
        return "FormatRulesMapper{" +
                "rulesMap=" + rulesMap +
                '}';
    }
}
