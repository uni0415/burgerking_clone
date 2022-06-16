package com.springboot.burgerking.service.auth;

import org.springframework.stereotype.Service;

import com.springboot.burgerking.domain.auth.AuthRepository;
import com.springboot.burgerking.domain.auth.NoneMemberMst;
import com.springboot.burgerking.web.controller.dto.NoneMemberDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
	private final AuthRepository authRepository;

	@Override
	public NoneMemberDto noneMemberSignup(NoneMemberMst noneMemberMst) {
		int result = authRepository.noneMemberSignup(noneMemberMst);
		if(result>0) {
			return authRepository.noneMemberSignin(noneMemberMst.getPhone()).toNoneMemberDto();
		}else {
			return null;
		}
	}
}
