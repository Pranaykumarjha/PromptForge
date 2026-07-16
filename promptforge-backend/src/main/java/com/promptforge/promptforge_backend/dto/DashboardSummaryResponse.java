package com.promptforge.promptforge_backend.dto;

public class DashboardSummaryResponse {

    private long totalPrompts;
    private long totalCollections;
    private long favoritePrompts;

    public DashboardSummaryResponse() {
    }

    public DashboardSummaryResponse(long totalPrompts,
                                    long totalCollections,
                                    long favoritePrompts) {
        this.totalPrompts = totalPrompts;
        this.totalCollections = totalCollections;
        this.favoritePrompts = favoritePrompts;
    }

    public long getTotalPrompts() {
        return totalPrompts;
    }

    public void setTotalPrompts(long totalPrompts) {
        this.totalPrompts = totalPrompts;
    }

    public long getTotalCollections() {
        return totalCollections;
    }

    public void setTotalCollections(long totalCollections) {
        this.totalCollections = totalCollections;
    }

    public long getFavoritePrompts() {
        return favoritePrompts;
    }

    public void setFavoritePrompts(long favoritePrompts) {
        this.favoritePrompts = favoritePrompts;
    }
}