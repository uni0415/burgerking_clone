package com.springboot.burgerking.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Ingredient {

	private int id;
	private String name;
	private String ingredient_image;
	private int price;
	
}
