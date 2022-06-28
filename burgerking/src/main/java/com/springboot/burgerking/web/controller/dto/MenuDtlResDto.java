package com.springboot.burgerking.web.controller.dto;

import java.util.List;

import com.springboot.burgerking.domain.Ingredient;

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
public class MenuDtlResDto {

	private int id;
	private String name;
	private String menu_images;
	private int price;
	private int set_size;
	private int set_add_price;
	private int large_add_price;

	/*
	 * private List<Ingredient> ingredient_list;
	 * 
	 * @Override public boolean equals(Object obj) { if(obj instanceof
	 * MenuDtlResDto) { MenuDtlResDto target = (MenuDtlResDto) obj; if(target.id ==
	 * this.id) { return true; } } return false; }
	 */
}
