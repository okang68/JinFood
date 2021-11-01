package com.laioffer.onlineOrder;

import java.io.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import org.json.JSONObject;
import org.apache.commons.io.IOUtils;
import com.laioffer.onlineOrder.entity.Customer;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebServlet(name = "helloServlet", value = "/hello-servlet")
public class HelloServlet extends HttpServlet {
    private String message;

    public void init() {
        message = "Hello World!";
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");

        ObjectMapper mapper = new ObjectMapper();
        Customer customer= new Customer();
        customer.setEmail("jin001@tamu.edu");
        customer.setPassword("123456");
        customer.setFirstName("Yuteng");
        customer.setLastName("Jin");
        customer.setEnabled(true);

        response.getWriter().print(mapper.writeValueAsString(customer));
    }

    public void destroy() {
    }
}
