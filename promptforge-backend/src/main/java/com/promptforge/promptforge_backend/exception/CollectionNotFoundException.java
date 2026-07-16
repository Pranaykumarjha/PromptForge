package com.promptforge.promptforge_backend.exception;

public class CollectionNotFoundException extends RuntimeException {

    public CollectionNotFoundException(String message) {
        super(message);
    }
}