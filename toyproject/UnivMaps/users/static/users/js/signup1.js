(function (window, document, undefined) {
    window.onload = function () {
        termsListener()
        agree()
        goback()
        active()
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

    function agree() {
        const okBtn = document.querySelector(".ok-btn")
        const checkBox = document.querySelector(".check-box")
        okBtn.addEventListener("click", (Event) => {
            if (checkBox.checked == false) {
                alert("약관에 동의해주세요.")
            }
        })
    }

    function goback() {
        const goBackBtn = document.querySelector(".goback-btn")
        goBackBtn.addEventListener("click", (Event) => {
            location.href = "/hanyang_map"
        })
    }

    function active() {
        const stepSignLi = document.querySelectorAll("li")[0]
        stepSignLi.classList.add("active")
    }

})(window, document, undefined);


