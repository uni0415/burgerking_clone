package com.springboot.burgerking.service.auth;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.springboot.burgerking.domain.AddressEntity;
import com.springboot.burgerking.domain.auth.AgreementEntity;
import com.springboot.burgerking.domain.auth.AuthRepository;
import com.springboot.burgerking.domain.auth.FindUserEntity;
import com.springboot.burgerking.domain.auth.NoneMemberMst;
import com.springboot.burgerking.domain.auth.User;
import com.springboot.burgerking.web.controller.dto.AddressDto;
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
	public boolean signup(User user) {
		int result = authRepository.checkUsername(user.getEmail());
		if(result > 0) {
			return false;
		}else {
			authRepository.signup(user);
			return true;
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
	
	@Override
	public int updatePhone(User user) {
		return authRepository.updatePhone(user);
	}
	
	@Override
	public String getPhone(String email) {
		return authRepository.getPhone(email);
	}
	
	@Override
	public String findUserId(FindUserEntity findUserEntity) {
		if(authRepository.findUserId(findUserEntity) > 0) {
			return authRepository.getEmail(findUserEntity.getPhone());
		}
		
		return null;
	}
	public int updateBirth(User user) {
		return authRepository.updateBirth(user);
	}
	
	@Override
	public String getBirth(String email) {
		return authRepository.getBirth(email);
	}
	
	@Override
	public int updateGender(User user) {
		return authRepository.updateGender(user);
	}
	
	@Override
	public String getGender(String email) {
		return authRepository.getGender(email);
	}


}
