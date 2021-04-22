(function (window, document, undefined) {
    window.onload = function () {
        goback()
        active()
        checkPassword()
        checkDuplicatedID()
    };

    function goback() { //회원가입 취소
        const goBackBtn = document.querySelector(".goback-btn")
        goBackBtn.addEventListener("click", (Event) => {
            location.href = "/post/"
        })
    }

    function active() { //회원가입 단계 표시
        const stepSignLi = document.querySelectorAll("li")[1]
        stepSignLi.classList.add("active")
    }


    function checkPassword() { //패스워드 validation 체크
        const rule = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/
        let signupPassword = document.getElementById("signup-password")
        const warningPasswordValidation = document.querySelector(".warning-password-validation")

        let signupPasswordConfirm = document.getElementById("signup-password-confirm")
        const warningPasswordConfirm = document.querySelector(".warning-password-confirm")
        const signupBtn = document.getElementById("signup-btn")

        signupPassword.addEventListener("focusout", (Event) => {
            if (signupPassword.value.match(rule)) {
                warningPasswordValidation.style.display = "none"
            }
            else {
                warningPasswordValidation.style.display = "block"
                signupPassword.focus()
            }
        })

        signupPasswordConfirm.addEventListener("keyup", (Event) => {
            if (signupPassword.value == signupPasswordConfirm.value) {
                warningPasswordConfirm.style.display = "none"
                signupBtn.disabled = false
            }
            else {
                warningPasswordConfirm.style.display = "block"
                signupBtn.disabled = true
            }
        })
    }

    function checkDuplicatedID() {
        //이미 가입된 아이디가 있을 때(에러시), 아이디 다시 입력하면 에러창 가리기
        let signupID = document.getElementById("signup-id")
        const duplicatedIDError = document.querySelector(".duplicated-id-error")

        signupID.addEventListener("keyup", (Event) => {
            if (duplicatedIDError) {
                duplicatedIDError.style.display = "none"
            }
        })
    }

})(window, document, undefined);


