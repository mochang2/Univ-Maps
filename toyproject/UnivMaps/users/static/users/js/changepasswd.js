(function (window, document, undefined) {
    window.onload = function () {
        checkPassword()
        goback()

        //우클릭 방지 + 더블클릭 방지 + 드래그 방지
        window.document.oncontextmenu = new Function("return false")
        window.document.onselectstart = new Function("return false")
        window.document.ondragstart = new Function("return false")

        preventCtrlSU()
    };

    function checkPassword() {
        const rule = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/
        let newPasswd = document.getElementById("new-passwd")
        const warningPasswordValidation = document.querySelector(".warning-passwd-validation")

        let newPasswdConfirm = document.getElementById("new-passwd-confirm")
        const warningPasswordConfirm = document.querySelector(".warning-passwd-confirm")
        const changeBtn = document.getElementById("change-btn")

        newPasswd.addEventListener("focusout", (Event) => {
            if (newPasswd.value.match(rule)) {
                warningPasswordValidation.style.display = "none"
                changeBtn.disabled = false
            }
            else {
                warningPasswordValidation.style.display = "block"
                newPasswd.focus()
                changeBtn.disabled = true
            }
        })

        newPasswdConfirm.addEventListener("keyup", (Event) => {
            if (newPasswd.value == newPasswdConfirm.value) {
                warningPasswordConfirm.style.display = "none"
                changeBtn.disabled = false
            }
            else {
                warningPasswordConfirm.style.display = "block"
                changeBtn.disabled = true
            }
        })
    }

    function goback() {
        const goBackBtn = document.querySelector(".goback-btn")
        goBackBtn.addEventListener("click", (Event) => {
            console.log(11)
            location.href = "/post/"
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