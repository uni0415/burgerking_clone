package com.springboot.burgerking.domain.auth;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AuthRepository {
	public int noneMemberSignup(NoneMemberMst noneMemberMst);
	public NoneMemberMst noneMemberSignin(String phone); 
}
