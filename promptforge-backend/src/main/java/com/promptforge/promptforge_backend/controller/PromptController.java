package com.promptforge.promptforge_backend.controller;

import com.promptforge.promptforge_backend.dto.PromptRequest;
import com.promptforge.promptforge_backend.dto.PromptResponse;
import com.promptforge.promptforge_backend.entity.User;
import com.promptforge.promptforge_backend.exception.UserNotFoundException;
import com.promptforge.promptforge_backend.repository.UserRepository;
import com.promptforge.promptforge_backend.service.PromptService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prompts")
public class PromptController {

    private final PromptService promptService;
    private final UserRepository userRepository;

    public PromptController(PromptService promptService,
                            UserRepository userRepository) {
        this.promptService = promptService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<PromptResponse> createPrompt(
            @Valid @RequestBody PromptRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        PromptResponse response = promptService.createPrompt(request, email);

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<PromptResponse>> getAllPrompts(
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        List<PromptResponse> prompts = promptService.getAllPrompts(email);

        return ResponseEntity.ok(prompts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PromptResponse> getPromptById(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        PromptResponse prompt = promptService.getPromptById(id, email);

        return ResponseEntity.ok(prompt);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PromptResponse> updatePrompt(
            @PathVariable Long id,
            @Valid @RequestBody PromptRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        PromptResponse updatedPrompt =
                promptService.updatePrompt(id, request, email);

        return ResponseEntity.ok(updatedPrompt);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePrompt(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        promptService.deletePrompt(id, email);

        return ResponseEntity.ok("Prompt deleted successfully");
    }
}