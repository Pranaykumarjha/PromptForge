package com.promptforge.promptforge_backend.service;

import com.promptforge.promptforge_backend.dto.AuthResponse;
import com.promptforge.promptforge_backend.dto.LoginRequest;
import com.promptforge.promptforge_backend.dto.RegisterRequest;

public interface UserService {

    void registerUser(RegisterRequest request);

    AuthResponse loginUser(LoginRequest request);
}