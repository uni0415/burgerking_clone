package com.springboot.burgerking.service;

import java.util.List;

import com.springboot.burgerking.domain.MenuDetailMst;
import com.springboot.burgerking.domain.MenuMst;

public interface ProductService {
	
	public List<MenuMst> getProductListAll(int category_id);
	public List<MenuDetailMst> getProductDetailList(int menu_id);
	public List<MenuDetailMst> loadDeliveryList(int category_id);
	public List<MenuDetailMst> loadSubmenuDetail(int menu_id);
}
