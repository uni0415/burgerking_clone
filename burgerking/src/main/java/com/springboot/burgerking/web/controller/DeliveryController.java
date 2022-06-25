package com.springboot.burgerking.web.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.burgerking.domain.DeliverySideMenu;
import com.springboot.burgerking.domain.MenuDetailMst;
import com.springboot.burgerking.domain.auth.User;
import com.springboot.burgerking.service.DeliveryService;
import com.springboot.burgerking.service.auth.PrincipalDetails;
import com.springboot.burgerking.web.controller.dto.MenuDetailDto;
import com.springboot.burgerking.web.controller.dto.MenuListDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class DeliveryController {
	private final DeliveryService deliveryService;
	
	@GetMapping("/delivery/menu/details")
	public ResponseEntity<?> loadCartListDetails(MenuListDto cartList) {
		System.out.println(cartList);
		return new ResponseEntity<>(deliveryService.getCartMenuDtl(cartList), HttpStatus.OK);
	}

	@GetMapping("/delivery/menu/{category_id}")
	public ResponseEntity<?> loadDeliveryList(@PathVariable int category_id) {
		List<MenuDetailMst> detailList = deliveryService.loadDeliveryList(category_id);
		return new ResponseEntity<>(detailList, HttpStatus.OK);
	}

	@GetMapping("/delivery/menu/detail/{menu_id}")
	public ResponseEntity<?> loadSubmenuDetail(@PathVariable int menu_id) {
		List<MenuDetailMst> detailList = deliveryService.loadSubmenuDetail(menu_id);
		return new ResponseEntity<>(detailList, HttpStatus.OK);
	}

	@GetMapping("/delivery/side/{set_size}")
	public ResponseEntity<?> getSideMenuList(@PathVariable int set_size) {
		List<DeliverySideMenu> sideMenuList = deliveryService.getSideMenuList(set_size);
		return new ResponseEntity<>(sideMenuList, HttpStatus.OK);
	}

	@GetMapping("/delivery/drink/{set_size}")
	public ResponseEntity<?> getDrinkMenuList(@PathVariable int set_size) {
		List<DeliverySideMenu> drinkMenuList = deliveryService.getDrinkMenuList(set_size);
		return new ResponseEntity<>(drinkMenuList, HttpStatus.OK);
	}

	@PostMapping("/delivery/cart/{menu_id}")
	public ResponseEntity<?> getMenuInfo(@PathVariable String menu_id, MenuListDto menuListDto) {
		List<MenuDetailDto> menuDetailDto = (deliveryService.getMenuInfo(menuListDto));
		return new ResponseEntity<>(menuDetailDto, HttpStatus.OK);
	}
	
	
	@PostMapping("/delivery/user-auth")
	public ResponseEntity<?> getMembership(@AuthenticationPrincipal PrincipalDetails principalDetails) {
		User user = principalDetails.getUser();
		return new ResponseEntity<>(user, HttpStatus.OK);
	}

}
