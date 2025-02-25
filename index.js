document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("nav ul");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Toggle menu on mobile
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    // Toggle sub-menu on mobile
    const mainMenuItems = document.querySelectorAll('.main-menu > li');
    mainMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                item.classList.toggle('active');
            }
        });
    });
});

///////////////////////////////////////////////////

window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

//////////////////////////////////////////////////////////////////

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
    const marqueeText = document.querySelector(".marquee span");
    let speed = 15; // Kecepatan animasi dalam detik

    function updateMarqueeSpeed() {
        const width = marqueeText.clientWidth;
        marqueeText.style.animationDuration = `${width / speed}s`;
    }

    window.addEventListener("resize", updateMarqueeSpeed);
    updateMarqueeSpeed();
});