package com.promptforge.promptforge_backend.service;

import com.promptforge.promptforge_backend.dto.CollectionRequest;
import com.promptforge.promptforge_backend.dto.CollectionResponse;

import java.util.List;

public interface CollectionService {

    CollectionResponse createCollection(Long userId, CollectionRequest request);

    List<CollectionResponse> getAllCollections(Long userId);

    CollectionResponse getCollectionById(Long userId, Long collectionId);

    CollectionResponse updateCollection(
            String email,
            Long collectionId,
            CollectionRequest request
    );

    void deleteCollection(String email, Long collectionId);
}