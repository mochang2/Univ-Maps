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
        window.addEventListener("keydown", (Event) => {
            let keycode
            if (Event.key !== undefined) {
                keycode = Event.key
            }
            else if (Event.keyIdentifier !== undefined) {
                keycode = Event.keyIdentifier
            }
            else if (Event.keyCode !== undefined) {
                // keyCode는 곧 사라짐. 이렇게 하면 모두 대문자로 변환됨.
                keycode = String.fromCharCode(Event.keyCode)
            }

            // ctrl + s, ctrl + u 방지
            if (keycode == "Control" || keycode == "s" || keycode == "u") {
                Event.preventDefault()
                Event.returnValue = false
            }
        })
    }

})(window, document, undefined);


