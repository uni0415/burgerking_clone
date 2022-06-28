package com.springboot.burgerking.domain;

import java.util.ArrayList;
import java.util.List;

import com.springboot.burgerking.web.controller.dto.MenuDtlResDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MenuDtlWithIngredient {

	private int id;
	private String name;
	private String menu_images;
	private int price;
	private int set_size;
	private int set_add_price;
	private int large_add_price;
	
//	private int ingredient_id;
//	private String ingredient_name;
//	private int ingredient_price;
	
	public MenuDtlResDto toResDto() {
//		List<Ingredient> ingredient_list = new ArrayList<Ingredient>();
//		ingredient_list.add(Ingredient.builder()
//									  .id(ingredient_id)
//									  .name(ingredient_name)
//									  .price(ingredient_price)
//									  .build());
		return MenuDtlResDto.builder()
							.id(id)
							.name(name)
							.menu_images(menu_images)
							.price(price)
							.set_size(set_size)
							.set_add_price(set_add_price)
							.large_add_price(large_add_price)
							//.ingredient_list(ingredient_list)
							.build();
	}
}
