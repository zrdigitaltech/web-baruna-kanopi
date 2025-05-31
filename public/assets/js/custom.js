jQuery(function ($) {
    function showModal(modalId) {
        $(modalId)
            .addClass("show")
            .css("display", "block")
            .attr("aria-modal", "true");
        $("body").addClass("modal-open");
        $('<div class="modal-backdrop fade show"></div>').appendTo(
            document.body
        );
    }

    function hideModal(modalId) {
        $(modalId)
            .removeClass("show")
            .css("display", "none")
            .removeAttr("aria-modal");
        $("body").removeClass("modal-open");
        $(".modal-backdrop").remove();
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

        const nama = $("#userName").val().trim();
        const phone = $("#userPhone").val().trim();
        const alamat = $("#useralamat").val().trim();
        const jenisKanopi = $("#jenisKanopi").val();
        const ukuranKanopi = $("#ukuranKanopi").val().trim();

        if (!nama) {
            showError("UserName", "Nama harus diisi");
            return;
        } else if (nama.length < 3) {
            showError("UserName", "Nama harus minimal 3 karakter");
            return;
        }

        if (!phone) {
            showError("UserPhone", "Nomor WhatsApp harus diisi");
            return;
        } else if (!validatePhone(phone)) {
            showError("UserPhone", "Nomor WhatsApp harus minimal 9-15 digit");
            return;
        }

        if (alamat.length === 0) {
            showError("Useralamat", "Alamat pemasangan wajib diisi");
            return;
        }

        if (!jenisKanopi) {
            showError("JenisKanopi", "Silakan pilih jenis kanopi");
            return;
        }

        if (
            ukuranKanopi.length > 0 &&
            !/^\d+(\s*x\s*\d+)?$/.test(ukuranKanopi)
        ) {
            showError(
                "UkuranKanopi",
                "Ukuran kanopi harus dalam format seperti '4 x 3'"
            );
            return;
        }

        // Semua validasi lolos, lanjut proses submit
        hideModal("#whatsappModal");
        // this.reset();
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
            url: "/pelanggan/store", // Ganti sesuai route di Laravel kamu
            method: "POST",
            data: {
                _token: $('meta[name="csrf-token"]').attr("content"),
                nama: nama,
                phone: phone,
                alamat: alamat,
                jenis_kanopi: jenisKanopiText,
                ukuran_kanopi: ukuranKanopi,
            },
            success: function (response) {
                $("#orderForm")[0].reset(); // Reset form

                // Nomor WhatsApp tujuan (ganti dengan nomor kamu)
                var waNumber = "6281228883616";

                var message =
                    "Halo " +
                    window.location.hostname +
                    ", saya ingin memesan kanopi dengan detail berikut:\n\n" +
                    "- Nama: " +
                    nama +
                    "\n" +
                    "- No. WA: " +
                    phone +
                    "\n" +
                    "- Alamat: " +
                    alamat +
                    "\n" +
                    "- Jenis Kanopi: " +
                    jenisKanopiText +
                    "\n" +
                    "- Ukuran Kanopi: " +
                    (ukuranKanopi || "-") +
                    "\n\n" +
                    "Mohon konfirmasinya. Terima kasih!";

                var encodedMessage = encodeURIComponent(message);

                window.open(
                    "https://wa.me/" + waNumber + "?text=" + encodedMessage,
                    "_blank"
                );

                setTimeout(function () {
                    showModal("#thankYouModal");
                }, 300);
            },
            error: function (xhr) {
                alert("Terjadi kesalahan saat mengirim data.");
                console.error(xhr.responseText);
            },
        });
    });

    $(".openWhatsappModal").on("click", function (e) {
        e.preventDefault();

        var nama = $(this).data("nama");
        var phone = "6281234567890";

        var message = "Halo Baruna Kanopi, saya tertarik mengenai " + nama;
        var encodedMessage = encodeURIComponent(message);
        var waLink = "https://wa.me/" + phone + "?text=" + encodedMessage;

        $("#whatsappModal .modal-body a.btn").attr("href", waLink);
        showModal("#whatsappModal");
    });

    $("#whatsappModal .close").on("click", function () {
        hideModal("#whatsappModal");
    });

    $("#thankYouModal .btn").on("click", function () {
        hideModal("#thankYouModal");
    });
});
