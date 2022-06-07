package com.springboot.burgerking.web.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.burgerking.domain.MenuMst;
import com.springboot.burgerking.service.ProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ProductPageController {
	private final ProductService productService;
	
	@GetMapping("/menulist")
	public ResponseEntity<?> getProductListAll() {
		List<MenuMst> menuList =  productService.getProductListAll();
		return new ResponseEntity<>(menuList, HttpStatus.OK);
	}
}
