package com.springboot.burgerking.service;

import java.util.HashMap;

import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;

@Service
@RequiredArgsConstructor
public class CertificationServiceImpl implements CertificationService {

	@Override
	public void certifiedPhoneNumber(String phoneNumber, String cerNum) {
		String api_key = "NCSU51TXGVFNWPI2";
		String api_secret = "RR8DN1BUIP9L6J71DVLANK4FDCXCMCC8";
		Message coolsms = new Message(api_key, api_secret);
		
		HashMap<String, String> params = new HashMap<String, String>();
		params.put("to", phoneNumber);
		params.put("from", "01026238452");
		params.put("type", "SMS");
		params.put("text", "[버거킹 본인확인] 인증번호 " + "[" + cerNum+ "]" + "를 입력해 주세요.");
		params.put("app_version", "test app 1.2");
		
		try {
			JSONObject obj = (JSONObject) coolsms.send(params);
			System.out.println(obj.toString());
		} catch(CoolsmsException e) {
			System.out.println(e.getMessage());
			System.out.println(e.getCode());
		}
	}

}
