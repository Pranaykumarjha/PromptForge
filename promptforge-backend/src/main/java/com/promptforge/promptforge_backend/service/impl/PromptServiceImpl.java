package com.promptforge.promptforge_backend.service.impl;

import com.promptforge.promptforge_backend.dto.PromptRequest;
import com.promptforge.promptforge_backend.dto.PromptResponse;
import com.promptforge.promptforge_backend.entity.Prompt;
import com.promptforge.promptforge_backend.entity.User;
import com.promptforge.promptforge_backend.exception.PromptNotFoundException;
import com.promptforge.promptforge_backend.exception.UserNotFoundException;
import com.promptforge.promptforge_backend.repository.PromptRepository;
import com.promptforge.promptforge_backend.repository.UserRepository;
import com.promptforge.promptforge_backend.service.PromptService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PromptServiceImpl implements PromptService {

    private final PromptRepository promptRepository;
    private final UserRepository userRepository;

    public PromptServiceImpl(PromptRepository promptRepository,
                             UserRepository userRepository) {
        this.promptRepository = promptRepository;
        this.userRepository = userRepository;
    }

    @Override
    public PromptResponse createPrompt(PromptRequest request, String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        Prompt prompt = new Prompt();
        prompt.setTitle(request.getTitle());
        prompt.setContent(request.getContent());
        prompt.setUser(user);

        Prompt savedPrompt = promptRepository.save(prompt);

        return new PromptResponse(
                savedPrompt.getId(),
                savedPrompt.getTitle(),
                savedPrompt.getContent()
        );
    }

    @Override
    public List<PromptResponse> getAllPrompts(String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        List<Prompt> prompts = promptRepository.findByUser(user);

        return prompts.stream()
                .map(prompt -> new PromptResponse(
                        prompt.getId(),
                        prompt.getTitle(),
                        prompt.getContent()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public PromptResponse getPromptById(Long id, String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        Prompt prompt = promptRepository.findById(id)
                .orElseThrow(() -> new PromptNotFoundException("Prompt not found"));

        if (!prompt.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }

        return new PromptResponse(
                prompt.getId(),
                prompt.getTitle(),
                prompt.getContent()
        );
    }

    @Override
    public PromptResponse updatePrompt(Long id, PromptRequest request, String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        Prompt prompt = promptRepository.findById(id)
                .orElseThrow(() -> new PromptNotFoundException("Prompt not found"));

        if (!prompt.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }

        prompt.setTitle(request.getTitle());
        prompt.setContent(request.getContent());

        Prompt updatedPrompt = promptRepository.save(prompt);

        return new PromptResponse(
                updatedPrompt.getId(),
                updatedPrompt.getTitle(),
                updatedPrompt.getContent()
        );
    }

    @Override
    public void deletePrompt(Long id, String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        Prompt prompt = promptRepository.findById(id)
                .orElseThrow(() -> new PromptNotFoundException("Prompt not found"));

        if (!prompt.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }

        promptRepository.delete(prompt);
    }
}