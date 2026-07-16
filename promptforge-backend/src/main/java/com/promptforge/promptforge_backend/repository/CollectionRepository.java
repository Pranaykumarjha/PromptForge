package com.promptforge.promptforge_backend.repository;

import com.promptforge.promptforge_backend.entity.Collection;
import com.promptforge.promptforge_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CollectionRepository extends JpaRepository<Collection, Long> {

    List<Collection> findByUser(User user);

    Optional<Collection> findByIdAndUser(Long id, User user);

    Optional<Collection> findByNameAndUser(String name, User user);

    boolean existsByNameAndUser(String name, User user);

    long countByUser(User user);
}