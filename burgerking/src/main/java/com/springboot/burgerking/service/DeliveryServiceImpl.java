package com.springboot.burgerking.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.springboot.burgerking.domain.DeliveryRepository;
import com.springboot.burgerking.domain.DeliverySideMenu;
import com.springboot.burgerking.domain.MenuDetailMst;
import com.springboot.burgerking.web.controller.dto.MenuDetailDto;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class DeliveryServiceImpl implements DeliveryService {
	private final DeliveryRepository deliveryRepository;
	
	@Override
	public List<MenuDetailMst> loadDeliveryList(int category_id) {
		return deliveryRepository.getDeliveryList(category_id);
	}
	
	@Override
	public List<MenuDetailMst> loadSubmenuDetail(int menu_id) {
		return deliveryRepository.getSubmenuDetail(menu_id);
	}
	
	@Override
	public List<DeliverySideMenu> getSideMenuList(int set_size) {
		return deliveryRepository.getSideMenuList(set_size);
	}
	
	@Override
	public List<DeliverySideMenu> getDrinkMenuList(int set_size) {
		return deliveryRepository.getDrinkMenuList(set_size);
	}
	
	@Override
	public MenuDetailDto getMenuInfo(String id) {
		return deliveryRepository.getMenuInfo(id).toMenuInfoDto();
	}
}
