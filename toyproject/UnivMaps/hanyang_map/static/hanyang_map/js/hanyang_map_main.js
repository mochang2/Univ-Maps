(function (window, document, undefined) {
    window.onload = function () {
        //우클릭 방지 + 더블클릭 방지 + 드래그 방지
        window.document.oncontextmenu = new Function("return false")
        window.document.onselectstart = new Function("return false")
        window.document.ondragstart = new Function("return false")

        preventCtrlU()
    }

    function preventCtrlU() {
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

})(window, document, undefined)