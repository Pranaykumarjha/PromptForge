package com.promptforge.promptforge_backend.dto;

public class PromptResponse {

    private Long id;
    private String title;
    private String content;
    private Long collectionId;
    private String collectionName;
    private boolean favorite;

    public PromptResponse() {
    }

    public PromptResponse(Long id,
                          String title,
                          String content,
                          Long collectionId,
                          String collectionName,
                          boolean favorite) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.collectionId = collectionId;
        this.collectionName = collectionName;
        this.favorite = favorite;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getCollectionId() {
        return collectionId;
    }

    public void setCollectionId(Long collectionId) {
        this.collectionId = collectionId;
    }

    public String getCollectionName() {
        return collectionName;
    }

    public void setCollectionName(String collectionName) {
        this.collectionName = collectionName;
    }

    public boolean isFavorite() {
        return favorite;
    }

    public void setFavorite(boolean favorite) {
        this.favorite = favorite;
    }
}