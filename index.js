document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("nav ul");

    // Toggle menu on mobile
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        menuToggle.classList.toggle("active");
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

    // Animasi untuk Visi & Misi
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll(".fade-in, .fade-in-left, .fade-in-right").forEach(el => observer.observe(el));

    // Live clock function
    function updateClock() {
        const now = new Date();
        document.getElementById("live-clock").textContent = now.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Fungsi untuk menampilkan teks dengan efek typing
    function typeText(elementId, textArray, speed = 50) {
        let i = 0;
        let currentLine = 0;
        const element = document.getElementById(elementId);

        function type() {
            if (currentLine < textArray.length) {
                if (i < textArray[currentLine].length) {
                    // Tambahkan karakter satu per satu
                    if (i === 0) {
                        element.innerHTML += `<li>`; // Mulai baris baru dengan <li>
                    }
                    element.lastChild.innerHTML += textArray[currentLine].charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    // Selesai mengetik satu baris, lanjut ke baris berikutnya
                    element.lastChild.innerHTML += `</li>`; // Tutup <li>
                    currentLine++;
                    i = 0;
                    if (currentLine < textArray.length) {
                        setTimeout(type, speed); // Lanjut ke baris berikutnya
                    }
                }
            }
        }
        type();
    }

    // Array berisi poin-poin Misi
    const misiPoints = [
        "Meningkatkan keimanan dan ketakwaan.",
        "Membentuk karakter Islami.",
        "Meningkatkan Kepedulian Sosial.",
        "Mengoptimalkan peran pemuda dalam dakwah.",
        "Membangun kreativitas dan kemandirian."
    ];

    // Jalankan efek typing setelah 1 detik
    setTimeout(() => {
        typeText("misi-text", misiPoints, 50);
    }, 1000);
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
    let speed = 25; // Kecepatan animasi dalam detik

    function updateMarqueeSpeed() {
        const width = marqueeText.clientWidth;
        marqueeText.style.animationDuration = `${width / speed}s`;
    }

    window.addEventListener("resize", updateMarqueeSpeed);
    updateMarqueeSpeed();
});

/////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
    // Animasi muncul untuk Visi & Misi
    setTimeout(() => {
        document.getElementById("visi").classList.add("show");
    }, 500);

    setTimeout(() => {
        document.getElementById("misi").classList.add("show");
        typeText("misi-text", "Menghadirkan produk berkualitas, inovatif, dan halal.");
    }, 1000);

    // Live clock function
    function updateClock() {
        const now = new Date();
        const formattedTime = now.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
        document.getElementById("live-clock").textContent = formattedTime;
    }
    setInterval(updateClock, 1000);
    updateClock();
});

// Animasi typing effect untuk Misi
function typeText(elementId, text, speed = 50) {
    let i = 0;
    function type() {
        if (i < text.length) {
            document.getElementById(elementId).innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}
