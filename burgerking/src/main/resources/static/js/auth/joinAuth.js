const agreement_check = document.querySelectorAll(".check");
const authenticate_button = document.querySelector(".authenticate-button");
let check_flag = [false, false, false, false];

authenticate_button.onclick = () => {

	for (let i = 0; i < agreement_check.length; i++) {
		if (agreement_check[i].checked) {
			check_flag[i] = true;
		}
	}
	
	
	$.ajax({
		type:"post",
		dataType:"text",
		data:{
			"terms": check_flag[0],
			"privacy_policy": check_flag[1],
			"email_agreement": check_flag[2],
			"sms_agreement": check_flag[3]
		},
		url:"/api/v1/auth/agreement",
		success:function(data){
			
		}
		
	})
}


