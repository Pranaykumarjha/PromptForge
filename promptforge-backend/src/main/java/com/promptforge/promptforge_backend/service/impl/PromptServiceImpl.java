package com.promptforge.promptforge_backend.service.impl;

import com.promptforge.promptforge_backend.dto.PromptRequest;
import com.promptforge.promptforge_backend.dto.PromptResponse;
import com.promptforge.promptforge_backend.entity.Collection;
import com.promptforge.promptforge_backend.entity.Prompt;
import com.promptforge.promptforge_backend.entity.User;
import com.promptforge.promptforge_backend.exception.CollectionNotFoundException;
import com.promptforge.promptforge_backend.exception.PromptNotFoundException;
import com.promptforge.promptforge_backend.exception.UserNotFoundException;
import com.promptforge.promptforge_backend.repository.CollectionRepository;
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
        private final CollectionRepository collectionRepository;

        public PromptServiceImpl(PromptRepository promptRepository,
                        UserRepository userRepository,
                        CollectionRepository collectionRepository) {
                this.promptRepository = promptRepository;
                this.userRepository = userRepository;
                this.collectionRepository = collectionRepository;
        }

        @Override
        public PromptResponse createPrompt(PromptRequest request, String userEmail) {

                User user = userRepository.findByEmail(userEmail)
                                .orElseThrow(() -> new UserNotFoundException("User not found"));

                Prompt prompt = new Prompt();
                prompt.setTitle(request.getTitle());
                prompt.setContent(request.getContent());
                prompt.setUser(user);
                Collection generalCollection = getOrCreateGeneralCollection(user);
                prompt.setCollection(generalCollection);

                Prompt savedPrompt = promptRepository.save(prompt);

                return mapToResponse(savedPrompt);
        }

        @Override
        public List<PromptResponse> getAllPrompts(String userEmail) {

                User user = userRepository.findByEmail(userEmail)
                                .orElseThrow(() -> new UserNotFoundException("User not found"));

                List<Prompt> prompts = promptRepository.findByUser(user);

                return prompts.stream()
                                .map(this::mapToResponse)
                                .collect(Collectors.toList());
        }

        @Override
        public PromptResponse getPromptById(Long id, String userEmail) {

                User user = userRepository.findByEmail(userEmail)
                                .orElseThrow(() -> new UserNotFoundException("User not found"));

                Prompt prompt = promptRepository.findByIdAndUser(id, user)
                                .orElseThrow(() -> new PromptNotFoundException("Prompt not found"));

                return mapToResponse(prompt);
        }

        @Override
        public PromptResponse updatePrompt(Long id, PromptRequest request, String userEmail) {

                User user = userRepository.findByEmail(userEmail)
                                .orElseThrow(() -> new UserNotFoundException("User not found"));

                Prompt prompt = promptRepository.findByIdAndUser(id, user)
                                .orElseThrow(() -> new PromptNotFoundException("Prompt not found"));

                prompt.setTitle(request.getTitle());
                prompt.setContent(request.getContent());

                Prompt updatedPrompt = promptRepository.save(prompt);

                return mapToResponse(updatedPrompt);
        }

        @Override
        public void deletePrompt(Long id, String userEmail) {

                User user = userRepository.findByEmail(userEmail)
                                .orElseThrow(() -> new UserNotFoundException("User not found"));

                Prompt prompt = promptRepository.findByIdAndUser(id, user)
                                .orElseThrow(() -> new PromptNotFoundException("Prompt not found"));

                promptRepository.delete(prompt);
        }

        @Override
        public PromptResponse assignPromptToCollection(Long promptId,
                        Long collectionId,
                        String userEmail) {

                User user = userRepository.findByEmail(userEmail)
                                .orElseThrow(() -> new UserNotFoundException("User not found"));

                Prompt prompt = promptRepository.findByIdAndUser(promptId, user)
                                .orElseThrow(() -> new PromptNotFoundException("Prompt not found"));

                Collection collection = collectionRepository.findByIdAndUser(collectionId, user)
                                .orElseThrow(() -> new CollectionNotFoundException("Collection not found"));

                prompt.setCollection(collection);

                Prompt updatedPrompt = promptRepository.save(prompt);

                return mapToResponse(updatedPrompt);
        }

        private PromptResponse mapToResponse(Prompt prompt) {

                return new PromptResponse(
                                prompt.getId(),
                                prompt.getTitle(),
                                prompt.getContent(),
                                prompt.getCollection() != null ? prompt.getCollection().getId() : null,
                                prompt.getCollection() != null ? prompt.getCollection().getName() : null,
                                prompt.isFavorite());
        }

        private Collection getOrCreateGeneralCollection(User user) {

                return collectionRepository.findByNameAndUser("General", user)
                                .orElseGet(() -> {

                                        Collection general = new Collection();
                                        general.setName("General");
                                        general.setUser(user);

                                        return collectionRepository.save(general);
                                });
        }

        @Override
        public PromptResponse toggleFavorite(Long promptId, String userEmail) {

                User user = userRepository.findByEmail(userEmail)
                                .orElseThrow(() -> new UserNotFoundException("User not found"));

                Prompt prompt = promptRepository.findByIdAndUser(promptId, user)
                                .orElseThrow(() -> new PromptNotFoundException("Prompt not found"));

                prompt.setFavorite(!prompt.isFavorite());

                Prompt updatedPrompt = promptRepository.save(prompt);

                return mapToResponse(updatedPrompt);
        }

        @Override
        public List<PromptResponse> searchPrompts(String keyword, String userEmail) {

                User user = userRepository.findByEmail(userEmail)
                                .orElseThrow(() -> new UserNotFoundException("User not found"));

                List<Prompt> prompts = promptRepository
                                .findByUserAndTitleContainingIgnoreCaseOrUserAndContentContainingIgnoreCase(
                                                user,
                                                keyword,
                                                user,
                                                keyword);

                return prompts.stream()
                                .map(this::mapToResponse)
                                .collect(Collectors.toList());
        }

        @Override
        public List<PromptResponse> getFavoritePrompts(String userEmail) {

                User user = userRepository.findByEmail(userEmail)
                                .orElseThrow(() -> new UserNotFoundException("User not found"));

                List<Prompt> prompts = promptRepository.findByUserAndFavoriteTrue(user);

                return prompts.stream()
                                .map(this::mapToResponse)
                                .collect(Collectors.toList());
        }

        @Override
        public List<PromptResponse> getPromptsByCollection(Long collectionId,
                        String userEmail) {

                User user = userRepository.findByEmail(userEmail)
                                .orElseThrow(() -> new UserNotFoundException("User not found"));

                Collection collection = collectionRepository
                                .findByIdAndUser(collectionId, user)
                                .orElseThrow(() -> new CollectionNotFoundException("Collection not found"));

                List<Prompt> prompts = promptRepository.findByCollectionAndUser(collection, user);

                return prompts.stream()
                                .map(this::mapToResponse)
                                .collect(Collectors.toList());
        }
}