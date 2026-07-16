package com.promptforge.promptforge_backend.service;

import com.promptforge.promptforge_backend.dto.PromptRequest;
import com.promptforge.promptforge_backend.dto.PromptResponse;

import java.util.List;

public interface PromptService {

    PromptResponse createPrompt(PromptRequest request, String userEmail);

    List<PromptResponse> getAllPrompts(String userEmail);

    PromptResponse getPromptById(Long id, String userEmail);

    PromptResponse updatePrompt(Long id, PromptRequest request, String userEmail);

    void deletePrompt(Long id, String userEmail);
}