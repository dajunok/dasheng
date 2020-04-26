package com.dasheng.maven;

import java.io.*; 
import javax.servlet.*; 
 
public class HelloServlet  extends GenericServlet { 
 
  public void service(ServletRequest request,  
    ServletResponse response)  
  throws ServletException, IOException { 
    response.setContentType("text/html;charset=UTF-8"); 
    PrintWriter pw = response.getWriter(); 
    pw.println("<B>Hello!<br/>"); 
    pw.println("<h3>《森林卫士》（秋季版）大圣</h3>");
    pw.close(); 
  } 
}

/*web.xml
<?xml version="1.0" encoding="utf-8"?>
<web-app xmlns="http://java.sun.com/xml/ns/javaee"
   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation="http://java.sun.com/xml/ns/javaee 
   http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd"
   version="2.5"> 
    <servlet>
        <servlet-name>HelloServlet</servlet-name>
        <servlet-class>com.dasheng.maven.HelloServlet</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>HelloServlet</servlet-name>
        <url-pattern>/HelloServlet</url-pattern>
    </servlet-mapping>    
</web-app>

*/
