package com.springboot.burgerking.web.controller;

import java.util.Random;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.burgerking.service.CertificationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class AuthController {
	private final CertificationService certificationService;
	
	@GetMapping("/auth/sendSMS")
	public ResponseEntity<?> sendSMS(String phoneNumber) {
		Random rand = new Random();
		String numStr = "";
		for(int i = 0; i < 4; i++) {
			String ran = Integer.toString(rand.nextInt(10));
			numStr+=ran;
		}
		
		System.out.println("수신자 번호: "+ phoneNumber);
		System.out.println("인증번호: " + numStr);
		certificationService.certifiedPhoneNumber(phoneNumber, numStr);
		return new ResponseEntity<>(numStr, HttpStatus.OK);
	}
}
