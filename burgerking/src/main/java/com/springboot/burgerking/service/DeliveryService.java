package com.springboot.burgerking.service;

import java.util.List;

import com.springboot.burgerking.domain.DeliverySideMenu;
import com.springboot.burgerking.domain.MenuDetailMst;

public interface DeliveryService {
	public List<MenuDetailMst> loadDeliveryList(int category_id);
	public List<MenuDetailMst> loadSubmenuDetail(int menu_id);
	public List<DeliverySideMenu> getSideMenuList(int set_size);
	public List<DeliverySideMenu> getDrinkMenuList(int set_size);
}
