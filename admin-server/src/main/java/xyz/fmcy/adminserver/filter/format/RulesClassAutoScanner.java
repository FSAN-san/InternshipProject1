package xyz.fmcy.adminserver.filter.format;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.ClassPathBeanDefinitionScanner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.GenericApplicationContext;
import org.springframework.core.annotation.Order;
import org.springframework.core.type.filter.AnnotationTypeFilter;
import xyz.fmcy.adminserver.filter.annotation.AFormatRule;

import javax.annotation.PostConstruct;
import java.lang.reflect.InvocationTargetException;


/**
 * @author 付高宏
 * @date 2022/11/7 16:09
 */
@Configuration
@ConfigurationProperties(prefix = "web.data.rules.auto")
public class RulesClassAutoScanner extends ClassPathBeanDefinitionScanner {

    private String[] basePackages;
    private final FormatRulesMapper formatRulesMapper;

    private final Logger logger = LoggerFactory.getLogger(RulesClassAutoScanner.class);

    public void setBasePackages(String[] basePackages) {
        this.basePackages = basePackages;
    }

    public String[] getBasePackages() {
        return basePackages;
    }

    public RulesClassAutoScanner(GenericApplicationContext registry, FormatRulesMapper formatRulesMapper) {
        super(registry, false);
        this.formatRulesMapper = formatRulesMapper;
        addIncludeFilter(new AnnotationTypeFilter(AFormatRule.class));
    }

    @PostConstruct
    @SuppressWarnings("unchecked")
    public void init() {
        if (basePackages != null) {
            for (String basePackage : basePackages) {
                findCandidateComponents(basePackage).forEach(e -> {
                    String beanClassName = e.getBeanClassName();
                    try {
                        Class<? extends FormatRule<?>> aClass = (Class<? extends FormatRule<?>>) Class.forName(beanClassName).asSubclass(FormatRule.class);
                        AFormatRule aFormatRule = aClass.getAnnotation(AFormatRule.class);
                        String name = aFormatRule.value();
                        formatRulesMapper.addRule(name,aClass.getDeclaredConstructor().newInstance());
                    } catch (ClassNotFoundException | NoSuchMethodException | InstantiationException |
                             IllegalAccessException | InvocationTargetException ex) {
                        logger.error(ex.getMessage());
                    }
                });
            }
        }
    }
}
