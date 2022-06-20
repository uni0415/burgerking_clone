package com.springboot.burgerking.web.controller.dto;

import com.springboot.burgerking.domain.auth.AgreementEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AgreementDto {

	private int user_id;
	private boolean terms;
	private boolean privacy_policy;
	private boolean email_agreement;
	private boolean sms_agreement;
	private String name;
	private String phone;
	
	public AgreementEntity toAgreementEntity() {
		return AgreementEntity.builder()
				.user_id(user_id)
				.terms(terms)
				.privacy_policy(privacy_policy)
				.email_agreement(email_agreement)
				.sms_agreement(sms_agreement)
				.build();
	}
}
