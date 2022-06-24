package com.springboot.burgerking.domain;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.springboot.burgerking.web.controller.dto.MenuDetailDto;
import com.springboot.burgerking.web.controller.dto.MenuListDto;
@Mapper
public interface DeliveryRepository {

	public List<MenuDetailMst> getDeliveryList(int category_id);
	public List<MenuDetailMst> getSubmenuDetail(int menu_id);
	public List<DeliverySideMenu> getSideMenuList(int set_size);
	public List<DeliverySideMenu> getDrinkMenuList(int set_size);
	public List<MenuDetailDto> getMenuInfo(MenuListDto menuListDto);
}
