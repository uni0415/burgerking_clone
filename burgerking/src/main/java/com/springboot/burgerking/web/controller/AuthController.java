package com.springboot.burgerking.web.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.burgerking.domain.auth.User;
import com.springboot.burgerking.service.CertificationService;
import com.springboot.burgerking.service.auth.AuthService;
import com.springboot.burgerking.service.auth.PrincipalDetails;
import com.springboot.burgerking.service.auth.PrincipalDetailsService;
import com.springboot.burgerking.web.controller.dto.AgreementDto;
import com.springboot.burgerking.web.controller.dto.FindUserInfoDto;
import com.springboot.burgerking.web.controller.dto.NoneMemberDto;
import com.springboot.burgerking.web.controller.dto.UserDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class AuthController {
	private final CertificationService certificationService;
	private final AuthService authService;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	private final PrincipalDetailsService principalDetailsService;
	Map<String, String> certCode = new HashMap<String, String>();

	@GetMapping("/auth/sendSMS")
	public ResponseEntity<?> sendSMS(String phoneNumber) {
		Random rand = new Random();
		String numStr = "";
		for (int i = 0; i < 4; i++) {
			String ran = Integer.toString(rand.nextInt(10));
			numStr += ran;
		}
		certCode.put(phoneNumber, numStr);
		System.out.println("수신자 번호: " + phoneNumber);
		System.out.println("인증번호: " + numStr);
		certificationService.certifiedPhoneNumber(phoneNumber, numStr);
		return new ResponseEntity<>(numStr, HttpStatus.OK);
	}

	@PostMapping("/auth/check-certNum")
	public ResponseEntity<?> checkCertNum(String phoneNumber, String certNum) {
		boolean result = false;
		if (certNum.equals(certCode.get(phoneNumber))) {
			result = true;
		} else {
			result = false;
		}
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@PostMapping("/auth/none-member-signin")
	public ResponseEntity<?> noneMemberSignup(NoneMemberDto noneMemberDto) {
		noneMemberDto = authService.noneMemberSignup(noneMemberDto.toNoneMemberEntity());
		if (noneMemberDto != null) {
			return new ResponseEntity<>(noneMemberDto, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(noneMemberDto, HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/auth/agreement")
	public ResponseEntity<?> agreement(AgreementDto agreementDto) {
		int result = authService.userAgreement(agreementDto.toAgreementEntity());
		if (result > 0) {
			return new ResponseEntity<>(result, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
		}
	}
	

	@PostMapping("/auth/signup")
	public ResponseEntity<?> signup(UserDto userDto) {
		userDto.setPassword(bCryptPasswordEncoder.encode(userDto.getPassword()));
		boolean result = authService.signup(userDto.toUserEntity());
		if(result == true) {
			return new ResponseEntity<>(result, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/auth/signin")
	public ResponseEntity<?> signin(UserDto userDto) {
		User user = authService.signin(userDto.toSigninEntity());
		System.out.println(user);
		if(user == null) {
			return new ResponseEntity<>(user, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(user, HttpStatus.OK);
	}

	@PostMapping("/delivery/user")
	public ResponseEntity<?> getUser(UserDto userDto, @AuthenticationPrincipal PrincipalDetails principalDetails) {
		int id = principalDetails.getId();
		User user = authService.getUserById(id);
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
	
	@PostMapping("/auth/updatePhone")
	public ResponseEntity<?> updatePhone(UserDto userDto, @AuthenticationPrincipal PrincipalDetails principalDetails){
		if(authService.updatePhone(userDto.toUpdatePhoneEntity())>0) {
			principalDetails.getUser().setPhone(authService.getPhone(userDto.getEmail()));
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("/auth/findUserId")
	public ResponseEntity<?> findUserId(FindUserInfoDto findUserDto){
		String email = authService.findUserId(findUserDto.toFindUserEntity());
		return new ResponseEntity<>(email, HttpStatus.OK);
	}
	
	
	@PostMapping("/auth/updateBirth")
	public ResponseEntity<?> updateBirth(UserDto userDto, @AuthenticationPrincipal PrincipalDetails principalDetails){
		userDto.setEmail(principalDetails.getEmail());
		authService.updateBirth(userDto.toUpdateBirthEntity());
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("/auth/userInfo")
	public ResponseEntity<?> getUserInfo(UserDto userDto, @AuthenticationPrincipal PrincipalDetails principalDetails){
		int id = principalDetails.getId();
		User user = authService.getUserById(id);
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
	
	@PostMapping("/auth/updateGender")
	public ResponseEntity<?> updateGender(UserDto userDto, @AuthenticationPrincipal PrincipalDetails principalDetails){
		userDto.setEmail(principalDetails.getEmail());
		System.out.println(userDto);
		authService.updateGender(userDto.toUpdateGenderEntity());
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	
}
