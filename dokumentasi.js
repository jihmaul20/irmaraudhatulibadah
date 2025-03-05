function openModal(src, caption) {
    document.getElementById("modal").style.display = "block";
    document.getElementById("modal-img").src = src;
    document.getElementById("caption").innerHTML = caption;
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

document.getElementById("search-dokumentasi").addEventListener("keyup", function() {
    let searchQuery = this.value.toLowerCase();
    document.querySelectorAll(".gallery-item").forEach(function(item) {
        let caption = item.querySelector("img").alt.toLowerCase();
        item.style.display = caption.includes(searchQuery) ? "block" : "none";
    });
});

document.getElementById("filter-kategori").addEventListener("change", function() {
    let selectedCategory = this.value;
    document.querySelectorAll(".gallery-item").forEach(function(item) {
        if (selectedCategory === "all" || item.getAttribute("data-category") === selectedCategory) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
});