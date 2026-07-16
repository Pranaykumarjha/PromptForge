package com.promptforge.promptforge_backend.exception;

public class PromptNotFoundException extends RuntimeException {

    public PromptNotFoundException(String message) {
        super(message);
    }
}