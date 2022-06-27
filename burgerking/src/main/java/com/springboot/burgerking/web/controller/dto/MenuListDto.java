package com.springboot.burgerking.web.controller.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class MenuListDto {

	private List<Integer> menu_id_list;
	//private List<Integer> ingredient_list;
}
