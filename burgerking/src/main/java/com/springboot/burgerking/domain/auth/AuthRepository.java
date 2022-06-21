package com.springboot.burgerking.domain.auth;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AuthRepository {
	public int noneMemberSignup(NoneMemberMst noneMemberMst);
	public NoneMemberMst noneMemberSignin(String phone); 
	public int userAgreement(AgreementEntity agreementEntity);
	public int checkUsername(String email);
	public String selectPassword(String email);
	public User loadUserByEmail(String email);
	public int getUserId();
	public int signup(User user);
	public User getUserById(int id);
}
