package com.springboot.burgerking.service.auth;

import com.springboot.burgerking.domain.auth.NoneMemberMst;
import com.springboot.burgerking.web.controller.dto.NoneMemberDto;

public interface AuthService {
	public NoneMemberDto noneMemberSignup(NoneMemberMst noneMemberMst);
}
