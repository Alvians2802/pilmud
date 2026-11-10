
// ========================================
// DAFTAR ALASAN PILMUD
// ========================================

const reasons = [
    "Karena hidup sudah cukup rumit. Jangan bikin urusan ini ikut rumit.",
    "Pilihan ini punya aura pemeran utama. Yang lain cuma figuran.",
    "Entah kenapa, semesta lagi mendukung pilihan ini. Jangan ditanya, pokoknya gas!",
    "Pilihan lain boleh bagus, tapi yang ini lagi beruntung.",
    "Dengan ini dinyatakan bahwa pilihan lain memasuki masa oposisi sampai pemilihan berikutnya.",
    "Pilihan lain bukan berarti buruk, hanya saja kali ini belum mendapat kepercayaan aja.",
    "Pilihan lain boleh menarik, tapi yang ini punya daya tarik tersendiri. Coba aja dulu!",
    "Nggak ada alasan khusus. Kadang pilihan bagus memang nggak perlu banyak pembelaan.",
    "Jangan bandingkan dengan yang lain. Mantan saja sudah lewat, masa pilihan ini masih mau dibandingkan?",
    "Keputusan ini sudah disahkan. Kalau gagal, kita coba periode pemerintahan selanjutnya.",
    "Pilihan ini sudah menunggu sejak tadi. Jangan bikin dia merasa di-ghosting.",
    "Pilih yang ini saja. Setidaknya ada satu hal dalam hidup lu yang memberikan kepastian."
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

    if (!categoryOptions.hasOwnProperty(category)) {
        return;
    }

    result.innerHTML = "";

    if (category === "random") {
        options.value = "";
        options.placeholder = "Contoh:\nMau nonton film\nMau main game\nMau jalan-jalan";
    } else {
        options.value = categoryOptions[category].join("\n");
        options.placeholder = "Pilihan 1\nPilihan 2\nPilihan 3";
    }

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

    if (options.length < 2) {
        result.innerHTML = "Masukkan minimal 2 pilihan dulu!";
        return;
    }

    // Mengacak pilihan
    const randomIndex = Math.floor(Math.random() * options.length);
    lastSelectedOption = options[randomIndex];

    // Mengacak alasan
    const randomReason = Math.floor(Math.random() * reasons.length);
    const selectedReason = reasons[randomReason];

    // Menampilkan hasil
    result.innerHTML = `
        <div class="result-card">

            <p class="result-label">PILMUD MEMILIH:</p>

            <h2>${escapeHTML(lastSelectedOption)}</h2>

            <div class="reason-box">
                <strong>Kenapa pilihan ini?</strong>
                <p>${selectedReason}</p>
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
