package com.springboot.burgerking.web.controller.dto;

import com.springboot.burgerking.domain.AddressEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class AddressDto {
	private int id;
	private int user_id;
	private String address_nickname;
	private String address;
	private String detail_address;
	
	public AddressEntity toAddressEntity() {
		return AddressEntity.builder()
				.id(id)
				.user_id(user_id)
				.address_nickname(address_nickname)
				.address(address)
				.detail_address(detail_address)
				.build();
	}
	
	public AddressEntity toUpdateNicknameEntity() {
		return AddressEntity.builder()
				.user_id(user_id)
				.address_nickname(address_nickname)
				.build();
	}
	
	
}
