package com.promptforge.promptforge_backend.repository;

import com.promptforge.promptforge_backend.entity.Prompt;
import com.promptforge.promptforge_backend.entity.User;
import com.promptforge.promptforge_backend.entity.Collection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PromptRepository extends JpaRepository<Prompt, Long> {

    List<Prompt> findByUser(User user);

    Optional<Prompt> findByIdAndUser(Long id, User user);

    List<Prompt> findByUserAndFavoriteTrue(User user);

    List<Prompt> findByUserAndTitleContainingIgnoreCaseOrUserAndContentContainingIgnoreCase(
            User user,
            String titleKeyword,
            User userAgain,
            String contentKeyword);

    List<Prompt> findByCollectionAndUser(Collection collection, User user);

    long countByUser(User user);

    long countByUserAndFavoriteTrue(User user);
}