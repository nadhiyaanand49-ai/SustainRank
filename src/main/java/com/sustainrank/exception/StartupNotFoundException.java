package com.sustainrank.exception;

public class StartupNotFoundException extends RuntimeException {
    public StartupNotFoundException(String message) {
        super(message);
    }
}
