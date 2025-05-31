jQuery(function ($) {
    function showModal(modalId, options = {}) {
        $(modalId)
            .addClass("show")
            .css("display", "block")
            .attr("aria-modal", "true");
        $("body").addClass("modal-open");
        $('<div class="modal-backdrop fade show"></div>').appendTo(
            document.body
        );

        // Set value jika ada dalam options
        if (options.jenisKanopi) {
            $("#jenisKanopi").val(options.jenisKanopi);
        }
    }

    function hideModal(modalId) {
        $(modalId)
            .removeClass("show")
            .css("display", "none")
            .removeAttr("aria-modal");
        $("body").removeClass("modal-open");
        $(".modal-backdrop").remove();

        // Reset form hanya jika modal adalah #whatsappModal
        if (modalId === "#whatsappModal") {
            clearErrors(); // Opsional, hanya kalau kamu ingin hapus error juga
            $("#jenisKanopi").val(""); // Reset hanya select dropdown
        }
    }

    function clearErrors() {
        $("#orderForm small.text-danger").addClass("d-none").text("");
    }

    function showError(inputId, message) {
        $("#error" + inputId)
            .removeClass("d-none")
            .text(message);
        $("#" + inputId).focus();
    }

    // Validasi nomor WA tanpa 0 diawali
    function validatePhone(phone) {
        // Nomor hanya angka, tidak boleh mulai 0, panjang 9-15 digit
        return /^[1-9][0-9]{8,14}$/.test(phone);
    }

    // Cegah user ketik angka 0 diawal
    $("#userPhone").on("input", function () {
        // Ambil nilai sekarang
        let val = $(this).val();

        // Hapus karakter yang bukan angka
        let cleaned = val.replace(/[^0-9]/g, "");

        // Jika mulai dengan 0, hapus 0 pertama
        if (cleaned.startsWith("0")) {
            cleaned = cleaned.substring(1);
        }

        // Set kembali nilai input setelah dibersihkan
        if (val !== cleaned) {
            $(this).val(cleaned);
        }
    });

    $("#orderForm").on("submit", function (e) {
        e.preventDefault();
        clearErrors();

        const $btn = $(this).find('button[type="submit"]');
        const originalText = $btn.text();

        // Disable tombol dan ganti text jadi loading
        $btn.prop("disabled", true).text("Mengirim...");

        // Ambil input
        const nama = $("#userName").val().trim();
        const phone = $("#userPhone").val().trim();
        const alamat = $("#useralamat").val().trim();
        const jenisKanopi = $("#jenisKanopi").val();
        const ukuranKanopi = $("#ukuranKanopi").val().trim();

        // Validasi sederhana contoh:
        if (!nama || nama.length < 3) {
            showError("UserName", "Nama harus diisi minimal 3 karakter");
            $btn.prop("disabled", false).text(originalText);
            return;
        }

        if (!phone || !validatePhone(phone)) {
            showError("UserPhone", "Nomor WhatsApp harus valid");
            $btn.prop("disabled", false).text(originalText);
            return;
        }

        if (alamat.length === 0) {
            showError("Useralamat", "Alamat pemasangan wajib diisi");
            $btn.prop("disabled", false).text(originalText);
            return;
        }

        if (!jenisKanopi) {
            showError("JenisKanopi", "Silakan pilih jenis kanopi");
            $btn.prop("disabled", false).text(originalText);
            return;
        }

        if (
            ukuranKanopi.length > 0 &&
            !/^\d+(\s*x\s*\d+)?$/.test(ukuranKanopi)
        ) {
            showError("UkuranKanopi", "Ukuran kanopi harus seperti '4 x 3'");
            $btn.prop("disabled", false).text(originalText);
            return;
        }

        // Jika semua validasi lolos, ajax submit:
        const jenisKanopiMap = {
            1: "Kanopi Alderon Single",
            2: "Kanopi Alderon Double",
            3: "Kanopi Solar Flat",
            4: "Kanopi Baja Ringan",
            5: "Kanopi Polycarbonate",
            6: "Kanopi Solar Flat Sliding",
        };
        var jenisKanopiText = jenisKanopiMap[jenisKanopi] || jenisKanopi;

        $.ajax({
            url: "/pelanggan/store",
            method: "POST",
            data: {
                _token: $('meta[name="csrf-token"]').attr("content"),
                nama: nama,
                phone: "62" + phone,
                alamat: alamat,
                jenis_kanopi: jenisKanopiText,
                ukuran_kanopi: ukuranKanopi,
            },
            success: function (response) {
                hideModal("#whatsappModal");
                $("#orderForm")[0].reset();

                var waNumber = "6281564625901";

                const message = `Halo ${
                    window.location.hostname
                }, saya ingin konsultasi & pesan kanopi dengan detail berikut:
                
    *Nama:* ${nama}
    *Nomor WhatsApp:* +62${phone}
    *Alamat Pemasangan:* ${alamat}
    *Jenis Kanopi:* ${jenisKanopiText}
    *Ukuran Kanopi:* ${ukuranKanopi || "-"}
    
Mohon info lebih lanjut, terima kasih!`;

                var encodedMessage = encodeURIComponent(message);

                window.open(
                    "https://wa.me/" + waNumber + "?text=" + encodedMessage,
                    "_blank"
                );

                // Enable tombol dan kembalikan text
                $btn.prop("disabled", false).text(originalText);

                setTimeout(function () {
                    showModal("#thankYouModal");
                }, 300);
            },
            error: function (xhr) {
                const errorMessage =
                    "Terjadi kesalahan saat mengirim. Silakan coba lagi.";

                $("#errorMessage").removeClass("d-none").text(errorMessage);
                console.error(xhr.responseText);

                // Enable tombol dan kembalikan text
                $btn.prop("disabled", false).text(originalText);
            },
        });
    });

    $(".openWhatsappModal").on("click", function (e) {
        e.preventDefault();

        const jenisKanopi = $(this).data("jenis-kanopi");

        showModal("#whatsappModal", {
            jenisKanopi: jenisKanopi,
        });
    });

    $("#whatsappModal .close").on("click", function () {
        hideModal("#whatsappModal");
    });

    $("#thankYouModal .btn").on("click", function () {
        hideModal("#thankYouModal");
    });
});
