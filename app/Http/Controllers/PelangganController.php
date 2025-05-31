<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PelangganController extends Controller
{
    //
    public function store(Request $request)
    {
        // Validasi data
        $validated = $request->validate([
            'nama' => 'required|string|max:50',
            'phone' => 'required|numeric',
            'alamat' => 'required|string',
            'jenis_kanopi' => 'required|string',
            'ukuran_kanopi' => 'nullable|string',
        ]);

        // Simpan ke database (contoh: ke tabel orders)
        \App\Models\Pelanggan::create($validated);

        return response()->json(['success' => true]);
    }
}
