package com.springboot.burgerking.web.controller.dto;

import com.springboot.burgerking.domain.auth.FindUserEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class FindUserInfoDto {
	private String user_name;
	private String phone;
	private String password;
	
	public FindUserEntity toFindUserEntity() {
		return FindUserEntity.builder()
				.user_name(user_name)
				.phone(phone)
				.build();
	}

}
