package com.springboot.burgerking.service.auth;

import com.springboot.burgerking.domain.auth.AgreementEntity;
import com.springboot.burgerking.domain.auth.NoneMemberMst;
import com.springboot.burgerking.domain.auth.User;
import com.springboot.burgerking.web.controller.dto.NoneMemberDto;

public interface AuthService {
	public NoneMemberDto noneMemberSignup(NoneMemberMst noneMemberMst);
	public int userAgreement(AgreementEntity agreementEntity);
	public int signup(User user);
	public User signin(User user);
	public User getUserById(int id);
	public int updatePhone(User user);
	public String getPhone(String email);
}
