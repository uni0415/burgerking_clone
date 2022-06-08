package com.springboot.burgerking.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {
	@GetMapping("/index")
	public String index() {
		return "burgerking/index";
	}

	@GetMapping("/menu")
	public String menu() {
		return "burgerking/product/product_introduce";
	}

}
