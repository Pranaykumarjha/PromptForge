package com.promptforge.promptforge_backend.service.impl;

import com.promptforge.promptforge_backend.dto.AuthResponse;
import com.promptforge.promptforge_backend.dto.LoginRequest;
import com.promptforge.promptforge_backend.dto.RegisterRequest;
import com.promptforge.promptforge_backend.dto.UserDto;
import com.promptforge.promptforge_backend.entity.User;
import com.promptforge.promptforge_backend.exception.EmailAlreadyExistsException;
import com.promptforge.promptforge_backend.repository.UserRepository;
import com.promptforge.promptforge_backend.service.UserService;
import com.promptforge.promptforge_backend.util.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public UserServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public void registerUser(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("Email already registered!");
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);
    }

    @Override
    public AuthResponse loginUser(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        UserDto userDto = new UserDto(
                user.getId(),
                user.getName(),
                user.getEmail());

        return new AuthResponse(token, userDto);
    }
}