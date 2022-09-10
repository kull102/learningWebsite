window.addEventListener('load', () => {

    // page loader

    document.querySelector('.js-page-loader').classList.add('fade-out')

    setTimeout(() => {
        document.querySelector('.js-page-loader').style.display = 'none'
    }, 600)

})



// testimonials slider

function testimonials() {
    const carouselOne = document.querySelector('#carouselOne')
    if (carouselOne) {
        carouselOne.addEventListener('slide.bs.carousel', function () {
            const activeItem = this.querySelector('.active')
            document.querySelector('.js-testimonial-img').src = activeItem.getAttribute('data-js-testimonial-img')
        })
    }
}
testimonials()

// course preview video
function coursePreviewVideo() {
    const coursePreviewVideo = document.querySelector('.js-course-preview-modal')
    if (coursePreviewVideo) {
        coursePreviewVideo.addEventListener('show.bs.modal', function () {
            this.querySelector('.js-course-preview-video').play()
            this.querySelector('.js-course-preview-video').currentTime = 0;

        })

        coursePreviewVideo.addEventListener('hide.bs.modal', function () {
            this.querySelector('.js-course-preview-video').pause()

        })
    }
}

coursePreviewVideo()


// style switcher

function styleSwitcherToggle() {
    const styleSwitcher = document.querySelector('.js-style-switcher')
    const styleSwitcherToggler = document.querySelector('.js-style-switcher-toggler')

    styleSwitcherToggler.addEventListener('click', function () {
        styleSwitcher.classList.toggle('open')
        this.querySelector('i').classList.toggle('fa-times')
    })
}

styleSwitcherToggle()

// theme colors

function themeColors() {
    const colorStyle = document.querySelector('.js-color-style')
    const themeColorsContainer = document.querySelector('.js-theme-colors')

    themeColorsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('js-theme-color-item')) {
            localStorage.setItem('color', e.target.getAttribute('data-js-theme-color'))
            setColor()
        }
    })

    function setColor() {
        let path = colorStyle.getAttribute('href').split('/')
        const activeItem = document.querySelector('.js-theme-color-item.active')
        path.splice(path.length - 1, 1)
        colorStyle.setAttribute('href', path.join('/') + '/' + localStorage.getItem('color') + '.css')

        if (activeItem) {
            activeItem.classList.remove('active')
        }

        document.querySelector('[data-js-theme-color=' + localStorage.getItem('color') + ']').classList.add('active')

    }
    if (localStorage.getItem('color')) {
        setColor()
    } else {
        const defaultColor = colorStyle.getAttribute('href').split('/').pop().split('.').shift()
        document.querySelector('[data-js-theme-color=' + defaultColor + ']').classList.add('active')
    }

}


themeColors()

// theme light - dark mode

function themeLightDark() {
    const darkModeCheckBox = document.querySelector('.js-dark-mode')
    darkModeCheckBox.addEventListener('click', function () {
        if (this.checked) {
            localStorage.setItem('theme-dark', true)
        } else {
            localStorage.setItem('theme-dark', false)
        }
        themeMode()
    })

    function themeMode() {
        if (localStorage.getItem('theme-dark') === "true") {
            document.querySelector('body').classList.add('t-dark')
        } else {
            document.querySelector('body').classList.remove('t-dark')
        }
    }
    if (localStorage.getItem('theme-dark') !== null) {
        themeMode()
    }

    if (document.querySelector('body').classList.contains('t-dark')) {
        darkModeCheckBox.checked = true
    }
}

themeLightDark()


// theme Glass Effect

function themeGlassEffect() {
    const glassEffectCheckBox = document.querySelector('.js-glass-effect')
    const glassStyle = document.querySelector('.js-glass-style')

    glassEffectCheckBox.addEventListener('click', function () {
        if (this.checked) {
            localStorage.setItem('glass-effect', true)
        } else {
            localStorage.setItem('glass-effect', false)
        }

        glassEffect()
    })

    function glassEffect() {
        if (localStorage.getItem('glass-effect') === "true") {
            glassStyle.removeAttribute('disabled')
        } else {
            glassStyle.disabled = true
        }
    }

    if (localStorage.getItem('glass-effect') !== null) {
        glassEffect()
    }
    if (!(glassStyle.hasAttribute('disabled'))) {
        glassEffectCheckBox.checked = true
    }
}

themeGlassEffect()


// responsive function


function headerMenu() {
    const menu = document.querySelector('.js-header-menu')
    const backdrop = document.querySelector('.js-header-backdrop')
    const menuCollapseBreakPoint = 991

    function toggleMenu() {
        menu.classList.toggle('open')
        backdrop.classList.toggle('active')
        document.body.classList.toggle('overflow-hidden')
    }

    backdrop.addEventListener('click', toggleMenu)

    document.querySelectorAll('.js-header-menu-toggler').forEach(item => {
        item.addEventListener('click', toggleMenu)
    })

    function collapse() {
        menu.querySelector('.active .js-sub-menu').removeAttribute('style')
        menu.querySelector('.active ').classList.remove('active')

    }

    menu.addEventListener('click', event => {
        if (event.target.classList.contains('js-toggle-sub-menu') &&
            window.innerWidth <= menuCollapseBreakPoint) {

            event.preventDefault()

            if (event.target.parentElement.classList.contains('active')) {
                collapse()
                return
            }
            if (menu.querySelector('.active')) {
                collapse()
            }


            event.target.parentElement.classList.add('active')
            console.log(event.target.nextElementSibling)
            event.target.nextElementSibling.style.maxHeight =
                event.target.nextElementSibling.scrollHeight + 'px'
        }
    })


    window.addEventListener('resize', function () {
        if (this.innerWidth > menuCollapseBreakPoint && menu.classList.contains('open')) {
            toggleMenu()
        }
        if (this.innerWidth > menuCollapseBreakPoint && menu.querySelector('.active')) {
            collapse()
        }
    })

}

headerMenu()




// responsive function

// 
