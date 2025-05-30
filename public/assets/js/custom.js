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

        const name = $("#userName").val().trim();
        const phone = $("#userPhone").val().trim();
        const address = $("#userAddress").val().trim();
        const canopyType = $("#canopyType").val();
        const canopySize = $("#canopySize").val().trim();

        if (!name) {
            showError("UserName", "Nama harus diisi");
            return;
        } else if (name.length < 3) {
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

        if (address.length === 0) {
            showError("UserAddress", "Alamat pemasangan wajib diisi");
            return;
        }

        if (!canopyType) {
            showError("CanopyType", "Silakan pilih jenis kanopi");
            return;
        }

        if (canopySize.length > 0 && !/^\d+(\s*x\s*\d+)?$/.test(canopySize)) {
            showError(
                "CanopySize",
                "Ukuran kanopi harus dalam format seperti '4 x 3'"
            );
            return;
        }

        // Semua validasi lolos, lanjut proses submit
        hideModal("#whatsappModal");
        this.reset();

        setTimeout(function () {
            showModal("#thankYouModal");
        }, 300);
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
