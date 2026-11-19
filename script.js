document.addEventListener("DOMContentLoaded", function () {

    // 1. MENGENALKAN ELEMEN HTML KE JAVASCRIPT
    const formPendaftaran = document.getElementById("formPendaftaran");
    const inputNama = document.getElementById("nama");
    const inputPassword = document.getElementById("password");
    const errorPassword = document.getElementById("errorPassword");
    const selectJurusan = document.getElementById("jurusan");

    // Pastikan semua elemen utama ditemukan
    if (!formPendaftaran || !inputNama || !inputPassword ||
        !errorPassword || !selectJurusan) {
        console.error("Ada elemen HTML yang tidak ditemukan. Periksa kembali ID HTML!");
        return;
    }

    // 2. CEK PASSWORD SAAT DIKETIK (EVENT INPUT)
    inputPassword.addEventListener("input", function () {

        const jumlahHuruf = inputPassword.value.length;

        if (jumlahHuruf > 0 && jumlahHuruf < 8) {

            errorPassword.textContent =
                "! Password kurang panjang (" + jumlahHuruf + "/8 karakter)";

            errorPassword.style.color = "#dc2626";
            inputPassword.style.borderColor = "#dc2626";

        } else if (jumlahHuruf >= 8) {

            errorPassword.textContent = "✔ Password sudah aman";

            errorPassword.style.color = "#16a34a";
            inputPassword.style.borderColor = "#16a34a";

        } else {

            errorPassword.textContent = "";
            inputPassword.style.borderColor = "#cbd5e1";

        }
    });

    // 3. CEK DATA SAAT FORM DIKIRIM (EVENT SUBMIT)
    formPendaftaran.addEventListener("submit", function (event) {

        // Validasi password minimal 8 karakter
        if (inputPassword.value.length < 8) {

            event.preventDefault();

            alert("Gagal Mendaftar! Password wajib minimal 8 karakter.");

            inputPassword.focus();

            return;
        }

        // Ambil jurusan yang dipilih
        const jurusanDipilih =
            selectJurusan.options[selectJurusan.selectedIndex].text;

        // Konfirmasi data pendaftaran
        const yakin = confirm(
            "Cek kembali data pendaftaranmu:\n\n" +
            "Nama : " + inputNama.value + "\n" +
            "Jurusan : " + jurusanDipilih + "\n\n" +
            "Klik OK jika data sudah benar."
        );

        // Jika memilih Cancel, batalkan pengiriman form
        if (!yakin) {
            event.preventDefault();
        }

    });

    // 4. BERSIHKAN PERINGATAN SAAT FORM DI-RESET
    formPendaftaran.addEventListener("reset", function () {

        errorPassword.textContent = "";

        inputPassword.style.borderColor = "#cbd5e1";

    });

    // 5. EFEK ZOOM SAAT INPUT MENDAPATKAN FOKUS
    const semuaKotak = document.querySelectorAll(
        "input, select, textarea"
    );

    semuaKotak.forEach(function (kotak) {

        // Saat kotak input diklik
        kotak.addEventListener("focus", function () {

            if (kotak.type !== "radio" && kotak.type !== "checkbox") {
                kotak.style.transform = "scale(1.01)";
            }

        });

        // Saat kursor meninggalkan kotak input
        kotak.addEventListener("blur", function () {

            kotak.style.transform = "scale(1)";

        });

    });

});