
// ========================================
// DAFTAR ALASAN PILMUD
// ========================================

const reasons = [
    "Hidup udah ribet, jangan hal sesimpel ini ikut dipikirin lama-lama.",
    "Kayaknya yang ini paling cocok. Yang lain jadi figuran dulu aja.",
    "Nggak tahu kenapa, tapi feeling gue yang ini bakal jadi pilihan terbaik.",
    "Yang lain juga oke, tapi kali ini coba yang ini dulu.",
    "Pilihan lain kita istirahatkan dulu. Siapa tahu lain kali kepilih.",
    "Bukan berarti yang lain jelek, cuma kali ini belum rezekinya aja.",
    "Coba yang ini deh. Siapa tahu malah jadi favorit.",
    "Nggak usah cari alasan panjang-panjang. Udah, pilih aja yang ini.",
    "Mantan aja bisa dilupain, masa pilihan yang lain masih susah dilepas?",
    "Keputusan sudah dibuat. Kalau ternyata salah, ya namanya juga hidup.",
    "Dari tadi nunggu dipilih, masa mau dicuekin terus?",
    "Pilih yang ini aja. Sekali-sekali jangan kebanyakan mikir."
];


// ========================================
// DAFTAR PILIHAN BERDASARKAN KATEGORI
// ========================================

const categoryOptions = {
    makanan: [],
    film: [],
    nongkrong: [],
    liburan: [],
    random: []
};


// ========================================
// VARIABEL PILIHAN TERAKHIR
// ========================================

let lastSelectedOption = "";


// ========================================
// FUNGSI MENGAMANKAN TEKS
// ========================================

function escapeHTML(text) {
    return text.replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}


// ========================================
// FUNGSI MEMILIH KATEGORI
// ========================================

function selectCategory(category) {
    const options = document.getElementById("options");
    const result = document.getElementById("result");
    const manualSection = document.getElementById("manualInputSection");

    if (!Object.prototype.hasOwnProperty.call(categoryOptions, category)) {
        return;
    }

    // Bersihkan hasil sebelumnya
    result.innerHTML = "";

    // Atur input berdasarkan kategori
    if (category === "random") {
        options.value = "";
        options.placeholder = "Contoh:\nMau nonton film\nMau main game\nMau jalan-jalan";
    } else {
        options.value = categoryOptions[category].join("\n");
        options.placeholder = "Pilihan 1\nPilihan 2\nPilihan 3";
    }

    // Tampilkan bagian input
    manualSection.style.display = "flex";

    manualSection.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


// ========================================
// FUNGSI MENGACAK PILIHAN
// ========================================

function makeDecision() {
    const input = document.getElementById("options").value;

    const options = input
        .split("\n")
        .map(option => option.trim())
        .filter(option => option !== "");

    const result = document.getElementById("result");

    // Validasi pilihan
    if (options.length < 2) {
        result.innerHTML = "Masukkan minimal 2 pilihan dulu!";
        return;
    }

    // Acak pilihan
    const randomIndex = Math.floor(Math.random() * options.length);
    lastSelectedOption = options[randomIndex];

    // Acak alasan
    const randomReason = Math.floor(Math.random() * reasons.length);
    const selectedReason = reasons[randomReason];

    // Tampilkan hasil
    result.innerHTML = `
        <div class="result-card">

            <p class="result-label">PILMUD MEMILIH:</p>

            <h2>${escapeHTML(lastSelectedOption)}</h2>

            <div class="reason-box">
                <strong>Kenapa pilihan ini?</strong>
                <p>${escapeHTML(selectedReason)}</p>
            </div>

            <div class="result-actions">

                <button class="accept-button" onclick="confirmDecision()">
                    OKE, GAS! 🔥
                </button>

                <button class="retry-button" onclick="makeDecision()">
                    COBA LAGI ↻
                </button>

            </div>

        </div>
    `;
}


// ========================================
// FUNGSI KONFIRMASI PILIHAN
// ========================================

function confirmDecision() {
    const result = document.getElementById("result");

    result.innerHTML = `
        <div class="result-card">

            <h2>GASSS! 🎉</h2>

            <p>
                Keputusan sudah dibuat:
                <strong>${escapeHTML(lastSelectedOption)}</strong>
            </p>

            <p>
                Udah dipilih, sekarang tinggal dijalanin.
                Apa pun yang terjadi, tetap bahagia!
            </p>

        </div>
    `;
}


// ========================================
// NAVIGASI KE BAGIAN PILIHAN
// ========================================

function goToDecision() {
    const categorySection = document.getElementById("categorySection");

    // Tampilkan kategori
    categorySection.style.display = "block";

    categorySection.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


// ========================================
// KEMBALI KE HOME
// ========================================

function goToHome() {
    const categorySection = document.getElementById("categorySection");
    const manualSection = document.getElementById("manualInputSection");
    const result = document.getElementById("result");
    const options = document.getElementById("options");

    // Sembunyikan bagian pilihan
    categorySection.style.display = "none";
    manualSection.style.display = "none";

    // Bersihkan data sebelumnya
    result.innerHTML = "";
    options.value = "";

    // Kembali ke Home
    document.getElementById("home").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}
