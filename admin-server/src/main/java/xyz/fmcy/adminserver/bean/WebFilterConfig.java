package xyz.fmcy.adminserver.bean;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import xyz.fmcy.adminserver.filter.app.UserLoginDataFilter;
import xyz.fmcy.adminserver.filter.format.FormatRulesMapper;

import javax.annotation.Resource;
import java.util.Arrays;
import java.util.Collections;

/**
 * @author 付高宏
 * @date 2022/11/7 17:03
 */
@Configuration
public class WebFilterConfig {
    @Resource
    private FormatRulesMapper formatRulesMapper;

    @Bean
    public FilterRegistrationBean<UserLoginDataFilter> userDataFilter(FormatRulesMapper formatRulesMapper){
        UserLoginDataFilter userLoginDataFilter = new UserLoginDataFilter(formatRulesMapper);
        FilterRegistrationBean<UserLoginDataFilter> userDataFilterFilterRegistrationBean = new FilterRegistrationBean<>(userLoginDataFilter);
        userDataFilterFilterRegistrationBean.setUrlPatterns(Arrays.asList("/admin/login/captcha","/admin/login"));
        return userDataFilterFilterRegistrationBean;
    }


}
