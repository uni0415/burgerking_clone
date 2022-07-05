package com.springboot.burgerking.domain.auth;

import org.apache.ibatis.annotations.Mapper;

import com.springboot.burgerking.domain.AddressEntity;

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
	public int findUserId(FindUserEntity findUserEntity);
	public String getEmail(String phone);
	public int updateBirth(User user);
	public String getBirth(String email);
	public int updateGender(User user);
	public String getGender(String email);
	public int insertUser(User user);
	public User findOAuth2UserByOAuth2Username(String oAuth2_username);
	public User updateUserByOauth2(String email, String oauth2_username, String provider);
	
}
