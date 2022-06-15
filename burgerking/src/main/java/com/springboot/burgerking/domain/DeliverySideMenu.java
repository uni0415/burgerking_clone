package com.springboot.burgerking.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class DeliverySideMenu {

	private int id;
	private String name;
	private String menu_images;
	private int set_add_price;
	private int large_add_price;
}
