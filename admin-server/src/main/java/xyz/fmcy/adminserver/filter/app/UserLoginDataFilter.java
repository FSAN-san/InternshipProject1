package xyz.fmcy.adminserver.filter.app;

import xyz.fmcy.adminserver.controller.FilterController;
import xyz.fmcy.adminserver.filter.format.FormatRule;
import xyz.fmcy.adminserver.filter.format.FormatRulesMapper;
import xyz.fmcy.pt.error.RequestAttrErrorMsg;

import javax.annotation.Resource;
import javax.servlet.*;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author 付高宏
 * @date 2022/11/7 17:09
 */

public class UserLoginDataFilter extends HttpFilter {

    @Resource
    private FormatRulesMapper formatRulesMapper;

    public UserLoginDataFilter(FormatRulesMapper formatRulesMapper) {
        this.formatRulesMapper = formatRulesMapper;
    }
    private final static String PHONE = "phone";

    @Override
    public void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        FormatRule<Object> phoneRule = formatRulesMapper.getRule(PHONE);
        if (!phoneRule.examine(request.getParameter(PHONE))) {
            request.setAttribute(FilterController.ERROR, new RequestAttrErrorMsg(1001, "手机号格式错误"));
            request.getRequestDispatcher(request.getServletContext().getContextPath() + "/filter/err").forward(request, response);
        }
        filterChain.doFilter(request,response);
    }
}
