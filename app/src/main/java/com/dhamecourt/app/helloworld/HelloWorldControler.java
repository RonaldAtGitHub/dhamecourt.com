package com.dhamecourt.app.helloworld;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/helloworld")
@Slf4j
public class HelloWorldControler {

    @GetMapping(path = "/welcome")
    public Hello hello() {

        //TODO can a plugin help here?
        log.info("hello");
        return new Hello("hello82");

    }
}
