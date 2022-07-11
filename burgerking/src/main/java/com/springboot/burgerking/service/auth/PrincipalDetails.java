package com.springboot.burgerking.service.auth;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.springboot.burgerking.domain.auth.User;
import com.springboot.burgerking.web.controller.dto.MenuListDto;

import lombok.Data;

@Data
public class PrincipalDetails implements UserDetails, OAuth2User {
	private static final long serialVersionUID = 1L;
	private MenuListDto menuListDto;
	private User user;
	private Map<String, Object> attributes;

	public PrincipalDetails(User user) {
		this.user = user;
	}

	public PrincipalDetails(User user, Map<String, Object> attributes) {
		this.user = user;
		this.attributes = attributes;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		authorities.add(() -> {
			return user.getRoles();
		});
		return authorities;
	}

	@Override
	public String getPassword() {
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		return user.getEmail();
	}

	public int getId() {
		return user.getId();
	}

	public String getEmail() {
		return user.getEmail();
	}

//	public List<MenuListDto> getOrderMenuList() {
//		return user.getOrder_menu_list();
//	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public String getName() {
		// TODO Auto-generated method stub
		return null;
	}

}
