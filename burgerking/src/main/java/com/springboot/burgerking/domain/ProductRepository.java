package com.springboot.burgerking.domain;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ProductRepository {

	public List<MenuMst> getProductListAll();
}
