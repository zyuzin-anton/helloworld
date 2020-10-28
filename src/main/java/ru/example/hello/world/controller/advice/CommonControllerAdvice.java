package ru.example.hello.world.controller.advice;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpServerErrorException;

@RestControllerAdvice(basePackages = {"ru.example.hello.world"})
public class CommonControllerAdvice {

    @ExceptionHandler(value = {HttpServerErrorException.class})
    public ResponseEntity<String> httpServerErrorException(HttpServerErrorException e) {
        return ResponseEntity.status(e.getStatusCode()).body(e.getMessage());
    }
}
