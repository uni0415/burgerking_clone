package com.springboot.burgerking.domain.auth;

import java.time.LocalDateTime;
import java.util.List;

import com.springboot.burgerking.web.controller.dto.MenuListDto;
import com.springboot.burgerking.web.controller.dto.UserDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder

public class User {
	private int id;
	//private int agreement_id;
	private String email;
	private String oauth2_username;
	private String name;
	private String phone;
	private String gender;
	private String birth_year;
	private String birth_month;
	private String birth_date;
	private String password;
	private String provider;
	private String roles = "ROLE_USER";
	//private List<MenuListDto> order_menu_list;
	private LocalDateTime create_date;
	private LocalDateTime update_date;
	
	public UserDto toUserDto() {
		return UserDto.builder()
				.email(email)
				.password(password)
				.build();
	}
}
