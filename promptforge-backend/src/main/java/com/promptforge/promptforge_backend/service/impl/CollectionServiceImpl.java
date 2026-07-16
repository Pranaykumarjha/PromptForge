package com.promptforge.promptforge_backend.service.impl;

import com.promptforge.promptforge_backend.dto.CollectionRequest;
import com.promptforge.promptforge_backend.dto.CollectionResponse;
import com.promptforge.promptforge_backend.entity.Collection;
import com.promptforge.promptforge_backend.entity.User;
import com.promptforge.promptforge_backend.exception.CollectionNotFoundException;
import com.promptforge.promptforge_backend.exception.UserNotFoundException;
import com.promptforge.promptforge_backend.repository.CollectionRepository;
import com.promptforge.promptforge_backend.repository.UserRepository;
import com.promptforge.promptforge_backend.service.CollectionService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CollectionServiceImpl implements CollectionService {

    private final CollectionRepository collectionRepository;
    private final UserRepository userRepository;

    public CollectionServiceImpl(
            CollectionRepository collectionRepository,
            UserRepository userRepository) {
        this.collectionRepository = collectionRepository;
        this.userRepository = userRepository;
    }

    private CollectionResponse mapToResponse(Collection collection) {
        return new CollectionResponse(
                collection.getId(),
                collection.getName(),
                collection.getPrompts().size());
    }

    @Override
    public CollectionResponse createCollection(Long userId, CollectionRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        if (collectionRepository.existsByNameAndUser(request.getName(), user)) {
            throw new IllegalArgumentException("Collection with this name already exists");
        }

        Collection collection = new Collection();
        collection.setName(request.getName());
        collection.setUser(user);

        Collection savedCollection = collectionRepository.save(collection);

        return mapToResponse(savedCollection);
    }

    @Override
    public List<CollectionResponse> getAllCollections(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        List<Collection> collections = collectionRepository.findByUser(user);

        return collections.stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public CollectionResponse getCollectionById(Long userId, Long collectionId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        Collection collection = collectionRepository
                .findByIdAndUser(collectionId, user)
                .orElseThrow(() -> new CollectionNotFoundException("Collection not found"));

        return mapToResponse(collection);
    }

    @Override
    public CollectionResponse updateCollection(
            String email,
            Long collectionId,
            CollectionRequest request) {

        User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new UserNotFoundException("User not found"));

        Collection collection = collectionRepository
                .findByIdAndUser(collectionId, user)
                .orElseThrow(() -> new CollectionNotFoundException("Collection not found"));

        String newName = request.getName().trim();

        if (!collection.getName().equalsIgnoreCase(newName)
                && collectionRepository.existsByNameAndUser(newName, user)) {

            throw new IllegalArgumentException(
                    "Collection with this name already exists");
        }

        collection.setName(newName);

        Collection updatedCollection = collectionRepository.save(collection);

        return mapToResponse(updatedCollection);
    }

    @Override
    public void deleteCollection(String email, Long collectionId) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        Collection collection = collectionRepository
                .findByIdAndUser(collectionId, user)
                .orElseThrow(() -> new CollectionNotFoundException("Collection not found"));

        collectionRepository.delete(collection);
    }
}