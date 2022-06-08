package com.springboot.burgerking.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MenuMst {

	private int id;
	private int category_id;
	private String name;
	private String menu_image;
}
