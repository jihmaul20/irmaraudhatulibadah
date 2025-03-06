document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("filter-kategori").addEventListener("change", function () {
        let selectedCategory = this.value;
        let visibleItems = 0;

        document.querySelectorAll(".gallery-item").forEach(function (item) {
            if (selectedCategory === "all" || item.getAttribute("data-category") === selectedCategory) {
                item.style.display = "block"; // Tampilkan item
                visibleItems++;
            } else {
                item.style.display = "none"; // Sembunyikan item
            }
        });

        // Bagian ini tidak perlu diubah
        let gallery = document.querySelector(".gallery");
        if (visibleItems === 1) {
            gallery.style.display = "flex";
            gallery.style.justifyContent = "center";
            gallery.style.flexWrap = "wrap";
        } else {
            gallery.style.display = "grid";
            gallery.style.gridTemplateColumns = "repeat(auto-fit, minmax(250px, 1fr))";
            gallery.style.justifyContent = "center";
            gallery.style.gap = "10px";
        }
    });
});

function openModal(src, caption) {
    document.getElementById("modal").style.display = "block";
    document.getElementById("modal-img").src = src;
    document.getElementById("caption").innerHTML = caption;

    // Tambahkan tombol download dalam modal
    let downloadBtn = document.getElementById("download-btn");
    if (!downloadBtn) {
        downloadBtn = document.createElement("a");
        downloadBtn.id = "download-btn";
        downloadBtn.innerText = "Download";
        downloadBtn.classList.add("btn-download");
        downloadBtn.style.position = "absolute";
        downloadBtn.style.bottom = "20px";
        downloadBtn.style.left = "50%";
        downloadBtn.style.transform = "translateX(-50%)";
        document.getElementById("modal").appendChild(downloadBtn);
    }
    downloadBtn.href = src;
    downloadBtn.download = src.split('/').pop(); // Nama file sesuai nama asli
}
