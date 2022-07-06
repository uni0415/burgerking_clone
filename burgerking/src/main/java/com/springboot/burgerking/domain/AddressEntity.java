package com.springboot.burgerking.domain;

import com.springboot.burgerking.web.controller.dto.AddressDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class AddressEntity {
	private int id;
	private int user_id;
	private String address_nickname;
	private String address;
	private String detail_address;
	
	public AddressDto toAddressDto() {
		return AddressDto.builder()
				.address_nickname(address_nickname)
				.address(address)
				.detail_address(detail_address)
				.build();
	}
}
