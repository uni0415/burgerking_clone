package com.springboot.burgerking.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.springboot.burgerking.config.oauth2.PrincipalOauth2UserService;
import com.springboot.burgerking.service.auth.PrincipalDetailsService;

import lombok.RequiredArgsConstructor;
@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	private final PrincipalDetailsService principalDetailsService;
	private final PrincipalOauth2UserService principalOauth2UserService;
	
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable();
		http.authorizeRequests()
			.antMatchers("/api/v1/delivery/**", "/delivery/**")
			.authenticated()
			.antMatchers("/api/v1/delivery/**", "/delivery/**")
			.access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
			.anyRequest()
			.permitAll()
			.and()
			.formLogin()
			.loginPage("/auth/login")
			.loginProcessingUrl("/api/v1/auth/signin")
			.usernameParameter("email")
			.defaultSuccessUrl("/delivery/menu/1", true)
			.permitAll()
			.and()
			.oauth2Login()
			.loginPage("/auth/login")
			.userInfoEndpoint()
			.userService(principalOauth2UserService)
			.and()
			.defaultSuccessUrl("/delivery/menu/1");
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(principalDetailsService);
	}
}
