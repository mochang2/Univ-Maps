(function (window, document, undefined) {
    window.onload = function () {
        active()
        adjustStatusBarMargin()

        //우클릭 방지 + 더블클릭 방지 + 드래그 방지
        window.document.oncontextmenu = new Function("return false")
        window.document.onselectstart = new Function("return false")
        window.document.ondragstart = new Function("return false")

        preventCtrlSU()
    };

    function active() { //회원가입 단계 표시
        const stepSignLi = document.querySelectorAll("li")[2]
        stepSignLi.classList.add("active")
    }

    function adjustStatusBarMargin() {  //화면 여백 조정
        const statusBar = document.querySelector("ul")
        statusBar.style.marginBottom = "0"
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


