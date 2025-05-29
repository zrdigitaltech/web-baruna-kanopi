<!-- Modal WhatsApp -->
<div class="modal fade" id="whatsappModal" tabindex="-1" role="dialog" aria-labelledby="whatsappModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header d-flex justify-content-between align-items-center">
        <h4 class="modal-title mb-0" id="whatsappModalLabel">Form Pemesanan</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Tutup" style="font-size: 1.5rem;transition: opacity 0.3s ease;
    background: none;
    border: none;">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="orderForm">
          <div class="form-group mb-3">
            <label for="userName">Nama Anda</label>
            <input type="text" class="form-control" id="userName" placeholder="Masukkan nama Anda" maxlength="50">
            <small class="text-danger d-none" id="errorUserName"></small>
          </div>

          <div class="form-group mb-3">
            <label for="userPhone">Nomor WhatsApp</label>
            <div class="input-group">
              <span class="input-group-text">62</span>
              <input type="text" class="form-control" id="userPhone" placeholder="Masukkan nomor WhatsApp" maxlength="15">
            </div>
            <small class="text-danger d-none" id="errorUserPhone"></small>
          </div>

          <div class="form-group mb-3">
            <label for="userAddress">Alamat Pemasangan</label>
            <textarea class="form-control" id="userAddress" rows="2" placeholder="Masukkan alamat lengkap pemasangan"></textarea>
            <small class="text-danger d-none" id="errorUserAddress"></small>
          </div>

          <div class="form-group mb-3">
            <label for="canopyType">Jenis Kanopi</label>
            <select class="form-control" id="canopyType">
              <option value="">Pilih jenis kanopi</option>
              <option value="kanopi baja ringan">Kanopi Baja Ringan</option>
              <option value="kanopi kaca">Kanopi Kaca</option>
              <option value="kanopi polycarbonate">Kanopi Polycarbonate</option>
              <option value="kanopi kain">Kanopi Kain</option>
            </select>
            <small class="text-danger d-none" id="errorCanopyType"></small>
          </div>

          <div class="form-group mb-3">
            <label for="canopySize">Ukuran Kanopi (P x L dalam meter)</label>
            <input type="text" class="form-control" id="canopySize" placeholder="Contoh: 4 x 3">
            <small class="text-danger d-none" id="errorCanopySize"></small>
          </div>

          <button type="submit" class="btn btn-success btn-block w-100">Pemesanan via WhatsApp</button>
        </form>
      </div>
    </div>
  </div>
</div>