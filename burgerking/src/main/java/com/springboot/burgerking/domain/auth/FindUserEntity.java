package com.springboot.burgerking.domain.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class FindUserEntity {
	private String user_name;
	private String phone;
	private String password;

}
