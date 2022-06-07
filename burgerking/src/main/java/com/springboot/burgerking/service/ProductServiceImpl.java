package com.springboot.burgerking.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.springboot.burgerking.domain.MenuMst;
import com.springboot.burgerking.domain.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
	
	private final ProductRepository productRepository;
	
	@Override
	public List<MenuMst> getProductListAll() {
		return productRepository.getProductListAll();
	}
}
