package com.promptforge.promptforge_backend.dto;

public class CollectionResponse {

    private Long id;
    private String name;
    private int promptCount;

    public CollectionResponse() {
    }

    public CollectionResponse(Long id, String name, int promptCount) {
        this.id = id;
        this.name = name;
        this.promptCount = promptCount;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPromptCount() {
        return promptCount;
    }

    public void setPromptCount(int promptCount) {
        this.promptCount = promptCount;
    }
}