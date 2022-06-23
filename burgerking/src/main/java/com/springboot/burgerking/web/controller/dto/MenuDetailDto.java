package com.springboot.burgerking.web.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class MenuDetailDto {
	private int id;
	private int menu_id;
	private String name;
	private String menu_images;
	private int price;
	private int set_add_price;
	private int large_add_price;
}
