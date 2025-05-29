<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('beranda');
});

// Route fallback jika halaman tidak ditemukan (404)
Route::fallback(function () {
    return redirect('/');
});
