(function (window, document, undefined) {
    window.onload = function () {
        active()
        adjustStatusBarMargin()
    };

    function active() { //회원가입 단계 표시
        const stepSignLi = document.querySelectorAll("li")[2]
        stepSignLi.classList.add("active")
    }

    function adjustStatusBarMargin() {  //화면 여백 조정
        const statusBar = document.querySelector("ul")
        statusBar.style.marginBottom = "0"
    }

})(window, document, undefined);


