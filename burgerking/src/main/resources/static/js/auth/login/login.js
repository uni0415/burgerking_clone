const order_button = document.querySelector(".order-button-left");
const order_history_button = document.querySelector(".order-button-right");
const non_members_order_list = document.querySelector(".non-members-order-list");
const non_members_order_history = document.querySelector(".non-members-order-history");
const passwordType = document.querySelectorAll("input[type = 'password']");
const passwordVisible = document.querySelectorAll(".password-visible");
const passwordInvisible = document.querySelectorAll(".password-invisible");
const login_button = document.querySelector(".login-button");
const login_form = document.querySelector("form");

/*//저장
localStorage.setItem("userid", "rudd1242@naver.com");

//조회
document.getElementById("result").innerHTML = localStorage.getItem("userid");

//삭제
localStorage.removeItem("userid");

//아이디 저장 체크박스 객체 체크 여부 확인
let $idSaveChkObj = $loginFormObj.find('div.save-email>input[type=checkbox]');


//버튼 클릭시 아이디 저장 체크박스 객체 체크 여부 확인
if($idSaveChkObj.prop('checked')){
	let idValue = $(this).find('input[name=id]').val();
	localStorage.setItem("sevedid", idvalue);
}else{
	localStorage.removeItem('savedid');
}


//localStorage 에서 id값 찾기
let saveIdValue = localStorage.getItem("saveid");
if(saveIdValue != null){
	$(loginFormObj).find('input[name=id]').val(saveIdValue);
}


//로그인버튼이 클릭되었을 때
function loginClick (){
	let $loginFormObj = $('div.login-button>a');
	
	//localStorage 에서 id값 찾기
	let saveIdValue = localStorage.getItem("saveid");
	if(saveIdValue != null){
		$(loginFormObj).find('input[name=id]').val(saveIdValue);
	}
	
	$loginFormObj.submit(function(){
		let ajaxUrl = $(this).attr('action');
		let ajaxMethod = $(this).attr('method');
		let idValue = $(this).find('input[name=id]').val();
		let pwdValue = $(this).find('input[name=pwd]').val();
		
		//아이디 저장 체크박스 객체 찾기
		let $idSaveChkObj = $loginFormObj.find('div.save-email>input[type=checkbox]');
		
		//아이디 저장 체크박스 객체 체크 여부확인
		if($idSaveChkObj.prop('checked')){
			let idvalue = $(this).find('input[name=id]').val();
			localStroage.setItem("sevedid", idvalue);
		}else{
			localStroage.removeItem('savedid');
		}
		
		
		$ajax({
			url: ajaxUrl,
			method: ajaxMethod,
			data: {id:idValue, pwd:pwdvalue},
			success: function(responseObj){
				
				if(responseObj.status == 0){//로그인 실패
					alert(responseObj.msg);
				}else{//로그인 성공
					location.href="./" //현재 사용하는 path
				}
			},
			error: function(xhr){
				alert("응답실패 status:" + xhr.status);
			}
		});
		
		return false; 
	});
};
*/
const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
})

order_history_button.onclick = () => {
    order_history_button.classList.add("on");
    order_button.classList.remove("on");
    non_members_order_history.classList.add("on");
    non_members_order_list.classList.remove("on");
}

order_button.onclick = () => {
    non_members_order_history.classList.remove("on");
    non_members_order_list.classList.add("on");
    order_history_button.classList.remove("on");
    order_button.classList.add("on");
}

for (let i = 0; i < passwordType.length; i++) {
    passwordVisibleEvent(i);
    passwordInvisibleEvent(i);
}

function passwordVisibleEvent(index) {
    passwordVisible[index].onclick = () => {
        passwordType[index].type = 'text';
        passwordVisible[index].classList.remove("on");
        passwordInvisible[index].classList.add("on");
    }
}

function passwordInvisibleEvent(index) {
    passwordInvisible[index].onclick = () => {
        passwordType[index].type = 'password';
        passwordVisible[index].classList.add("on");
        passwordInvisible[index].classList.remove("on");
    }
}


login_button.onclick = () => {
    login_form.submit();
}





