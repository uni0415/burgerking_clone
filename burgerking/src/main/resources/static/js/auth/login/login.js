const order_button = document.querySelector(".order-button-left");
const order_history_button = document.querySelector(".order-button-right");
const non_members_order_list = document.querySelector(".non-members-order-list");
const non_members_order_history = document.querySelector(".non-members-order-history");
const passwordType = document.querySelectorAll("input[type = 'password']");
const passwordVisible = document.querySelectorAll(".password-visible");
const passwordInvisible = document.querySelectorAll(".password-invisible");
const login_button = document.querySelector(".login-button");
const login_form = document.querySelector("form");

const username = document.querySelector(".username");
const password = document.querySelector(".password");
const saveUsername = document.querySelector("#save-email");



let saveIdValue = localStorage.getItem("saveid");
if (saveIdValue != null) {
   username.value = saveIdValue;
   saveUsername.checked = true;
}


//로그인버튼이 클릭되었을 때
login_button.onclick = () => {

   if (saveUsername.checked == true) {
      localStorage.setItem("saveid", username.value);
   } else {
      localStorage.removeItem('saveid');
   }

   login_form.submit();
   //function() {
   /*
         $.ajax({
            url: "/api/v1/auth/signin",
            method: "post",
            data: { "email": username.value, "password": password.value },
            success: function(data) {
   
               if (data.status == 0) {//로그인 실패
                  alert(data.msg);
               } else {//로그인 성공
                  location.href = "./" //현재 사용하는 path
               }
            },
            error: function(xhr) {
               alert("응답실패 status:" + xhr.status);
            }
         });
   
         return false;
      });*/
}

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


/*login_button.onclick = () => {
   if (username1.value == "") {
      alert("아이디를 입력해주세요!");
   } else if (password1.value == "") {
      alert("비밀번호를 입력해주세요!");
   } else {
      //login_form.submit();

   }

}*/


