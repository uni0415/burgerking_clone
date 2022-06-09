package com.springboot.burgerking.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class ViewController {
	@GetMapping("/index")
	public String index() {
		return "burgerking/index";
	}

	@GetMapping("/menu/{category_id}")
	public String menu(@PathVariable Integer category_id) {
		return "burgerking/product/product_introduce";
	}
	
	@GetMapping("/menu/detail/{menu_id}")
	public String detail(@PathVariable Integer menu_id) {
		return "burgerking/product/product_detail";
	}

}
