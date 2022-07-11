package com.springboot.burgerking.web.controller.dto;

import com.springboot.burgerking.domain.auth.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class UserDto {
	private String email;
	private String name;
	private String phone;
	private String gender;
	private String birth_year;
	private String birth_month;
	private String birth_date;
	private String password;
	private String provider;
	private String roles = "ROLE_USER";
	
	public User toUserEntity() {
		return User.builder()
				.email(email)
				.name(name)
				.phone(phone)
				.gender(gender)
				.birth_year(birth_year)
				.birth_month(birth_month)
				.birth_date(birth_date)
				.password(password)
				.roles(roles)
				.build();
	}
	
	public User toSigninEntity() {
		return User.builder()
				.email(email)
				.password(password)
				.build();
	}
	
	public User toUpdatePhoneEntity() {
		return User.builder()
				.email(email)
				.phone(phone)
				.build();
	}
	
	public User toUpdateBirthEntity() {
		return User.builder()
				.email(email)
				.birth_year(birth_year)
				.birth_month(birth_month)
				.birth_date(birth_date)
				.build();
	}
	
	public User toUpdateGenderEntity() {
		return User.builder()
				.email(email)
				.gender(gender)
				.build();
	}
}
