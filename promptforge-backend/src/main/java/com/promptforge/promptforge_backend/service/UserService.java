package com.promptforge.promptforge_backend.service;

import com.promptforge.promptforge_backend.dto.LoginRequest;
import com.promptforge.promptforge_backend.dto.RegisterRequest;

public interface UserService {

    void registerUser(RegisterRequest request);

    String loginUser(LoginRequest request);
}