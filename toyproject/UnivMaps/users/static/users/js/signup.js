(function (window, document, undefined) {
    window.onload = function () {
        termsListener()
        goback()
    };

    function termsListener() {
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

    function goback() {
        const goBackBtn = document.querySelector(".goback-btn")
        console.log(goBackBtn)
        goBackBtn.addEventListener("click", (Event) => {
            history.go(-1)
        })
    }

})(window, document, undefined);


