package com.promptforge.promptforge_backend.service;

import com.promptforge.promptforge_backend.dto.CollectionRequest;
import com.promptforge.promptforge_backend.dto.CollectionResponse;

import java.util.List;

public interface CollectionService {

    CollectionResponse createCollection(
            String email,
            CollectionRequest request);

    List<CollectionResponse> getAllCollections(
            String email);

    CollectionResponse getCollectionById(
            String email,
            Long collectionId);

    CollectionResponse updateCollection(
            String email,
            Long collectionId,
            CollectionRequest request);

    void deleteCollection(
            String email,
            Long collectionId);
}