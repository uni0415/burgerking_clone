package com.springboot.burgerking.domain.auth;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserRepository {
	
	public User findUserByEmail(String email);
}
