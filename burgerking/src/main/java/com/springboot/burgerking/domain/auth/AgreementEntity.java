package com.springboot.burgerking.domain.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class AgreementEntity {
	private int user_id;
	private boolean terms;
	private boolean privacy_policy;
	private boolean email_agreement;
	private boolean sms_agreement;
}
