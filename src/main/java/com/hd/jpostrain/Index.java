package com.hd.jpostrain;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @program: jpos-train
 * @description
 * @author: zhujingxing
 * @create: 2021-03-14 16:31
 **/
@Controller
public class Index{
    @RequestMapping("/")
    public String index() {
        return "forward:index.html";
    }
}
