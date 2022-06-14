package com.springboot.burgerking.domain;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
@Mapper
public interface DeliveryRepository {

	public List<MenuDetailMst> getDeliveryList(int category_id);
	public List<MenuDetailMst> getSubmenuDetail(int menu_id);
	public List<DeliverySideMenu> getSideMenuList(int set_size);
}
