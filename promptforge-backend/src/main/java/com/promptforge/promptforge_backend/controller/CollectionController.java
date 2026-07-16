package com.promptforge.promptforge_backend.controller;

import com.promptforge.promptforge_backend.dto.CollectionRequest;
import com.promptforge.promptforge_backend.dto.CollectionResponse;
import com.promptforge.promptforge_backend.dto.PromptResponse;
import com.promptforge.promptforge_backend.service.CollectionService;
import com.promptforge.promptforge_backend.service.PromptService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/collections")
public class CollectionController {

    private final CollectionService collectionService;
    private final PromptService promptService;

    public CollectionController(
            CollectionService collectionService,
            PromptService promptService) {
        this.collectionService = collectionService;
        this.promptService = promptService;
    }

    @PostMapping
    public ResponseEntity<CollectionResponse> createCollection(
            @Valid @RequestBody CollectionRequest request,
            Authentication authentication) {

        CollectionResponse response =
                collectionService.createCollection(
                        Long.parseLong(authentication.getName()),
                        request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<CollectionResponse>> getAllCollections(
            Authentication authentication) {

        List<CollectionResponse> collections =
                collectionService.getAllCollections(Long.parseLong(authentication.getName()));

        return ResponseEntity.ok(collections);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CollectionResponse> getCollectionById(
            @PathVariable Long id,
            Authentication authentication) {

        CollectionResponse response =
                collectionService.getCollectionById(
                        Long.parseLong(authentication.getName()),
                        id);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CollectionResponse> updateCollection(
            @PathVariable Long id,
            @Valid @RequestBody CollectionRequest request,
            Authentication authentication) {

        CollectionResponse response =
                collectionService.updateCollection(
                        authentication.getName(),
                        id,
                        request);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCollection(
            @PathVariable Long id,
            Authentication authentication) {

        collectionService.deleteCollection(
                authentication.getName(),
                id);

        return ResponseEntity.ok("Collection deleted successfully.");
    }

    @GetMapping("/{collectionId}/prompts")
    public ResponseEntity<List<PromptResponse>> getPromptsByCollection(
            @PathVariable Long collectionId,
            Authentication authentication) {

        List<PromptResponse> prompts =
                promptService.getPromptsByCollection(
                        collectionId,
                        authentication.getName());

        return ResponseEntity.ok(prompts);
    }
}