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
	
	@GetMapping("/delivery/menu/{category_id}")
	public String delivery(@PathVariable Integer category_id) {
		return "burgerking/delivery/delivery_menu";
	}
	
	
	@GetMapping("/auth/login")
	public String signin() {
		return "burgerking/auth/login";
	}

	@GetMapping("/auth/signup")
	public String signup() {
		return "burgerking/auth/join";
	}
	
	@GetMapping("/auth/none-member-signup")
	public String nonMemberSignup() {
		return "burgerking/auth/none_member_order";
	}
	
	
	@GetMapping("/auth/email-signup")
	public String emailSignup() {
		return "burgerking/auth/joinAuth";
	}
	
	@GetMapping("/auth/join-info")
	public String joinInfo() {
		return "burgerking/auth/joinInfo";
	}
}
