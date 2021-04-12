(function (window, document, undefined) {
    window.onload = function () {
        //goback()
        active()
    };

    // function goback() {
    //     const goBackBtn = document.querySelector(".goback-btn")
    //     goBackBtn.addEventListener("click", (Event) => {
    //         location.href = "/hanyang_map"
    //     })
    // }

    function active() {
        const stepSingLi = document.querySelectorAll("li")[1]
        stepSingLi.classList.add("active")
    }

})(window, document, undefined);


