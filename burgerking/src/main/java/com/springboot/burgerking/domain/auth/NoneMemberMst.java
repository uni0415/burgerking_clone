package com.springboot.burgerking.domain.auth;

import com.springboot.burgerking.web.controller.dto.NoneMemberDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class NoneMemberMst {
	private int id;
	private String name;
	private String phone;
	private String order_password;
	private String roles;
	
	public NoneMemberDto toNoneMemberDto() {
		return NoneMemberDto.builder()
				.id(id)
				.name(name)
				.phone(phone)
				.order_password(order_password)
				.roles(roles)
				.build();
	}
}
