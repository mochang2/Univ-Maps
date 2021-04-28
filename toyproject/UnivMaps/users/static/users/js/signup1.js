(function (window, document, undefined) {
    window.onload = function () {
        termsListener()
        agree()
        goback()
        active()

        //우클릭 방지 + 더블클릭 방지 + 드래그 방지
        window.document.oncontextmenu = new Function("return false")
        window.document.onselectstart = new Function("return false")
        window.document.ondragstart = new Function("return false")

        preventCtrlSU()
    };

    function termsListener() { // 약관 보이게, 안 보이게
        const hideShowTerms = document.querySelector(".hide-and-show-terms")
        const faArrow = document.querySelector(".fa-arrow-down")
        const agreementContent = document.querySelector(".agreement-content")

        hideShowTerms.addEventListener("click", (Event) => {
            if (faArrow.style.transform !== "rotate(0.5turn)") {
                faArrow.style.transform = "rotate(0.5turn)"
                agreementContent.style.display = "block"
            }
            else if (faArrow.style.transform == "rotate(0.5turn)") {
                faArrow.style.transform = "rotate(1turn)"
                agreementContent.style.display = "none"
            }
        })
    }

    function agree() { //약관 동의시
        const okBtn = document.querySelector(".ok-btn")
        const checkBox = document.querySelector(".check-box")
        okBtn.addEventListener("click", (Event) => {
            if (checkBox.checked == false) {
                alert("약관에 동의해주세요.")
            }
        })
    }

    function goback() { //회원가입 취소시
        const goBackBtn = document.querySelector(".goback-btn")
        goBackBtn.addEventListener("click", (Event) => {
            history.back()
        })
    }

    function active() { //회원가입 단계 표시
        const stepSignLi = document.querySelectorAll("li")[0]
        stepSignLi.classList.add("active")
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

})(window, document, undefined)


