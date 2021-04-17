(function (window, document, undefined) {
    window.onload = function () {
        active()
        adjustMargin()
    };

    function active() {
        const stepSignLi = document.querySelectorAll("li")[2]
        stepSignLi.classList.add("active")
    }

    function adjustMargin() {
        const statusBar = document.querySelector("ul")
        statusBar.style.marginBottom = "0"
    }

})(window, document, undefined);


