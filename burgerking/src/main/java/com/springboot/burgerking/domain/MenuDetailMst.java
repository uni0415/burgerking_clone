package com.springboot.burgerking.domain;

import java.util.List;

import com.springboot.burgerking.web.controller.dto.MenuDetailDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MenuDetailMst {
	private int id;
	private int menu_id;
	private int category_id;
	private int delivery;
	private String category_name;
	private String main_menu_name;
	private String main_menu_summary;
	private String main_menu_image;
	private String name;
	private String summary;
	private String menu_images;
	private int price;
	private int set_add_price;
	private int large_add_price;
	
	public MenuDetailDto toMenuInfoDto() {
		return MenuDetailDto.builder()
				.id(id)
				.menu_id(menu_id)
				.name(name)
				.menu_images(menu_images)
				.price(price)
				.set_add_price(set_add_price)
				.large_add_price(large_add_price)
				.build();
	}
}
