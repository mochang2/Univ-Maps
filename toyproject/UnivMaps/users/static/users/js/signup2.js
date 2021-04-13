(function (window, document, undefined) {
    window.onload = function () {
        goback()
        active()
        checkPassword()
    };

    function goback() {
        const goBackBtn = document.querySelector(".goback-btn")
        goBackBtn.addEventListener("click", (Event) => {
            location.href = "/hanyang_map"
        })
    }

    function active() {
        const stepSingLi = document.querySelectorAll("li")[1]
        stepSingLi.classList.add("active")
    }


    function checkPassword() {
        const rule = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/
        let inputtxt = document.getElementById("signup-password")
        const warningPasswordValidation = document.querySelector(".warning-password-validation")

        inputtxt.addEventListener("focusout", (Event) => {
            if (inputtxt.value.match(rule)) {
                warningPasswordValidation.style.display = "none"
            }
            else {
                warningPasswordValidation.style.display = "block"
                inputtxt.focus()
            }
        })

    }

})(window, document, undefined);


