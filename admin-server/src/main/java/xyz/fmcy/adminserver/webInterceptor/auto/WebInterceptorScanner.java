package xyz.fmcy.adminserver.webInterceptor.auto;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.ClassPathBeanDefinitionScanner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.GenericApplicationContext;
import org.springframework.core.type.filter.AnnotationTypeFilter;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import xyz.fmcy.adminserver.webInterceptor.annotation.WebInterceptor;

import javax.annotation.PostConstruct;
import java.lang.reflect.InvocationTargetException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Web请求拦截器自动注册
 *
 * @author 付高宏
 * @date 2022/8/31 14:04
 */
@Configuration
@ConfigurationProperties(prefix = "web.interceptor.auto")
public class WebInterceptorScanner extends ClassPathBeanDefinitionScanner implements WebMvcConfigurer {

    private String[] basePackages;
    private List<Class<?>> interceptorClasses;
    private final Map<String, HandlerInterceptor> handlerInterceptorMap;
    private List<WebInterceptorInfo> webInterceptorInfos;

    public void setBasePackages(String[] basePackages) {
        this.basePackages = basePackages;
    }

    public String[] getBasePackages() {
        return basePackages;
    }

    @Autowired
    public WebInterceptorScanner(GenericApplicationContext applicationContext) {
        super(applicationContext, false);
        this.handlerInterceptorMap = new ConcurrentHashMap<>();
        addIncludeFilter(new AnnotationTypeFilter(WebInterceptor.class));
    }

    @PostConstruct
    private void loadInterceptorClasses() {
        List<Class<?>> classes = new ArrayList<>();
        List<WebInterceptorInfo> webInterceptorInfos = new ArrayList<>();
        for (String basePackage : basePackages) {
            findCandidateComponents(basePackage).forEach(beanDefinition -> {
                try {
                    Class<?> clazz = Class.forName(beanDefinition.getBeanClassName());
                    HandlerInterceptor webInterceptor = createWebInterceptor(clazz);
                    if (webInterceptor != null) {
                        WebInterceptor webInterceptorAnnotation = clazz.getAnnotation(WebInterceptor.class);
                        classes.add(clazz);
                        handlerInterceptorMap.put(webInterceptorAnnotation.name(), webInterceptor);
                        WebInterceptorInfo webInterceptorInfo = new WebInterceptorInfo(webInterceptorAnnotation.name(), webInterceptor);
                        webInterceptorInfo.setAddPathPatterns(webInterceptorAnnotation.add());
                        webInterceptorInfo.setExcludePathPatterns(webInterceptorAnnotation.exclude());
                        webInterceptorInfos.add(webInterceptorInfo);
                    }
                } catch (ClassNotFoundException e) {
                    e.printStackTrace();
                }
            });
        }
        this.interceptorClasses = classes;
        this.webInterceptorInfos = Arrays.asList(webInterceptorInfos.toArray(new WebInterceptorInfo[0]));
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        this.webInterceptorInfos.forEach(
                webInterceptorInfo -> {
                    registry.addInterceptor(webInterceptorInfo.getHandlerInterceptor())
                            .addPathPatterns(webInterceptorInfo.getAddPathPatterns())
                            .excludePathPatterns(webInterceptorInfo.getExcludePathPatterns());
                    LoggerFactory.getLogger(this.getClass()).info("拦截器:" + webInterceptorInfo.getName() + "注册成功!");
                }
        );
    }

    private HandlerInterceptor createWebInterceptor(Class<?> clazz) {
        Class<? extends HandlerInterceptor> clazz0 = clazz.asSubclass(HandlerInterceptor.class);
        Logger logger = LoggerFactory.getLogger(this.getClass());
        if (clazz0.isInterface()) {
            logger.warn("一个拦截器注册请求被拒绝:接口无法注册为拦截器!" + clazz0);
            return null;
        }
        HandlerInterceptor handlerInterceptor = null;
        try {
            handlerInterceptor = clazz0.getDeclaredConstructor().newInstance();
        } catch (InstantiationException | IllegalAccessException | InvocationTargetException |
                 NoSuchMethodException e) {
            logger.warn("一个拦截器注册请求被拒绝:您需要定义一个无参的合法构造器方法!" + clazz0);
        }
        return handlerInterceptor;
    }

    public List<Class<?>> getInterceptorClasses() {
        return interceptorClasses;
    }

    public HandlerInterceptor getHandlerInterceptor(String name) {
        return handlerInterceptorMap.get(name);
    }

    public List<WebInterceptorInfo> getWebInterceptorInfos() {
        return webInterceptorInfos;
    }
}
