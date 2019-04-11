package com.skilldistillery.coderdojo.services;

import java.util.List;

import com.skilldistillery.coderdojo.entities.User;

public interface UserService {
    void save(User user);

    User findByUsername(String username);

	List<User> index();
}
