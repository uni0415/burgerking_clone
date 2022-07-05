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
	public int updatePhone(User user);
	public String getPhone(String email);
	public int updateBirth(User user);
	public String getBirth(String email);
	public int updateGender(User user);
	public String getGender(String email);
	public int insertUser(User user);
	public String getEmail(String email);
	public User findOAuth2UserByOAuth2Username(String oAuth2_username);
	public User updateUserByOauth2(String email, String oauth2_username, String provider);
}
