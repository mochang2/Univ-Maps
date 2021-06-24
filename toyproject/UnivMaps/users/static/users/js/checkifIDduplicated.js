(function (window, document, undefined) {
    window.onload = function () {
        passChildValueToParent()
        closeChildWindow()

        //우클릭 방지 + 더블클릭 방지 + 드래그 방지
        window.document.oncontextmenu = new Function("return false")
        window.document.onselectstart = new Function("return false")
        window.document.ondragstart = new Function("return false")

        preventCtrlSU()
    };

    function passChildValueToParent() {
        try {
            const useThisUsernameBtn = document.querySelector(".use-this-username-btn")

            useThisUsernameBtn.addEventListener("click", () => {
                if (opener != null && !opener.closed && opener.location.pathname == "/auth/signup/") {
                    opener.document.getElementById("signup-id").value = document.querySelector(".returned-username").innerText
                    window.close()
                }
            })
        } catch (e) {
            if (e instanceof TypeError) {
                console.log("아직 아이디를 입력하지 않았습니다.")
            }
        }
    }

    function closeChildWindow() {
        try {
            const closeWindowBtn = document.querySelector(".close-window-btn")

            closeWindowBtn.addEventListener("click", () => {
                window.close()
            })
        } catch (e) { }
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


