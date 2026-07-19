package com.promptforge.promptforge_backend.controller;

import com.promptforge.promptforge_backend.dto.AuthResponse;
import com.promptforge.promptforge_backend.dto.LoginRequest;
import com.promptforge.promptforge_backend.dto.RegisterRequest;
import com.promptforge.promptforge_backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
        System.out.println("UserController Created");
    }

    @GetMapping("/hello")
    public String hello() {
        return "Welcome to PromptForge Backend!";
    }

    @PostMapping("/register")
    public String register(@Valid @RequestBody RegisterRequest request) {

        userService.registerUser(request);

        return "User Registered Successfully!";
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {

        return userService.loginUser(request);
    }
}