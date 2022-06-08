package com.springboot.burgerking.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MenuDetailMst {
	private int id;
	private int menu_id;
	private String main_menu_name;
	private String main_menu_summary;
	private String main_menu_image;
	private String name;
	private String summary;
	private String menu_images;
	private int price;
}
