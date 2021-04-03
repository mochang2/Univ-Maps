(function (window, document, undefined) {
    window.onload = function () {
        termsListener()
    };

    function termsListener() {
        const hideShowTerms = document.querySelector(".hide-and-show-terms")

        hideShowTerms.addEventListener("click", (Event) => {
            console.log(1)
            console.log(Event.type)
        })
    }

})(window, document, undefined);


