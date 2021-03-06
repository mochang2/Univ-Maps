(function (window, document, undefined) {
    window.onload = function () {
        navBarMenuShowAndHide()
        navBarMenuHideWhenWindowBecomesBig()
        dropDownMenuShow()

        //우클릭 방지 + 더블클릭 방지 + 드래그 방지
        window.document.oncontextmenu = new Function("return false")
        window.document.onselectstart = new Function("return false")
        window.document.ondragstart = new Function("return false")

        preventCtrlSU()
    }

    function navBarMenuShowAndHide() {
        try {
            const abbreviatedMenu = document.querySelector(".abbreviated-menu")
            const navBarWrapper = document.querySelector(".navbar-wrapper")
            const aboveMenuWrapper = document.querySelector(".above-menu-wrapper")
            const navbarMenus = document.querySelectorAll(".navbar-menus")
            let aboveMenuWrapperHeight

            abbreviatedMenu.addEventListener("click", (Event) => {
                if (navBarWrapper.style.display == "none" || navBarWrapper.style.display == "") {
                    navBarWrapper.style.display = "block"
                    aboveMenuWrapperHeight = 28 + 25 * navbarMenus.length + 1 // +1 is for spare
                    aboveMenuWrapper.style.height = aboveMenuWrapperHeight.toString() + "px"
                    // 여기 부분 손 봐야됨 + block display될 때 디자인(색깔 등) 더 손 보기
                }
                else if (navBarWrapper.style.display == "block") {
                    navBarWrapper.style.display = "none"
                    aboveMenuWrapper.style.height = "28px"
                }
            })
        } catch (err) { console.log("Window size is still big to show abbreviated menu.") }
    }

    function navBarMenuHideWhenWindowBecomesBig() {
        window.addEventListener("resize", (Event) => {
            try {
                const aboveMenuWrapper = document.querySelector(".above-menu-wrapper")
                const navBarWrapper = document.querySelector(".navbar-wrapper")

                if (aboveMenuWrapper.offsetWidth > 1280) {
                    navBarWrapper.style.display = "none"
                    aboveMenuWrapper.style.height = "28px"
                }
            } catch (err) {
                console.log("Window size is samll to show navbar")
            }
        })
    }

    function dropDownMenuShow() {
        try {
            const myPageWrapper = document.querySelector(".mypage-wrapper")
            const ulDropdown = document.querySelector(".dropdown-wrapper")

            myPageWrapper.addEventListener("mouseover", (Event) => {
                ulDropdown.style.display = "block"
            })
            myPageWrapper.addEventListener("mouseout", (Event) => {
                ulDropdown.style.display = "none"
            })
        } catch (err) {
            console.log("have not logged in yet.")
        }

    }

    function preventCtrlSU() {
        let keysPressed = new Map()

        document.addEventListener("keydown", (Event) => {
            let keycode
            if (Event.key !== undefined) {
                keycode = Event.key
            }
            else if (Event.keyIdentifier !== undefined) {
                keycode = Event.keyIdentifier
            }
            else if (Event.keyCode !== undefined) {
                // keyCode는 곧 사라짐.
                keycode = String.fromCharCode(Event.keyCode).toLowerCase()
            }

            // ctrl + s, ctrl + u 방지
            keysPressed.set(keycode, true)

            if ((keysPressed.get("Control") && keycode == "s") ||
                (keysPressed.get("Control") && keycode == "u")) {
                Event.preventDefault()
                Event.returnValue = false
            }
        })

        document.addEventListener("keyup", (Event) => {
            let keycode
            if (Event.key !== undefined) {
                keycode = Event.key
            }
            else if (Event.keyIdentifier !== undefined) {
                keycode = Event.keyIdentifier
            }
            else if (Event.keyCode !== undefined) {
                // keyCode는 곧 사라짐.
                keycode = String.fromCharCode(Event.keyCode).toLowerCase()
            }

            keysPressed.delete(keycode)
        })
    }

})(window, document, undefined)
