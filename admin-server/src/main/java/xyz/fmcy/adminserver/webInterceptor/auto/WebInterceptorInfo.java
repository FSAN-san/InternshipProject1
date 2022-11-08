package xyz.fmcy.adminserver.webInterceptor.auto;

import org.springframework.web.servlet.HandlerInterceptor;

/**
 * Web拦截器配置实体
 *
 * @author 付高宏
 * @date 2022/8/31 18:54
 */
public final class WebInterceptorInfo {
    private final String name;
    private String[] addPathPatterns;
    private String[] excludePathPatterns;
    private final HandlerInterceptor handlerInterceptor;

    public WebInterceptorInfo(String name, HandlerInterceptor handlerInterceptor) {
        this.name = name;
        this.handlerInterceptor = handlerInterceptor;
    }

    public String getName() {
        return name;
    }

    public void setAddPathPatterns(String[] addPathPatterns) {
        this.addPathPatterns = addPathPatterns;
    }

    public void setExcludePathPatterns(String[] excludePathPatterns) {
        this.excludePathPatterns = excludePathPatterns;
    }

    public String[] getAddPathPatterns() {
        return addPathPatterns;
    }

    public String[] getExcludePathPatterns() {
        return excludePathPatterns;
    }

    public HandlerInterceptor getHandlerInterceptor() {
        return handlerInterceptor;
    }
}
