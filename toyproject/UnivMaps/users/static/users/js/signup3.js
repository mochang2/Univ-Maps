(function (window, document, undefined) {
    window.onload = function () {
        active()
        adjustStatusBarMargin()
    };

    function active() {
        const stepSignLi = document.querySelectorAll("li")[2]
        stepSignLi.classList.add("active")
    }

    function adjustStatusBarMargin() {
        const statusBar = document.querySelector("ul")
        statusBar.style.marginBottom = "0"
    }

})(window, document, undefined);


