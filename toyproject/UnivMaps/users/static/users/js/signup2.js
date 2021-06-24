(function (window, document, undefined) {
    window.onload = function () {
        goback()
        active()
        checkPassword()
        checkDuplicatedID()

        //우클릭 방지 + 더블클릭 방지 + 드래그 방지
        window.document.oncontextmenu = new Function("return false")
        window.document.onselectstart = new Function("return false")
        window.document.ondragstart = new Function("return false")

        preventCtrlSU()
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
        // 적어도 한가지 digit, 한가지 소문자, 한가지 대문자, 공백을 제외한 한가지 특수문자
        // 전방탐색에 매칭되는 8~20자리
        // 전방탐색 없이 (.*\d) 식으로 써 넣으면 숫자->소문자->대문자->특수문자 반드시 이 순서대로인
        // 패스워드만 통과되므로 전방탐색이 필요
        // (?=~~): 전방탐색 시 *(0개 이상) 이어야 함 
        // +(1개 이상) 안됨  +가 있으면 전방탐색에 써놓은 순서에 영향을 받음
        // ^(?=.+\d)~~ => 1QWER!@#$qwer 이런거는 통과가 안됨
        // .* 식으로 전방탐색하면 매칭된 이후 맨 첫 위치를 return(다음 패턴을 찾기 시작할 위치)함
        // 그래서 전방탐색 조건에 부합하면 아무 문자열(.) 이 8~20 글자 있으면 됨({8,20})
        const rule = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/
        let signupPassword = document.getElementById("signup-password")
        const warningPasswordValidation = document.querySelector(".warning-password-validation")

        let signupPasswordConfirm = document.getElementById("signup-password-confirm")
        const warningPasswordConfirm = document.querySelector(".warning-password-confirm")
        const signupBtn = document.getElementById("signup-btn")

        signupPassword.addEventListener("focusout", (Event) => {
            if (signupPassword.value.match(rule)) {
                warningPasswordValidation.style.display = "none"
                signupBtn.disabled = false
            }
            else {
                warningPasswordValidation.style.display = "block"
                signupPassword.focus()
                signupBtn.disabled = true
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
        const idHeaderRight = document.querySelector(".id-header-right")
        const duplicatedIDError = document.querySelector(".duplicated-id-error")

        signupID.addEventListener("input", (Event) => { //checkifIDduplicated 마무리 짓고 잘 동작하는지 확인 필요
            if (duplicatedIDError) {
                duplicatedIDError.style.display = "none"
            }
        })
        signupID.addEventListener("click", (Event) => {
            // innerWrapper 기준으로 (반응형) 새 창 크기 결정
            let innerWrapper = document.querySelector(".inner-wrapper")
            newWindowWidth = innerWrapper.clientWidth - 20
            stringVerNewWindowWidth = newWindowWidth.toString()

            window.open("/auth/checkID", "아이디 중복 확인", "width=" + stringVerNewWindowWidth + ", height=300, toolbar=no, menubar=no, scrollbars=no, resizable=no")
        })
        idHeaderRight.addEventListener("click", (Event) => {
            // innerWrapper 기준으로 (반응형) 새 창 크기 결정
            let innerWrapper = document.querySelector(".inner-wrapper")
            newWindowWidth = innerWrapper.clientWidth - 20
            stringVerNewWindowWidth = newWindowWidth.toString()

            window.open("/auth/checkID", "아이디 중복 확인", "width=" + stringVerNewWindowWidth + ", height=300, toolbar=no, menubar=no, scrollbars=no, resizable=no")
        })
    }

    function preventCtrlSU() {
        let keysPressed = new Map()

        document.addEventListener("keydown", (Event) => {
            let keycode
            if (Event.key !== undefined) {
                keycode = Event.key
            }
            else if (Event.keyIdentifier !== undefined) {
                keycode = Event.keyIdentifier
            }
            else if (Event.keyCode !== undefined) {
                // keyCode는 곧 사라짐.
                keycode = String.fromCharCode(Event.keyCode).toLowerCase()
            }

            // ctrl + s, ctrl + u 방지
            keysPressed.set(keycode, true)

            if ((keysPressed.get("Control") && keycode == "s") ||
                (keysPressed.get("Control") && keycode == "u")) {
                Event.preventDefault()
                Event.returnValue = false
            }
        })

        document.addEventListener("keyup", (Event) => {
            let keycode
            if (Event.key !== undefined) {
                keycode = Event.key
            }
            else if (Event.keyIdentifier !== undefined) {
                keycode = Event.keyIdentifier
            }
            else if (Event.keyCode !== undefined) {
                // keyCode는 곧 사라짐.
                keycode = String.fromCharCode(Event.keyCode).toLowerCase()
            }

            keysPressed.delete(keycode)
        })
    }

})(window, document, undefined);


