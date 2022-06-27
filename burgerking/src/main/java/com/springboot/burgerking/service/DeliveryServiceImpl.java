package com.springboot.burgerking.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.springboot.burgerking.domain.DeliveryRepository;
import com.springboot.burgerking.domain.DeliverySideMenu;
import com.springboot.burgerking.domain.Ingredient;
import com.springboot.burgerking.domain.MenuDetailMst;
import com.springboot.burgerking.domain.MenuDtlWithIngredient;
import com.springboot.burgerking.web.controller.dto.MenuDetailDto;
import com.springboot.burgerking.web.controller.dto.MenuDtlResDto;
import com.springboot.burgerking.web.controller.dto.MenuListDto;

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
	public List<MenuDetailDto> getMenuInfo(MenuDetailDto menuDetailDto) {
		return deliveryRepository.getMenuInfo(menuDetailDto);
	}
	
	/*
	 * @Override public List<MenuDtlResDto> getCartMenuDtl(MenuListDto menuListDto)
	 * { List<MenuDtlWithIngredient> test =
	 * deliveryRepository.getCartMenuDetails(menuListDto); System.out.println(test);
	 * List<MenuDtlResDto> dtoList = new ArrayList<MenuDtlResDto>();
	 * 
	 * for(MenuDtlWithIngredient dtl : test) { int index =
	 * dtoList.indexOf(MenuDtlResDto.builder().id(dtl.getId()).build());
	 * 
	 * if(index != -1) { List<Ingredient> ingredient_list =
	 * dtoList.get(index).getIngredient_list();
	 * ingredient_list.add(Ingredient.builder() .id(dtl.getIngredient_id())
	 * .name(dtl.getIngredient_name()) .price(dtl.getIngredient_price()) .build());
	 * } else { dtoList.add(dtl.toResDto()); } } System.out.println(dtoList); return
	 * dtoList; }
	 */
	
	@Override
	public List<MenuDtlResDto> getCartMenuDtl(MenuListDto menuListDto) {
		List<MenuDtlWithIngredient> menuDtl = deliveryRepository.getCartMenuDetails(menuListDto);
		List<MenuDtlResDto> dtoList = new ArrayList<MenuDtlResDto>();
		for(MenuDtlWithIngredient dtl : menuDtl) {
			dtoList.add(dtl.toResDto());
			
		}
		System.out.println(dtoList);
		return dtoList;
	}
}
