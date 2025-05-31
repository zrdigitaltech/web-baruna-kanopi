<!-- Modal WhatsApp -->
<div class="modal fade" id="whatsappModal" tabindex="-1" role="dialog" aria-labelledby="whatsappModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header d-flex justify-content-between align-items-center">
        <h4 class="modal-title mb-0" id="whatsappModalLabel">Konsultasi & Pemesanan</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Tutup" style="font-size: 1.5rem; transition: opacity 0.3s ease; background: none; border: none;">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="orderForm">
          @csrf
          <div class="form-group mb-3">
            <label for="userName">Nama Lengkap</label>
            <input type="text" class="form-control" id="userName" placeholder="Masukkan nama Anda" maxlength="50">
            <small class="text-danger d-none" id="errorUserName"></small>
          </div>

          <div class="form-group mb-3">
            <label for="userPhone">Nomor WhatsApp</label>
            <div class="input-group">
              <span class="input-group-text">+62</span>
              <input type="text" class="form-control" id="userPhone" placeholder="Contoh: 81234567890" maxlength="15">
            </div>
            <small class="text-danger d-none" id="errorUserPhone"></small>
          </div>

          <div class="form-group mb-3">
            <label for="useralamat">Alamat Lokasi Pemasangan</label>
            <textarea class="form-control" id="useralamat" rows="2" placeholder="Masukkan alamat lengkap lokasi pemasangan"></textarea>
            <small class="text-danger d-none" id="errorUseralamat"></small>
          </div>

          <div class="form-group mb-3">
            <label for="jenisKanopi">Pilih Jenis Kanopi</label>
            <select class="form-control" id="jenisKanopi">
              <option value="">-- Pilih jenis kanopi --</option>
              @foreach($data as $item)
              <option value="{!! $item['id'] !!}">{!! $item['nama'] !!}</option>
              @endforeach
            </select>
            <small class="text-danger d-none" id="errorJenisKanopi"></small>
          </div>

          <div class="form-group mb-3">
            <label for="ukuranKanopi">Ukuran Kanopi (P x L dalam meter)</label>
            <input type="text" class="form-control" id="ukuranKanopi" placeholder="Contoh: 4 x 3">
            <small class="text-danger d-none" id="errorUkuranKanopi"></small>
          </div>

          <button type="submit" class="btn btn-success btn-block w-100">Hubungi via WhatsApp</button>
        </form>
      </div>
    </div>
  </div>
</div>