package com.springboot.burgerking.web.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.burgerking.domain.MenuDetailMst;
import com.springboot.burgerking.domain.MenuMst;
import com.springboot.burgerking.service.ProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ProductController {
	private final ProductService productService;
	
	@GetMapping("/menu/{category_id}")
	public ResponseEntity<?> getProductListAll(@PathVariable int category_id) {
		List<MenuMst> menuList =  productService.getProductListAll(category_id);
		return new ResponseEntity<>(menuList, HttpStatus.OK);
	}
	
	@GetMapping("/menu/detail/{menu_id}")
	public ResponseEntity<?> loadProductDetail(@PathVariable int menu_id) {
		List<MenuDetailMst> detailList = productService.getProductDetailList(menu_id);
		return new ResponseEntity<>(detailList, HttpStatus.OK);
	}
	
	
	
}
