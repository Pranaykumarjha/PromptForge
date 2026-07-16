package com.promptforge.promptforge_backend.service.impl;

import com.promptforge.promptforge_backend.dto.DashboardSummaryResponse;
import com.promptforge.promptforge_backend.entity.User;
import com.promptforge.promptforge_backend.exception.UserNotFoundException;
import com.promptforge.promptforge_backend.repository.CollectionRepository;
import com.promptforge.promptforge_backend.repository.PromptRepository;
import com.promptforge.promptforge_backend.repository.UserRepository;
import com.promptforge.promptforge_backend.service.DashboardService;
import org.springframework.stereotype.Service;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final UserRepository userRepository;
    private final PromptRepository promptRepository;
    private final CollectionRepository collectionRepository;

    public DashboardServiceImpl(UserRepository userRepository,
                                PromptRepository promptRepository,
                                CollectionRepository collectionRepository) {
        this.userRepository = userRepository;
        this.promptRepository = promptRepository;
        this.collectionRepository = collectionRepository;
    }

    @Override
    public DashboardSummaryResponse getDashboardSummary(String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        long totalPrompts = promptRepository.countByUser(user);

        long totalCollections = collectionRepository.countByUser(user);

        long favoritePrompts = promptRepository.countByUserAndFavoriteTrue(user);

        return new DashboardSummaryResponse(
                totalPrompts,
                totalCollections,
                favoritePrompts
        );
    }
}