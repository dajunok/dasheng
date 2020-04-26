package com.dasheng.maven;

import com.google.gson.Gson;
 
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
 
public class LoginServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        doPost(req, resp);
    }
 
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        // 设置请求的编码格式
        req.setCharacterEncoding("UTF-8");
        // 设置响应的编码格式
        resp.setContentType("application/json; charset=utf-8");
        // 获取用户输入的用户名
        String user = req.getParameter("user");
        // 获取用户输入的密码
        String password = req.getParameter("password");
        // 实例化Gson
        Gson gson = new Gson();
        // 判断是否登录成功
        if (user.equals("admin") && password.equals("admin")) {
            // 登录成功则输出提示信息
            String result = gson.toJson(new ResultInfo(1, "登录成功"));
            resp.getWriter().write(result);
        } else {
            // 登录失败也输出提示信息
            String result = gson.toJson(new ResultInfo(0, "用户名或密码错误"));
            resp.getWriter().write(result);
        }
    }
}