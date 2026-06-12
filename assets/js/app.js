document.addEventListener('DOMContentLoaded', function () {
    initCountriesSlider();
    initScrollToTopButton();
    initThemeToggle();
    initMobileMenu();
    initParallax();
});

// Scroll parallax for hero elements
function initParallax() {
    const items = document.querySelectorAll('[data-parallax]');
    if (!items.length) return;

    let ticking = false;

    function update() {
        const scrollY = window.scrollY;

        items.forEach(function (el) {
            const speed = parseFloat(el.dataset.parallax) || 0;
            el.style.setProperty('--parallax-y', (scrollY * speed) + 'px');
        });

        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    }, { passive: true });

    update();
}

function initMobileMenu() {
    const burger = document.querySelector('#hamburger-btn');
    const overlay = document.querySelector('#menu-overlay');
    const nav = document.querySelector('#site-nav');
    if (!burger || !nav) return;

    function setOpen(open) {
        document.body.classList.toggle('menu-open', open);
        burger.setAttribute('aria-expanded', String(open));
    }

    burger.addEventListener('click', function () {
        setOpen(!document.body.classList.contains('menu-open'));
    });

    if (overlay) {
        overlay.addEventListener('click', function () { setOpen(false); });
    }

    nav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () { setOpen(false); });
    });

    // Reset state when resizing up to desktop
    window.addEventListener('resize', function () {
        if (window.innerWidth > 991) setOpen(false);
    });
}

function initThemeToggle() {
    const toggle = document.querySelector('#theme-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', function () {
        const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = next;
        localStorage.setItem('theme', next);
    });
}

function initCountriesSlider() {
    const container = document.querySelector('.countries .swiper');
    if (!container) return;

    const counterStart = document.querySelector('.countries__counter--start');
    const counterTotal = document.querySelector('.countries__counter--total');

    // Left counter shows last visible slide
    function updateCounter(swiper) {
        const total = swiper.slides.length;
        const perView = Math.round(swiper.slidesPerViewDynamic());
        const lastVisible = Math.min(swiper.activeIndex + perView, total);

        if (counterStart) counterStart.textContent = lastVisible;
        if (counterTotal) counterTotal.textContent = total;
    }

    new Swiper(container, {
        slidesPerView: 1,
        spaceBetween: 16,
        breakpoints: {
            768:  { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
        },
        pagination: {
            el: '.countries .swiper-pagination',
            type: 'progressbar',
        },
        navigation: {
            nextEl: '.countries .swiper-button-next',
            prevEl: '.countries .swiper-button-prev',
        },
        on: {
            init: updateCounter,
            slideChange: updateCounter,
            breakpoint: updateCounter,
            resize: updateCounter,
        },
    });
}

function initScrollToTopButton(selector = ".button-up") {
    const btn = document.querySelector(selector);
    if (!btn) return;

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}
