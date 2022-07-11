package com.springboot.burgerking.web.controller.dto;

import com.springboot.burgerking.domain.auth.NoneMemberMst;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class NoneMemberDto {
	private int id;
	private String name;
	private String phone;
	private String order_password;
	private String roles = "ROLE_USER";
	
	public NoneMemberMst toNoneMemberEntity() {
		return NoneMemberMst.builder()
				.name(name)
				.phone(phone)
				.order_password(order_password)
				.roles(roles)
				.build();
	}
}
