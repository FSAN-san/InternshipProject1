package xyz.fmcy.adminserver.webInterceptor.app;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.servlet.HandlerInterceptor;
import xyz.fmcy.adminserver.AdminServerApplication;
import xyz.fmcy.adminserver.webInterceptor.annotation.WebInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author 付高宏
 * @date 2022/10/31 11:29
 */

@WebInterceptor(
        name = "admin-login",
        add = {
                "/admin/**"
        },
        exclude = {
                "/admin/login/**"
        }
)
public class AdminLoginInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (request.getSession().getAttribute("admin") != null) {
            return true;
        } else {
            response.sendRedirect(request.getServletContext().getContextPath()+"/admin/login");
            return false;
        }
    }
}
