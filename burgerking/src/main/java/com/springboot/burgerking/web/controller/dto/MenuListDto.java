package com.springboot.burgerking.web.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class MenuListDto {

	private String menu_id;
	private String side_menu_id;
	private String drink_menu_id;
}
