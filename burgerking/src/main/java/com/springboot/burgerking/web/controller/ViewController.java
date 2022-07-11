package com.springboot.burgerking.web.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
	
	@GetMapping("/delivery/cart")
	public String deliveryCart() {
		return "burgerking/delivery/delivery_cart";
	}
	
	@GetMapping("/delivery/mydelivery")
	public String mydelivery() {
		return "burgerking/delivery/mydelivery";
	}
	
	@GetMapping("/delivery/myking")
	public String myking() {
		return "burgerking/delivery/myking";
	}
	
	@GetMapping("/delivery/orderlist")
	public String orderlist() {
		return "burgerking/delivery/orderlist";
	}
	
	@GetMapping("/delivery/membership")
	public String membership() {
		return "burgerking/delivery/membership";
	}
	
	@GetMapping("/delivery/mycoupon")
	public String mycoupon() {
		return "burgerking/delivery/mycoupon";
	}

	@GetMapping("/delivery/order")
	public String delivery_order() {
		return "burgerking/delivery/delivery_order";
	}
	
	@GetMapping("/delivery/delivery_search")
	public String deliverySearch() {
		return "burgerking/delivery/delivery_search";
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
	
	@GetMapping("/auth/agreement")
	public String agreement() {
		return "burgerking/auth/joinAuth";
	}
		
	@GetMapping("/auth/join-info")
	public String joinInfo() {
		return "burgerking/auth/joinInfo";
	}
	
	@GetMapping("/auth/info-change")
	public String infochange() {
		return "burgerking/auth/infochange";
	}
	
	@GetMapping("/auth/findUserInfo")
	public String findUserInfo() {
		return "burgerking/auth/findUserInfo";
	}

}
