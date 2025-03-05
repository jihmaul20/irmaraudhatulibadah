document.addEventListener("DOMContentLoaded", async () => {
    // Elemen-elemen yang akan digunakan
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("nav ul");
    const misiText = document.getElementById("misi-text");
    const datePicker = document.getElementById("date-picker");
    const calendarBody = document.getElementById("calendar-body");
    const gregorianMonthEl = document.getElementById("gregorian-month");
    const hijriMonthEl = document.getElementById("hijri-month");
    const rowLimitSelect = document.getElementById("ramadhan-limit");
    const agendaBody = document.getElementById("agenda-body");
    const searchInput = document.getElementById("search-input");

    // Data agenda rutin
    const agendaData = [
        { tanggal: "5 Maret 2025", kegiatan: "Kajian Rutin", waktu: "19:30", tempat: "Masjid Raudhatul Ibadah", keterangan: "Kajian Ust. Ahmad" },
        { tanggal: "8 Maret 2025", kegiatan: "Shalat Jumat & Tausiyah", waktu: "12:00", tempat: "Masjid Raudhatul Ibadah", keterangan: "-" },
        { tanggal: "10 Maret 2025", kegiatan: "Pelatihan Keislaman", waktu: "09:00", tempat: "Aula Masjid", keterangan: "Peserta: Remaja Masjid" },
    ];

    // Nama-nama bulan dan hari dalam bahasa Indonesia
    const bulanMasehi = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const bulanHijriah = {
        "Muharram": "Muharram", "Safar": "Safar", "Rabi'al-Awwal": "Rabiul Awal",
        "Rabi'al-Akhir": "Rabiul Akhir", "Jumadal-Ula": "Jumadal Ula",
        "Jumadal-Akhirah": "Jumadal Akhir", "Rajab": "Rajab",
        "Sha'ban": "Sya'ban", "Ramadan": "Ramadhan", "Shawwal": "Syawal",
        "Dhul-Qadah": "Dzulqa’dah", "Dhul-Hijjah": "Dzulhijjah"
    };

    const hariIndonesia = {
        "Saturday": "Sabtu", "Sunday": "Minggu", "Monday": "Senin",
        "Tuesday": "Selasa", "Wednesday": "Rabu",
        "Thursday": "Kamis", "Friday": "Jumat"
    };

    // Fungsi untuk toggle menu di mobile
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        menuToggle.classList.toggle("active");
    });

    // Fungsi untuk smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Fungsi untuk menampilkan teks dengan efek typing
    function typeText(element, textArray, speed = 50) {
        let i = 0;
        let currentLine = 0;

        function type() {
            if (currentLine < textArray.length) {
                if (i < textArray[currentLine].length) {
                    if (i === 0) {
                        element.innerHTML += `<li>`;
                    }
                    element.lastChild.innerHTML += textArray[currentLine].charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    element.lastChild.innerHTML += `</li>`;
                    currentLine++;
                    i = 0;
                    if (currentLine < textArray.length) {
                        setTimeout(type, speed);
                    }
                }
            }
        }
        type();
    }

    // Efek typing untuk misi
    const misiPoints = [
        "Meningkatkan kegiatan Islam.",
        "Mempererat persaudaraan Islam.",
        "Meningkatkan kemandirian ekonomi melalui Bisnis Islam.",
        "Menegakkan dan mempelajari Hukum Islam.",
        "Menjadi pelopor kebaikan di masyarakat."
    ];
    setTimeout(() => {
        typeText(misiText, misiPoints, 50);
    }, 1000);

    // Fungsi untuk update jam
    function updateClock() {
        const now = new Date();
        const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        const dayName = days[now.getDay()];
        const date = now.getDate();
        const monthName = months[now.getMonth()];
        const year = now.getFullYear();
        const time = now.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
        document.getElementById("live-clock").innerHTML = `
            <div class="date">${dayName}, ${date} ${monthName} ${year}</div>
            <div class="time">${time}</div>
        `;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Fungsi untuk menampilkan data agenda
    function displayAgenda(data) {
        agendaBody.innerHTML = "";
        data.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.tanggal}</td>
                <td>${item.kegiatan}</td>
                <td>${item.waktu}</td>
                <td>${item.tempat}</td>
                <td>${item.keterangan}</td>
            `;
            agendaBody.appendChild(row);
        });
    }
    displayAgenda(agendaData);

    // Fungsi pencarian
    searchInput.addEventListener("input", () => {
        const keyword = searchInput.value.toLowerCase().trim();
        const searchWords = keyword.split(" ");
        const filteredData = agendaData.filter(item => {
            const itemText = `${item.tanggal} ${item.kegiatan} ${item.waktu} ${item.tempat} ${item.keterangan}`.toLowerCase();
            return searchWords.every(word => itemText.includes(word));
        });
        displayAgenda(filteredData);
    });

    // Fungsi untuk mengupdate kalender
    async function updateCalendar() {
        const selectedDate = datePicker.value || new Date().toISOString().slice(0, 7);
        const [year, month] = selectedDate.split("-");
        try {
            const response = await fetch(`https://api.aladhan.com/v1/gToHCalendar/${month}/${year}`);
            const data = await response.json();
            if (!data.data || data.data.length === 0) {
                console.error("Data tidak ditemukan!");
                return;
            }

            // Ambil data pertama untuk mendapatkan nama dan tahun Hijriah
            const firstDayHijri = data.data[0].hijri;
            const hijriMonthName = firstDayHijri.month.ar; // Gunakan nama bulan Hijriah dalam bahasa Arab
            const hijriYear = firstDayHijri.year;

            // Update judul bulan
            gregorianMonthEl.textContent = `Kalender Masehi: ${bulanMasehi[month - 1]} ${year}`;
            hijriMonthEl.textContent = `Kalender Hijriah: ${hijriMonthName} ${hijriYear} H`;

            // Kosongkan tabel sebelum mengupdate
            calendarBody.innerHTML = "";

            // Loop untuk menampilkan data
            data.data.forEach(day => {
                const tanggalMasehi = `${parseInt(day.gregorian.day)} ${bulanMasehi[parseInt(day.gregorian.month.number) - 1]} ${day.gregorian.year}`;
                
                // Gunakan day.hijri.month.ar untuk nama bulan Hijriah
                const tanggalHijriah = `${parseInt(day.hijri.day)} ${day.hijri.month.ar} ${day.hijri.year} H`;

                const hari = hariIndonesia[day.gregorian.weekday.en] || "Tidak diketahui";

                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${tanggalMasehi}</td>
                    <td>${tanggalHijriah}</td>
                    <td>${hari}</td>
                `;
                calendarBody.appendChild(row);
            });

            applyPagination();

        } catch (error) {
            console.error("Gagal mengambil data kalender:", error);
        }
    }

    // Fungsi pagination
    function applyPagination() {
        const rows = document.querySelectorAll("#calendar-body tr");
        const limit = rowLimitSelect.value === "all" ? rows.length : parseInt(rowLimitSelect.value);
        rows.forEach((row, index) => {
            row.style.display = index < limit ? "" : "none";
        });
    }

    // Event listener untuk update kalender dan pagination
    datePicker.addEventListener("input", updateCalendar);
    rowLimitSelect.addEventListener("change", applyPagination);

    // Jalankan update awal
    await updateCalendar();
    applyPagination();

    // Animasi untuk elemen-elemen dengan class tertentu
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.3 });
    document.querySelectorAll(".fade-in, .fade-in-left, .fade-in-right").forEach(el => observer.observe(el));

    // Animasi untuk header saat scroll
    const header = document.querySelector("header");
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // Animasi untuk marquee
    const marqueeText = document.querySelector(".marquee span");
    let speed = 25;
    function updateMarqueeSpeed() {
        const width = marqueeText.clientWidth;
        marqueeText.style.animationDuration = `${width / speed}s`;
    }
    window.addEventListener("resize", updateMarqueeSpeed);
    updateMarqueeSpeed();

    // Animasi muncul untuk Visi & Misi
    setTimeout(() => {
        document.getElementById("visi").classList.add("show");
    }, 500);
    setTimeout(() => {
        document.getElementById("misi").classList.add("show");
    }, 1000);

    // Animasi untuk Program Kerja dan Struktur Organisasi
    document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

    // Struktur Organisasi (Perbaikan)
    document.querySelectorAll('.node').forEach(node => {
        node.addEventListener('click', () => {
            const targetId = node.dataset.target;
            const content = document.getElementById(targetId);

            // Tutup semua accordion content
            document.querySelectorAll('.accordion-content').forEach(item => {
                if (item !== content) {
                    item.classList.remove('show');
                }
            });

            // Toggle content yang dipilih (Perbaikan)
            content.classList.toggle('show'); 
        });
    });

    // Animasi untuk Agenda Rutinan
    const rutinanSection = document.getElementById("rutinan");
    observer.observe(rutinanSection);
    
});

// Inisialisasi Lightbox
lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true
});

// Animasi untuk Dokumentasi (ScrollReveal)
ScrollReveal().reveal('#dokumentasi .gallery-item', {
    delay: 300,
    distance: '50px',
    origin: 'bottom',
    interval: 200
});

// Dokumentasi
document.getElementById("filter-kategori").addEventListener("change", function() {
    let selectedOptionId = this.value; // Ambil ID opsi yang dipilih
    let imageUrl = "";

    // Gunakan if/else atau switch case untuk menentukan URL gambar berdasarkan ID
    if (selectedOptionId === "kegiatan") {
        imageUrl = "gbr/full/full1.jpg";
    } else if (selectedOptionId === "ramadhan") {
        imageUrl = "gbr/full/full2.jpg";
    } else if (selectedOptionId === "sosial") {
        imageUrl = "gbr/full/full3.jpg";
    } else {
        imageUrl = "gbr/full/full1.jpg"; // Gambar default jika tidak ada yang dipilih
    }

    document.getElementById("gambar-dokumentasi").src = imageUrl;
    document.getElementById("gambar-dokumentasi").alt = selectedOptionId;
});

// Animasi untuk hero content (ScrollReveal)
ScrollReveal().reveal('.hero-content', {
    delay: 300,
    distance: '50px',
    origin: 'bottom'
});

// Jadwal Imsakiyah & Buka Puasa
function toggleAccordion(id) {
    let content = document.getElementById(id);
    let arrow = content.previousElementSibling.querySelector(".arrow");
    
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
        content.style.padding = "0 20px";
        arrow.style.transform = "rotate(0deg)";
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.padding = "15px 20px";
        arrow.style.transform = "rotate(180deg)";
        content.querySelector(".fade-in").classList.add("show");
    }
}

function downloadImage(url, filename) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

