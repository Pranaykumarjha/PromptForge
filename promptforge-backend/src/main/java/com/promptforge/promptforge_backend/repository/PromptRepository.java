package com.promptforge.promptforge_backend.repository;

import com.promptforge.promptforge_backend.entity.Prompt;
import com.promptforge.promptforge_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PromptRepository extends JpaRepository<Prompt, Long> {

    List<Prompt> findByUser(User user);

    Optional<Prompt> findByIdAndUser(Long id, User user);
}