package com.springboot.burgerking.service.auth;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.springboot.burgerking.domain.auth.AgreementEntity;
import com.springboot.burgerking.domain.auth.AuthRepository;
import com.springboot.burgerking.domain.auth.NoneMemberMst;
import com.springboot.burgerking.domain.auth.User;
import com.springboot.burgerking.web.controller.dto.NoneMemberDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
	private final AuthRepository authRepository;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;

	@Override
	public NoneMemberDto noneMemberSignup(NoneMemberMst noneMemberMst) {
		int result = authRepository.noneMemberSignup(noneMemberMst);
		if (result > 0) {
			return authRepository.noneMemberSignin(noneMemberMst.getPhone()).toNoneMemberDto();
		} else {
			return null;
		}
	}

	@Override
	public int userAgreement(AgreementEntity agreementEntity) {
		agreementEntity.setUser_id(authRepository.getUserId());
		return authRepository.userAgreement(agreementEntity);
	}

	@Override
	public int signup(User user) {
		if (authRepository.checkUsername(user.getEmail()) == 0) {
			return authRepository.signup(user);
		} else {
			return 0;
		}
	}

	@Override
	public User signin(User user) {
		if (authRepository.checkUsername(user.getEmail()) > 0) {
			String password = authRepository.selectPassword(user.getEmail());
			if (bCryptPasswordEncoder.matches(user.getPassword(), password)) {
				return authRepository.loadUserByEmail(user.getEmail());
			} else {
				return null;
			}
		} else {
			return null;
		}
	}
	
	@Override
	public User getUserById(int id) {
		return authRepository.getUserById(id);
	}

}
