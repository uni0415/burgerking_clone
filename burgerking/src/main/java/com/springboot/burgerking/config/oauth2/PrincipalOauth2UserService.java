package com.springboot.burgerking.config.oauth2;

import java.util.Map;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.springboot.burgerking.domain.auth.AuthRepository;
import com.springboot.burgerking.domain.auth.User;
import com.springboot.burgerking.domain.auth.UserRepository;
import com.springboot.burgerking.service.auth.PrincipalDetails;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

	private final AuthRepository authRepository;

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2User oAuth2User = super.loadUser(userRequest);
		System.out.println("oAuth2User -> " + oAuth2User);
		System.out.println("Attributes -> " + oAuth2User.getAttributes());

		String provider = userRequest.getClientRegistration().getRegistrationId();

		Map<String, Object> attributes = null;
		Map<String, Object> attributes_kakao = null;
		if (provider.equals("naver")) {
			attributes = (Map<String, Object>) oAuth2User.getAttributes().get("response");
		} else if (provider.equals("kakao")) {
			attributes = oAuth2User.getAttributes();
			attributes_kakao = (Map<String, Object>) attributes.get("kakao_account");
		} else {
			attributes = oAuth2User.getAttributes();
		}
		String oAuth2_username = createOAuth2Username(provider, attributes);
		User userEntity = authRepository.findOAuth2UserByOAuth2Username(oAuth2_username);
		System.out.println("userEntity : " + userEntity);
		String oauth2_email = provider.equals("kakao") ? (String) attributes_kakao.get("email") : (String) attributes.get("email");
		System.out.println(oauth2_email);
		String phone = (String)attributes.get("mobile");
		if (userEntity == null) {
			String email = authRepository.getEmail(oauth2_email);
			if(oauth2_email.equals(email)) {
				User user = authRepository.updateUserByOauth2(email, oAuth2_username, provider);
				userEntity = user;
			}else {
				User user = User.builder()
						.email(provider.equals("kakao") ? (String) attributes_kakao.get("email") : (String) attributes.get("email"))
						.oauth2_username(oAuth2_username)
						.name(provider.equals("kakao") ? (String) ((Map<String, Object>) attributes_kakao.get("profile")).get("nickname") : (String) attributes.get("name"))
						.phone(phone)
						.password(new BCryptPasswordEncoder().encode("1234"))
						.roles("ROLE_USER")
						.provider(provider)
						.build();
				System.out.println("user : " + user);
				if (authRepository.insertUser(user) == 0) {
					throw new OAuth2AuthenticationException(new OAuth2Error("400", "회원가입 실패", "/auth/login"), "회원가입 실패");
				}
				userEntity = user;
			}
		}
		return new PrincipalDetails(userEntity, attributes);
	}

	private String createOAuth2Username(String provider, Map<String, Object> attributes) {
		if (provider.equals("naver")) {
			return provider + "_" + (String) attributes.get("id");
		} else if (provider.equals("kakao")) {
			return provider + "_" + Long.toString((Long) attributes.get("id"));
		} else {
			return null;
		}
	}
}
